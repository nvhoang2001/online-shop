import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PRIVATE_PROFILE_DIR } from "../../config";
import { userActions } from "../../store/user-slice";

const UserMenu = ({ onHide }) => {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(userActions.logOut());
		onHide();
	};

	return (
		<ul className="user-menu">
			<li className="user-menu__item">
				<Link to={`${PRIVATE_PROFILE_DIR}`}>My profile</Link>
			</li>
			<li className="user-menu__item">
				<Link to="/message">Message</Link>
			</li>
			<li className="user-menu__item" onClick={logoutHandler}>
				Logout
			</li>
		</ul>
	);
};

export default UserMenu;
