import useLoadImg from "../../hooks/useLoadImg.js";
import { Link } from "react-router-dom";

import AddToCartBtn from "./AddToCartBtn";

const PrimaryProduct = ({ product, className = "", style }) => {
	const { id, summaryName, imgLink, rating, price, sold } = product;
	const { showImg, imgSrc, loadedImgHandler } = useLoadImg(imgLink);
	const classes = `column-product__product ${className}`;

	return (
		<div className={classes} style={style}>
			<div
				className="column-product__img"
				style={{
					backgroundImage: imgSrc,
				}}
			>
				{showImg && <img src={imgLink} alt="" onLoad={loadedImgHandler} />}
				{imgSrc === "" && <span className="column-product__img-skeleton"></span>}
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
