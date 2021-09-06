import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import BrandMenu from "./BrandMenu";
import Card from "../Layout/Card";

import capitalizeFirstCharacter from "../../Helpers/capitalizeFirstChar";

const typeMenuInit = {
	showSubMenu: false,
	menuLink: "",
	menuType: "",
};

const TypeMenu = (props) => {
	const { categoriedProduct } = props;
	const typeListMenu = Object.entries(categoriedProduct);

	const [brandItems, setBrandItems] = useState({});
	const [typeMenuState, setTypeMenuState] = useState(typeMenuInit);

	const mouseMoveHandler = (e) => {
		const currentEl = e.target;

		const itemMenu = currentEl.closest(".nav__sub-menu--sub");
		const typeItem = currentEl.closest(".nav__sub-item");

		// If mouse is on sub-menu, then ignore it
		if (itemMenu) {
			return;
		}

		if (!typeItem) {
			return;
		}

		// If mouse is on type meny, check data-link, and data-type
		const { link, type } = typeItem.dataset;
		// If they falsy, hide the sub-menu
		if (!link) {
			setTypeMenuState(typeMenuInit);
			return;
		}

		setTypeMenuState({ showSubMenu: true, menuLink: link, menuType: type });
	};

	const hideBrandMenuHandler = () => {
		setTypeMenuState(typeMenuInit);
	};

	useEffect(() => {
		const { menuType } = typeMenuState;
		const brandItemsList = typeListMenu.find((typeList) => typeList[0] === menuType);
		if (!brandItemsList) {
			setBrandItems({});
		} else {
			setBrandItems(brandItemsList[1]);
		}
	}, [typeMenuState.menuType]);

	return (
		<ul
			className="nav__sub-menu"
			onMouseMove={mouseMoveHandler}
			onMouseLeave={hideBrandMenuHandler}
		>
			{typeMenuState.showSubMenu && (
				<Card className="nav__sub-menu--sub">
					<BrandMenu items={brandItems} baseLink={typeMenuState.menuLink} />
				</Card>
			)}

			{typeListMenu.map((listMenu, i) => {
				const link = `/products/${listMenu[0]}`;
				return (
					<li
						key={listMenu[0]}
						className="nav__sub-item"
						data-link={link}
						data-type={listMenu[0]}
					>
						<Link to={link}>{capitalizeFirstCharacter(listMenu[0])}</Link>
					</li>
				);
			})}
			<li key="sub-3" className="nav__sub-item">
				<Link to="/products?sort=bestselling">Today's trending</Link>
			</li>
		</ul>
	);
};

export default TypeMenu;
