import { useState } from "react";
import Product from "./Product";

const ProductList = (props) => {
	const [move, setMove] = useState(0);

	const { products, slide } = props;
	const classes = props.className || "";
	const prodClasses = props.baseClass ? `${props.baseClass}__product` : "";

	const btnNextClickHandler = () => {
		if (move >= products.length - 4) {
			return;
		}
		setMove((move) => move + 1);
	};
	const btnPrevClickHandler = () => {
		if (move <= 0) {
			return;
		}
		setMove((move) => move - 1);
	};

	return (
		<div className={classes}>
			{products.map((prod, i) => {
				let prodStyle = null;
				if (slide) {
					prodStyle = {
						transform: `translateX(${(i - move) * 105}%)`,
					};
				}
				return (
					<Product
						style={prodStyle}
						product={prod}
						key={prod.id}
						className={prodClasses}
					/>
				);
			})}

			{slide && (
				<button
					className={`${props.baseClass}__btn ${props.baseClass}__btn--prev`}
					onClick={btnPrevClickHandler}
				>
					&lt;
				</button>
			)}
			{slide && (
				<button
					className={`${props.baseClass}__btn ${props.baseClass}__btn--next`}
					onClick={btnNextClickHandler}
				>
					&gt;
				</button>
			)}
		</div>
	);
};

export default ProductList;
