import ProductIllustration from "../../components/ProductIllustration/ProductIllustration";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import "./ProductBrieffing.scss";

const ProductBrieffing = ({ product }) => {
	const { imgLink, name } = product;

	return (
		<section className="product-brieffing">
			<ProductIllustration imgLink={imgLink} name={name} />
			<ProductInfo product={product} />
		</section>
	);
};

export default ProductBrieffing;
