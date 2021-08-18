import ProductList from "../Product/ProductList";

import "./SideProduct.scss";

const SideProduct = (props) => {
	const { products, title } = props;

	return (
		<div className="side-product">
			<h2 className="side-product__title">{title}</h2>
			<ProductList
				className="side-product__list"
				baseClass="side-product"
				products={products}
			/>
		</div>
	);
};

export default SideProduct;
