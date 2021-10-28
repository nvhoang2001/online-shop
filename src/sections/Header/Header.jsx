import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import TopHeader from "./TopHeader";
import UserHeader from "./UserHeader";
import Navigator from "../../components/Navigator/Navigator";

import { PROD_DIR, REFUND_DIR, CONTACT_DIR } from "../../config";
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
		content: "Shipping & Returns",
		path: REFUND_DIR,
	},
	{
		content: "Blog",
		path: "/blog",
	},
	{
		content: "Contact",
		path: CONTACT_DIR,
	},
];

const Header = () => {
	const categoriedProducts = useSelector((store) => store.products.catedItems);
	const [activeStickyHeader, setActiveStickyHeader] = useState(false);
	const stickySectionRef = useRef();
	const topHeaderRef = useRef();

	useEffect(() => {
		const headerHeight = stickySectionRef.current.getBoundingClientRect().height;

		const stickySectionObserve = (entries) => {
			const [entry] = entries;
			if (entry.isIntersecting) {
				setActiveStickyHeader(false);
			} else {
				setActiveStickyHeader(true);
			}
		};
		const observerOptions = {
			root: null,
			threshold: 0,
			rootMargin: `${headerHeight - headerHeight * 0.1}px 0px 0px 0px`,
		};
		const observer = new IntersectionObserver(stickySectionObserve, observerOptions);
		observer.observe(topHeaderRef.current);
	}, []);

	return (
		<header
			className="header"
			style={{
				paddingBottom: !activeStickyHeader
					? ""
					: `calc(${stickySectionRef.current.getBoundingClientRect().height}px + 1rem)`,
			}}
		>
			<TopHeader ref={topHeaderRef} />
			<UserHeader
				className={`header__sticky-section ${activeStickyHeader ? "" : "inactive"}`}
				ref={stickySectionRef}
			/>
			<Navigator nav={navInfor} category={categoriedProducts} />
		</header>
	);
};
export default Header;
