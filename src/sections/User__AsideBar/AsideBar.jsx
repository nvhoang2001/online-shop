import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { ReactComponent as PenSVG } from "../../Assets/pen.svg";
import { ReactComponent as UserSVG } from "../../Assets/user.svg";
import { ReactComponent as FollowSVG } from "../../Assets/user-plus.svg";
import { ReactComponent as PenSquareSVG } from "../../Assets/pen-square.svg";
import { ReactComponent as ClipboardList } from "../../Assets/clipboard-list.min.svg";
import { PRIVATE_PROFILE_DIR } from "../../config";
import "./AsideBar.scss";

const AsideBar = () => {
	const userData = useSelector((store) => store.user);
	const { username, email } = userData;
	return (
		<aside className="aside-bar">
			<div className="aside-bar__user">
				<UserSVG />
				<div className="aside-bar__user-basic">
					<p className="aside-bar__user-name">{username}</p>
					<p className="aside-bar__user-email">{email}</p>
				</div>
			</div>
			<ul className="aside-bar__link-list">
				<li className="aside-bar__link-item">
					<NavLink
						activeClassName="aside-bar__link-link--active"
						className="aside-bar__link-link"
						to={`${PRIVATE_PROFILE_DIR}`}
						exact
					>
						<PenSVG className="aside-bar__link-logo" /> Update my infomation
					</NavLink>
				</li>
				<li className="aside-bar__link-item">
					<NavLink
						activeClassName="aside-bar__link-link--active"
						className="aside-bar__link-link"
						to={`${PRIVATE_PROFILE_DIR}/follow`}
						exact
					>
						<FollowSVG className="aside-bar__link-logo" /> Following
					</NavLink>
				</li>
				<li className="aside-bar__link-item">
					<NavLink
						activeClassName="aside-bar__link-link--active"
						className="aside-bar__link-link"
						to={`${PRIVATE_PROFILE_DIR}/change-password`}
					>
						<PenSquareSVG className="aside-bar__link-logo" /> Change password
					</NavLink>
				</li>
				<li className="aside-bar__link-item">
					<NavLink
						activeClassName="aside-bar__link-link--active"
						className="aside-bar__link-link"
						to={`${PRIVATE_PROFILE_DIR}/purchase`}
					>
						<ClipboardList className="aside-bar__link-logo" /> Purchased
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};

export default AsideBar;
