import { useSelector } from "react-redux";
import ProductList from "../../components/Product/ProductList";
import "./RecommendationProducts.scss";

const RecommendationProducts = ({ product: { id, brand, category, type } }) => {
	const catedItems = useSelector((store) => store.products.catedItems);
	const productsFromBrand = catedItems[type][category][brand];
	const recommendedProducts = productsFromBrand.filter((product) => product.id !== id);

	if (recommendedProducts.length < 1) {
		return <></>;
	}

	return (
		<section className="recommendation-products">
			<h2 className="recommendation-products__title">More products by {brand}</h2>
			<ProductList
				products={recommendedProducts}
				className="recommendation-products__product-list"
				baseClass="recommendation-products"
			/>
		</section>
	);
};

export default RecommendationProducts;
