import { useState } from "react";
import { NavLink } from "react-router-dom";

import SubMenu from "./TypeMenu";
import Card from "../Layout/Card";

import { PROD_DIR } from "../../config";
import { ReactComponent as ListSVG } from "../../Assets/list.svg";
import "./Navigator.scss";

const Navigator = (props) => {
	const { nav: navItems, category: catProd } = props;
	const [category, ...items] = navItems;
	const { menu: subMenu } = category;

	const [showSubMenu, setShowSubMenu] = useState(false);

	const categoryMouseEnterHandler = () => {
		setShowSubMenu(true);
	};

	const categoryMouseLeaveHandler = () => {
		setShowSubMenu(false);
	};

	return (
		<nav className="nav">
			<ul className="nav__list" onMouseLeave={categoryMouseLeaveHandler}>
				<li
					key={category.content}
					className="nav__item category-list"
					onMouseEnter={categoryMouseEnterHandler}
				>
					<NavLink activeClassName="nav__item--active" to={`${PROD_DIR}`}>
						<ListSVG />
						{category.content}
					</NavLink>
					{showSubMenu && (
						<Card className="nav__layout-card">
							<SubMenu items={subMenu} categoriedProduct={catProd} />
						</Card>
					)}
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
