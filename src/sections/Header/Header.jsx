import { useSelector } from "react-redux";

import TopHeader from "./TopHeader";
import UserHeader from "./UserHeader";
import Navigator from "../../components/Navigator/Navigator";

import { PROD_DIR } from "../../config";
import products from "../../store/product-info";
import capitalizeFirstChar from "../../Helpers/capitalizeFirstChar";
import randomGenerateString from "../../Helpers/randomGenerateString";

import "./Header.scss";

const cateNav = [];

const NAV_ID_LENGTH = 5;

// Init category
products.forEach((prod) => {
	const { type, brand, category } = prod;
	const typeIndex = cateNav.findIndex(
		(type) => type.content.toLowerCase() === prod.type.toLowerCase(),
	);
	if (typeIndex === -1) {
		cateNav.push({
			id: randomGenerateString(NAV_ID_LENGTH),
			content: capitalizeFirstChar(type),
			path: `${PROD_DIR}/${type}`,
			subMenu: [
				{
					id: randomGenerateString(NAV_ID_LENGTH),
					content: capitalizeFirstChar(category),
					type,
					path: category,
					products: [
						{
							id: randomGenerateString(NAV_ID_LENGTH),
							content: brand,
							path: brand.toLowerCase(),
						},
					],
				},
			],
		});
		return;
	}

	const cateIndex = cateNav[typeIndex].subMenu.findIndex((cate) => cate.path === category);
	if (cateIndex === -1) {
		cateNav[typeIndex].subMenu.push({
			id: randomGenerateString(NAV_ID_LENGTH),
			content: capitalizeFirstChar(category),
			type,
			path: category,
			products: [
				{
					id: randomGenerateString(NAV_ID_LENGTH),
					content: brand,
					path: brand.toLowerCase(),
				},
			],
		});
		return;
	}

	const brandIndex = cateNav[typeIndex].subMenu[cateIndex].products.findIndex(
		(brand) => brand.content === prod.brand,
	);
	if (brandIndex === -1) {
		cateNav[typeIndex].subMenu[cateIndex].products.push({
			id: randomGenerateString(NAV_ID_LENGTH),
			content: brand,
			path: brand.toLowerCase(),
		});
		return;
	}
	return;
});

// Reduce brands of each category
cateNav.forEach((cate) => {
	cate.subMenu.forEach((item) => {
		if (item.products.length > 4) item.products.length = 4;
	});
});

const navInfor = [
	{
		content: "Category",
		menu: [
			...cateNav,

			{
				id: "sub-3",
				content: "Today's trending",
				path: "#",
			},
		],
	},
	{
		content: "Refund policy",
		path: "/refund",
	},
	{
		content: "Blog",
		path: "/blog",
	},
	{
		content: "Contact",
		path: "/contact",
	},
];

const Header = () => {
	const categoriedProducts = useSelector((store) => store.products.catedItems);

	return (
		<header className="header">
			<TopHeader />
			<UserHeader />
			<Navigator nav={navInfor} category={categoriedProducts} />
		</header>
	);
};
export default Header;
