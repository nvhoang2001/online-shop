import { useState } from "react";
import capitalizeFirstCharacter from "../../Helpers/capitalizeFirstChar";
import Product from "./Product";

const ProductList = ({ products, slide, title, className, baseClass }) => {
	const [move, setMove] = useState(0);

	const classes = className || "";
	const prodClasses = baseClass ? `${baseClass}__product` : "";

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
			{title && <h2 className={`${baseClass}__title`}>{capitalizeFirstCharacter(title)}</h2>}
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
						className={`${baseClass}__btn ${baseClass}__btn--prev`}
						onClick={btnPrevClickHandler}
					>
						&lt;
					</button>
				)}
				{slide && (
					<button
						className={`${baseClass}__btn ${baseClass}__btn--next`}
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
