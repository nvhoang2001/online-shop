import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../../sections/NotFound/NotFound";
import Activities from "../../sections/Profile__Activities/Activities";
import CustomerProfile from "../../sections/CustomerProfile/CustomerProfile";
import FollowingUser from "../../sections/Profile__FollowingUser/FollowingUser";

import { DB_URL } from "../../config";
const USER_NOT_EXIST = 0;

const getUserProfileInfo = async (userId, successHandler, errorHandler) => {
	const response = await fetch(`${DB_URL}profile/${userId}.json`);
	const responseData = await response.json();

	if (!responseData) {
		errorHandler();
		return;
	}

	const [userData] = Object.values(responseData);

	successHandler(userData);
};

const UserPage = () => {
	const [userData, setUserData] = useState(null);

	const params = useParams();
	const { userId } = params;

	useEffect(() => {
		getUserProfileInfo(userId, setUserData, setUserData.bind(null, USER_NOT_EXIST));
	}, [setUserData]);

	if (!userId || userData === USER_NOT_EXIST) {
		return <NotFound />;
	}
	let coverImgs = "",
		profileImgs = "",
		username = "",
		id = "",
		followingUserIds = [];
	if (userData) {
		({ coverImgs, profileImgs, username, followingUserIds, id } = userData);
	}

	return (
		<>
			<CustomerProfile coverImgs={coverImgs} profileImgs={profileImgs} username={username} />
			<div
				className="user-container"
				style={{
					padding: "3%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
				}}
			>
				<FollowingUser followingUserIds={followingUserIds} />
				<Activities uid={id} username={username} />
			</div>
		</>
	);
};

export default UserPage;
