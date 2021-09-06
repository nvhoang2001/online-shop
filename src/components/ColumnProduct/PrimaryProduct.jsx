import { Link } from "react-router-dom";

import AddToCartBtn from "./AddToCartBtn";

const PrimaryProduct = (props) => {
	const { product } = props;
	const { id, summaryName, imgLink, rating, price, sold } = product;
	const classes = `column-product__product ${props.className || ""}`;

	return (
		<div className={classes} style={props.style}>
			<div
				className="column-product__img"
				style={{
					backgroundImage: `url(${imgLink})`,
				}}
			>
				<AddToCartBtn className="column-product__prod-btn" product={product} />
			</div>
			<div className="column-product__prod-info">
				<h4 className="column-product__prod-name">
					<Link to={`/product/${id}`}>{summaryName}</Link>
				</h4>
				<p>Sold: {sold}</p>
				<div className="column-product__foot">
					<p className="column-product__prod-rating">
						Rating: {rating} / 5 <span className="star" />{" "}
					</p>
					<p className="column-product__prod-price">${price}</p>
				</div>
			</div>
		</div>
	);
};

export default PrimaryProduct;
