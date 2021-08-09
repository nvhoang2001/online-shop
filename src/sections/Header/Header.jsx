import TopHeader from "./TopHeader";
import UserHeader from "./UserHeader";
import Navigator from "../../components/Navigator/Navigator";

import "./Header.scss";

const navInfor = [
	{
		content: "Category",
		path: "#",
		menu: [
			{
				id: "sub-1",
				content: "Electronics",
				subMenu: [
					{
						id: "sub-e1",
						content: "Smartphone",
						path: "smartphone",
						products: [
							{ id: "pro-1", content: "Iphone", path: "iphone" },
							{ id: "pro-2", content: "Samsung", path: "samsung" },
							{ id: "pro-3", content: "Xiaomi", path: "xiaomi" },
							{ id: "pro-4", content: "Huawei", path: "huawei" },
							{ id: "pro-5", content: "Realme", path: "realme" },
						],
					},
					{
						id: "sub-e2",
						content: "Smartwatch",
						path: "smartwatch",
						products: [
							{ id: "pro-6", content: "Apple", path: "apple" },
							{ id: "pro-7", content: "Samsung", path: "samsung" },
							{ id: "pro-8", content: "Xiaomi", path: "xiaomi" },
							{ id: "pro-9", content: "Huawei", path: "huawei" },
							{ id: "pro-10", content: "Oppo", path: "oppo" },
						],
					},
					{
						id: "sub-e3",
						content: "Laptop",
						path: "laptop",
						products: [
							{ id: "pro-11", content: "Macbook", path: "macbook" },
							{ id: "pro-12", content: "Dell", path: "dell" },
							{ id: "pro-13", content: "Asus", path: "asus" },
							{ id: "pro-14", content: "Lenovo", path: "lenovo" },
							{ id: "pro-15", content: "HP", path: "hp" },
						],
					},
					{
						id: "sub-e4",
						content: "Headphone",
						path: "headphone",
						products: [
							{ id: "pro-16", content: "Sennheiser", path: "sennheiser" },
							{ id: "pro-17", content: "Sony", path: "sony" },
							{ id: "pro-18", content: "Bang & Olufsen", path: "bangolufsen" },
							{ id: "pro-19", content: "JBL", path: "jbl" },
							{ id: "pro-20", content: "Bose", path: "bose" },
						],
					},
				],
			},
			{
				id: "sub-2",
				content: "Fashions",
				subMenu: [
					{
						id: "sub-e1",
						content: "Smartphone",
						path: "smartphone",
						products: [
							{ id: "pro-1", content: "Iphone", path: "iphone" },
							{ id: "pro-2", content: "Samsung", path: "samsung" },
							{ id: "pro-3", content: "Xiaomi", path: "xiaomi" },
							{ id: "pro-4", content: "Huawei", path: "huawei" },
							{ id: "pro-5", content: "Realme", path: "realme" },
						],
					},
				],
			},
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
