import { Link } from "react-router-dom";

import AddToCartBtn from "./AddToCartBtn";

import { PROD_DIR } from "../../config";

const BottomProduct = (props) => {
	const classes = `column-product__product ${props.className || ""}`;

	const { product } = props;
	const { id, type, summaryName, imgLink, price, rating } = product;

	return (
		<div className={classes} style={props.style}>
			<div
				className="column-product__img"
				style={{
					backgroundImage: `url(${imgLink})`,
				}}
			>
				<AddToCartBtn product={props.product} className="column-product__prod-btn" />
			</div>
			<div className="column-product__prod-info">
				<h4 className="column-product__prod-name">
					<Link to={`${PROD_DIR}/${type}/${id}`}>{summaryName}</Link>
				</h4>
			</div>
		</div>
	);
};

export default BottomProduct;
