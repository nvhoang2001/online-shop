import TopHeader from "./TopHeader";
import UserHeader from "./UserHeader";
import Navigator from "../../components/Navigator/Navigator";

import products from "../../store/product-info";

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
			content: type.toUpperCase()[0] + type.slice(1),
			subMenu: [
				{
					id: randomGenerateString(NAV_ID_LENGTH),
					content: category[0].toUpperCase() + category.slice(1),
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
			content: category[0].toUpperCase() + category.slice(1),
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
		path: "#",
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
	return (
		<header className="header">
			<TopHeader />
			<UserHeader />
			<Navigator nav={navInfor} />
		</header>
	);
};
export default Header;
