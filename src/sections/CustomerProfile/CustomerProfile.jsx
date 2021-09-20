import { useSelector } from "react-redux";
import "./CustomerProfile.scss";

const CustomerProfile = ({ coverImgs, profileImgs, username }) => {
	const isSignIn = !!useSelector((store) => store.user.auth);

	return (
		<section className="customer-profile">
			<div className="customer-profile__imgs-container">
				<div
					className="customer-profile__cover-img"
					style={{ backgroundImage: `url(${coverImgs})` }}
				></div>
				<img
					src={`${profileImgs}&size=130x130`}
					alt="profile image"
					className="customer-profile__profile-img"
				/>
				<h2 className="customer-profile__username">{username}</h2>
				{isSignIn && <button className="customer-profile__follow-btn">Follow</button>}
			</div>
		</section>
	);
};

export default CustomerProfile;
