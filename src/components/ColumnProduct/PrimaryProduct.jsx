import { Link } from "react-router-dom";

import AddToCartBtn from "./AddToCartBtn";

import { PROD_DIR } from "../../config";

const PrimaryProduct = (props) => {
	const { product } = props;
	const { id, name, imgLink, rating, price, type, sold } = product;
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
					<Link to={`${PROD_DIR}/${type}/${id}`}>{name}</Link>
				</h4>
				<p>Sold: {sold}</p>
				<div className="column-product__foot">
					<p className="column-product__prod-rating">Rating: {rating} / 5</p>
					<p className="column-product__prod-price">${price}</p>
				</div>
			</div>
		</div>
	);
};

export default PrimaryProduct;
