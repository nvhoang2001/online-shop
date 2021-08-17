import { useSelector } from "react-redux";
import ProductList from "../../components/Product/ProductList";

import { types } from "../../store/product-slice";

import "./FeatureProduct.scss";

const TOP_ITEMS_MAX = 10;

const getTopItemsByRating = (items, type) => {
	const topItems = items.filter((prod) => prod.type === type);
	topItems.sort((prev, next) => next.rating - prev.rating);
	topItems.length = TOP_ITEMS_MAX;
	return topItems;
};

const FeatureProduct = () => {
	const products = useSelector((store) => store.products.items);

	const [row1Type, row2Type] = types;

	const featuredRow1 = getTopItemsByRating(products, row1Type);
	const featuredRow2 = getTopItemsByRating(products, row2Type);

	return (
		<section className="featured-products">
			<h2 className="featured-products__title">FEATURED PRODUCTS</h2>
			<ProductList
				products={featuredRow1}
				className="featured-products__list"
				baseClass="featured-products"
				slide
			/>
			<ProductList
				products={featuredRow2}
				className="featured-products__list"
				baseClass="featured-products"
				slide
			/>
		</section>
	);
};

export default FeatureProduct;
