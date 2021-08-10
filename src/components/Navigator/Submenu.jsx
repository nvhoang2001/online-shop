import { useState } from "react";
import Card from "../Layout/Card";
import SubCate from "./SubCate";

const SubMenu = (props) => {
	const { items } = props;
	const [subCateItems, setSubCateItems] = useState([]);
	const hasSubCate = subCateItems.length > 0;

	const mouseMoveHandler = (e) => {
		const currentEl = e.target;

		const isCate = !!currentEl.closest(".nav__sub-menu--sub");

		if (isCate) {
			return;
		}

		if (e.target.dataset.hassubcate) {
			const item = items.find((item) => item.id === e.target.dataset.id);
			setSubCateItems(item.subMenu);
		} else {
			setSubCateItems([]);
		}
	};

	return (
		<ul className="nav__sub-menu" onMouseMove={mouseMoveHandler}>
			{items.map((item) => {
				const { subMenu } = item;
				const hasSubCate = subMenu && subMenu.length > 0;

				return (
					// <MenuItem key={item.id} item={item}>
					// 	{item.content}
					// </MenuItem>
					<li
						key={item.id}
						className="nav__sub-item"
						data-hassubcate={hasSubCate}
						data-id={item.id}
					>
						{item.content}
					</li>
				);
			})}
			{hasSubCate && (
				<Card className="nav__sub-menu--sub">
					<SubCate items={subCateItems} />
				</Card>
			)}
		</ul>
	);
};

export default SubMenu;
