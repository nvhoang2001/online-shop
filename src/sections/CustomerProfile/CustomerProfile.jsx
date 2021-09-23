import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import "./CustomerProfile.scss";

const CustomerProfile = ({ uid, coverImgs, profileImgs, username }) => {
	const imgRef = useRef();
	const [imgHeight, setImgHeight] = useState("");
	const authData = useSelector((store) => store.user.auth);
	const isSignIn = !!authData;
	const followable = isSignIn && uid !== authData.localId;
	const imgErrorLoadHandler = () => {
		const imgWidth = getComputedStyle(imgRef.current).width;
		setImgHeight(imgWidth);
	};

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
					ref={imgRef}
					height={imgHeight}
					onError={imgErrorLoadHandler}
				/>
				<h2 className="customer-profile__username">{username}</h2>
				{followable && <button className="customer-profile__follow-btn">Follow</button>}
			</div>
		</section>
	);
};

export default CustomerProfile;
