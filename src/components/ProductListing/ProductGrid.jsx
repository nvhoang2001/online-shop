import Product from "../Product/Product";

import { MAX_PRODUCT_IN_PAGE } from "../../config";

const ProductGrid = (props) => {
	const { products, pageParams } = props;

	const displayProducts = products.slice(
		(pageParams - 1) * MAX_PRODUCT_IN_PAGE,
		MAX_PRODUCT_IN_PAGE * pageParams,
	);

	return (
		<div className="product-grid">
			<ul className="product-grid__list">
				{displayProducts.map((prod) => (
					<li key={prod.id} className="product-grid__list-item">
						<Product product={prod} className="product-grid__item" />
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductGrid;
