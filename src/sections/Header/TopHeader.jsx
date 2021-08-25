import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import UserMenu from "./UserMenu";
import Modal from "../../components/UI/Modal/Modal";
import SignIn from "../SignIn/SignIn";
import Card from "../../components/Layout/Card";

import { ReactComponent as ContactSVG } from "../../Assets/address-book.svg";
import { ReactComponent as LocationSVG } from "../../Assets/map-marker.svg";
import { ReactComponent as UserSVG } from "../../Assets/user.svg";
import { signUpURL } from "../../config";
import "./TopHeader.scss";

const TopHeader = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showSignIn, setShowSignIn] = useState(false);
	const userInfor = useSelector((store) => store.user);
	const isSignedIn = !!userInfor.auth;

	const showSignInPanel = () => {
		setShowSignIn(true);
	};
	const hideSignInPanel = () => {
		setShowSignIn(false);
	};

	const hideMenu = () => {
		setShowMenu(false);
	};

	let userContent = (
		<>
			<button className="top-header__link" onClick={showSignInPanel}>
				Sign in
			</button>{" "}
			/ or{" "}
			<Link className="top-header__link" to={signUpURL}>
				Register
			</Link>
		</>
	);
	if (isSignedIn) {
		const toggleUserMenu = () => {
			setShowMenu((prevState) => !prevState);
		};

		userContent = (
			<span className="top-header__user" onClick={toggleUserMenu}>
				{userInfor.username}
			</span>
		);
	}

	return (
		<>
			{!isSignedIn && showSignIn && (
				<Modal onHide={hideSignInPanel}>
					<SignIn onHide={hideSignInPanel} />
				</Modal>
			)}
			<div className="top-header">
				<div className="top-header__info">
					<ContactSVG />
					<p>Contact me via: 012-465-7899</p>
				</div>
				<div className="top-header__info">
					<LocationSVG />
					<p>Location: Locate my location</p>
				</div>
				<div className="top-header__info top-header__user-control">
					<UserSVG />
					<p>{userContent}</p>
					{showMenu && (
						<Card className="top-header__user-menu">
							<UserMenu onHide={hideMenu} />
						</Card>
					)}
				</div>
			</div>
		</>
	);
};

export default TopHeader;
