import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductRating from "../../sections/Product__Rating/ProductRating";
import ProductBrieffing from "../../sections/ProductBrieffing/ProductBrieffing";
import ProductDetail from "../../sections/Product__ProductDetail/ProductDetail";
import RecommendationProducts from "../../sections/Product__RecommendationProducts/RecommendationProducts";
import ManufacturerDescription from "../../sections/Product_ManufacturerDescription/ManufacturerDescription";

const ProductDetailPage = () => {
	const params = useParams();
	const products = useSelector((store) => store.products.items);
	const { productId } = params;
	const product = products.find((prod) => prod.id === productId);
	return (
		<div className="product-page-wrapper" style={{ backgroundColor: "#f9fbfd" }}>
			<ProductBrieffing product={product} />
			<ManufacturerDescription />
			<ProductDetail product={product} />
			<ProductRating product={product} />
			<RecommendationProducts product={product} />
		</div>
	);
};

export default ProductDetailPage;
