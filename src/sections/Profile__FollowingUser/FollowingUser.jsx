import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { DB_URL, PUBLIC_USR } from "../../config";
import "./FollowedUser.scss";

const FollowingUser = ({ followingUserIds }) => {
	const [followedUsers, setFollowedUsers] = useState([]);
	const getFollowedUserInfo = async () => {
		const users = [];
		for (let index = 0; index < followingUserIds.length; index++) {
			const uid = followingUserIds[index];
			const response = await fetch(`${DB_URL}profile/${uid}.json`);
			const resData = await response.json();
			const userData = Object.values(resData)[0];
			users.push(userData);
		}
		setFollowedUsers(users);
	};

	useEffect(() => {
		getFollowedUserInfo();
	}, [followingUserIds.length]);

	return (
		<section
			className={`follow-users ${followedUsers.length === 0 ? "follow-users--no-list" : ""}`}
		>
			<ul className="follow-users__follow-list">
				{followedUsers.length > 0 &&
					followedUsers.map(({ profileImgs, username, id }) => {
						return (
							<li className="follow-users__user" key={id}>
								<Link to={`${PUBLIC_USR}/${id}`}>
									<img
										className="follow-users__user-img"
										src={profileImgs}
										alt={username}
									/>
									<span className="follow-users__user-name">{username}</span>
								</Link>
							</li>
						);
					})}

				{followedUsers.length === 0 && (
					<p className="follow-users__no-follow">No Following</p>
				)}
			</ul>
		</section>
	);
};

export default FollowingUser;
