import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import { ReactComponent as PlusSVG } from "../../Assets/minus.min.svg";
import { DB_URL, PUBLIC_USR } from "../../config";
import "./Following.scss";

const Following = () => {
	const [followedUsers, setFollowedUsers] = useState([]);
	const [followUsersInfos, setFollowUsersInfos] = useState([]);
	const userAuth = useSelector((store) => store.user.auth);
	const { localId: uid } = userAuth;

	const getFollowedUserInfo = async () => {
		const users = [];
		for (let index = 0; index < followedUsers.length; index++) {
			const uid = followedUsers[index];
			const response = await fetch(`${DB_URL}profile/${uid}.json`);
			const resData = await response.json();
			const userData = Object.values(resData)[0];
			users.push(userData);
		}
		setFollowUsersInfos(users);
	};

	const unfollowHandler = (e) => {
		const clickBtn = e.target.closest(".follow__user-unfollow");
		const clickedListItem = clickBtn.closest(".follow__user");
		const { id: clickedUid } = clickedListItem.dataset;
		const newFollowUserList = followedUsers.filter((id) => id !== clickedUid);
		setFollowedUsers(newFollowUserList);

		// Update following users
		fetch(`${DB_URL}profile/${uid}.json`)
			.then((res) => res.json())
			.then((data) => {
				return Object.keys(data)[0];
			})
			.then((id) => {
				fetch(`${DB_URL}profile/${uid}/${id}/followingUserIds.json`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newFollowUserList),
				});
			});
	};

	useEffect(() => {
		(async () => {
			const res = await fetch(`${DB_URL}profile/${uid}.json`);
			const resData = await res.json();
			if (!resData) return;

			const userData = Object.values(resData)[0];
			const { followingUserIds } = userData;
			if (!followingUserIds) {
				return;
			}
			setFollowedUsers(followingUserIds);
		})();
	}, []);

	useEffect(() => {
		getFollowedUserInfo();
	}, [followedUsers]);

	return (
		<section className="follow">
			<h2 className="follow__title">Following</h2>
			<ul className="follow__list">
				{followedUsers.length > 0 &&
					followUsersInfos.map(({ profileImgs, username, id }) => {
						const img = profileImgs || `https://robohash.org/${id}?set=set4&bgset=bg1`;
						return (
							<li className="follow__user" key={id} data-id={id}>
								<Link to={`${PUBLIC_USR}/${id}`}>
									<img className="follow__user-img" src={img} alt={username} />
									<span className="follow__user-name">{username}</span>
								</Link>
								<CustomButton
									className="follow__user-unfollow"
									onClick={unfollowHandler}
								>
									<PlusSVG /> Unfollow
								</CustomButton>
							</li>
						);
					})}

				{followedUsers.length === 0 && <p className="follow__no-follow">No follow</p>}
			</ul>
		</section>
	);
};

export default Following;
