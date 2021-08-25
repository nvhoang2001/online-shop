import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

const UserMenu = (props) => {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(userActions.logOut());
		props.onHide();
	};

	return (
		<ul className="user-menu">
			<li className="user-menu__item">
				<Link to="/profile">My profile</Link>
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
