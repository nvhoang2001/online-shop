import { useState } from "react";

import ProductList from "../Product/ProductList";

import "./SideProduct.scss";

const MAX_PRODUCT = 3;

const SideProduct = ({ products, title, side }) => {
	const [positionMark, setPositionMark] = useState(0);

	const slideNextListHandler = () => {
		if ((positionMark + 1) * MAX_PRODUCT >= products.length) {
			return;
		}
		setPositionMark((pos) => pos + 1);
	};

	const slidePrevListHandler = () => {
		if (positionMark <= 0) {
			return;
		}
		setPositionMark((pos) => pos - 1);
	};

	const showProducts = products.slice(
		positionMark * MAX_PRODUCT,
		(positionMark + 1) * MAX_PRODUCT,
	);
	return (
		<div className="side-product">
			<h2 className="side-product__title">
				<span>{title}</span>
				<span>
					<button
						onClick={slidePrevListHandler}
						title="Previous products"
						disabled={positionMark === 0}
					>
						&lt;
					</button>
					<button
						onClick={slideNextListHandler}
						title="Next products"
						disabled={(positionMark + 1) * MAX_PRODUCT >= products.length}
					>
						&gt;
					</button>
				</span>
			</h2>
			<ProductList
				className={`side-product__list side-product__list--${side}`}
				baseClass="side-product"
				products={showProducts}
			/>
		</div>
	);
};

export default SideProduct;
