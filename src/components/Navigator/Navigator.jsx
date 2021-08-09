import { useState } from "react";
import { NavLink } from "react-router-dom";

import Card from "../Layout/Card";
import SubMenu from "./Submenu";

import { ReactComponent as ListSVG } from "../../Assets/list.svg";
import "./Navigator.scss";

const Navigator = (props) => {
	const { nav: navItems } = props;
	const [category, ...items] = navItems;
	const { menu: subMenu } = category;

	const [showSubMenu, setShowSubMenu] = useState(false);

	const categoryClickHandler = () => {
		setShowSubMenu(true);
	};

	const categoryMouseEnterHandler = () => {
		setShowSubMenu(true);
	};

	const categoryMouseLeaveHandler = () => {
		setShowSubMenu(false);
	};

	return (
		<nav className="nav">
			<ul className="nav__list">
				<li
					key={category.content}
					className="nav__item category-list"
					onClick={categoryClickHandler}
					onMouseEnter={categoryMouseEnterHandler}
					onMouseLeave={categoryMouseLeaveHandler}
				>
					<div>
						<ListSVG />
						{category.content}
						{showSubMenu && (
							<Card className="nav__layout-card">
								<SubMenu items={subMenu} />
							</Card>
						)}
					</div>
				</li>
				{items.map((item) => {
					return (
						<li key={item.content} className="nav__item">
							<NavLink activeClassName="nav__item--active" to={item.path}>
								{item.content}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigator;
