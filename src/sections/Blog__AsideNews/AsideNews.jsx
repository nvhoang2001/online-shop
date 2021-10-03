import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import HotTopic from "./HotTopic";
import MostViewed from "./MostViewed";
import LastestProduct from "./LastestProduct";

import "./AsideNews.scss";

const topics = [
	{
		id: "top1",
		content: "Hacktoberfest 2021",
	},
	{
		id: "top2",
		content: "10 tips & tricks you need to know",
	},
	{
		id: "top3",
		content: "Unable to resolve module crypto",
	},
	{
		id: "top4",
		content: "Belajar Linux OS",
	},
	{
		id: "top5",
		content: "Top animation libraries for React",
	},
];

const viewNews = [
	{
		id: "news1",
		content: "Rise of the Holmies: the merch inspired by the Theranos ‘girlboss’",
	},
	{
		id: "news2",
		content: "Robots: stealing our jobs or solving labour shortages?",
	},
	{
		id: "news3",
		content: "As a whistleblower prepares to speak out, what can be done to rein in Facebook?",
	},
	{
		id: "news4",
		content: "‘You can’t sue your way to the moon’: Elon Musk intensifies Bezos space feud",
	},
	{
		id: "news5",
		content: "Google to change research process after uproar over scientists' firing",
	},
];

const sortProduct = (products) => {
	const stortedProduct = [...products];
	stortedProduct.sort((prod1, prod2) => prod2.releaseDate - prod1.releaseDate);
	return stortedProduct;
};

const AsideNews = () => {
	const products = useSelector((store) => store.products.items);
	const stortedProducts = sortProduct(products);
	const lastestProducts = stortedProducts.slice(0, 5);

	return (
		<aside className="aside-news">
			<div className="aside-news__banner">
				<Link to="#">
					<img
						src="https://m.media-amazon.com/images/I/71AM7BbveYL._SX3000_.jpg"
						alt=""
					/>
				</Link>
			</div>
			<HotTopic hotTopics={topics} />
			<MostViewed news={viewNews} />
			<LastestProduct products={lastestProducts} />
		</aside>
	);
};

export default AsideNews;
