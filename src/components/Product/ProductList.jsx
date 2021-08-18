import { useState } from "react";
import capitalizeFirstCharacter from "../../Helpers/capitalizeFirstChar";
import Product from "./Product";

const ProductList = (props) => {
	const [move, setMove] = useState(0);

	const { products, slide, title } = props;
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
		<>
			{title && (
				<h2 className={`${props.baseClass}__title`}>{capitalizeFirstCharacter(title)}</h2>
			)}
			<div className={classes}>
				<ul>
					{products.map((prod, i) => {
						let prodStyle = null;
						if (slide) {
							prodStyle = {
								transform: `translateX(${(i - move) * 105}%)`,
							};
						}
						return (
							<li key={prod.id}>
								<Product style={prodStyle} product={prod} className={prodClasses} />
							</li>
						);
					})}
				</ul>

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
		</>
	);
};

export default ProductList;
