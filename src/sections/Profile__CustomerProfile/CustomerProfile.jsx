import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { ReactComponent as PlusSVG } from "../../Assets/plus.min.svg";
import { ReactComponent as CheckSVG } from "../../Assets/check.min.svg";

import { DB_URL } from "../../config";
import "./CustomerProfile.scss";

const CustomerProfile = ({ uid, coverImgs, profileImgs, username }) => {
	const imgRef = useRef();
	const [imgHeight, setImgHeight] = useState("");
	const [followedUserIds, setFollowedUserIds] = useState([]);
	const notFollow = followedUserIds.findIndex((id) => id === uid) === -1;
	const authData = useSelector((store) => store.user.auth);
	const isSignIn = !!authData;
	const followable = isSignIn && uid !== authData.localId;
	const imgErrorLoadHandler = () => {
		const imgWidth = getComputedStyle(imgRef.current).width;
		setImgHeight(imgWidth);
	};

	const followHandler = () => {
		const { localId: userId } = authData;
		const newFollowUserList = followedUserIds.concat([uid]);
		setFollowedUserIds(newFollowUserList);
		(async () => {
			const res = await fetch(`${DB_URL}profile/${userId}.json`);
			const resData = await res.json();

			// Check if current user public profile existed
			if (!resData) {
				fetch(`${DB_URL}profile/${userId}.json`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ followingUserIds: newFollowUserList }),
				});
				return;
			}

			const listId = Object.keys(resData)[0];
			fetch(`${DB_URL}profile/${userId}/${listId}/followingUserIds.json`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newFollowUserList),
			});
		})();
	};

	useEffect(() => {
		if (isSignIn) {
			const { localId: userId } = authData;

			(async () => {
				const res = await fetch(`${DB_URL}profile/${userId}.json`);
				const resData = await res.json();
				if (!resData) return;

				const userData = Object.values(resData)[0];
				const { followingUserIds } = userData;
				if (!followingUserIds) {
					return;
				}

				setFollowedUserIds(followingUserIds);
			})();
		}
	}, [isSignIn]);

	return (
		<section className="customer-profile">
			<div className="customer-profile__imgs-container">
				<div
					className="customer-profile__cover-img"
					style={{ backgroundImage: `url(${coverImgs})` }}
				></div>
				<img
					src={`${profileImgs}`}
					alt="profile image"
					className="customer-profile__profile-img"
					ref={imgRef}
					height={imgHeight}
					onError={imgErrorLoadHandler}
				/>
				<h2 className="customer-profile__username">{username}</h2>
				{followable && notFollow && (
					<button className="customer-profile__follow-btn" onClick={followHandler}>
						<PlusSVG />
						Follow
					</button>
				)}
				{followable && !notFollow && (
					<button className="customer-profile__followed-btn">
						<CheckSVG />
						Followed
					</button>
				)}
			</div>
		</section>
	);
};

export default CustomerProfile;
