import { Link } from "react-router-dom";

import { ReactComponent as ContactSVG } from "../../Assets/address-book.svg";
import { ReactComponent as LocationSVG } from "../../Assets/map-marker.svg";
import { ReactComponent as UserSVG } from "../../Assets/user.svg";
import { signInURL, signUpURL } from "../../config";
import "./TopHeader.scss";

const phoneNumber = "012-465-7899";

const TopHeader = () => {
	return (
		<div className="top-header">
			<div className="top-header__info">
				<ContactSVG />
				<p>Contact me via: {phoneNumber}</p>
			</div>
			<div className="top-header__info">
				<LocationSVG />
				<p>Location: Locate my location</p>
			</div>
			<div className="top-header__info">
				<UserSVG />
				<p>
					<Link className="top-header__link" to={signInURL}>
						Sign in
					</Link>
					/ or{" "}
					<Link className="top-header__link" to={signUpURL}>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default TopHeader;
