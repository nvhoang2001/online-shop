import useLoadImg from "../../hooks/useLoadImg.js";
import { Link } from "react-router-dom";

import AddToCartBtn from "./AddToCartBtn";

const BottomProduct = ({ className = "", product, style }) => {
	const { id, summaryName, imgLink } = product;
	const classes = `column-product__product ${className}`;
	const { showImg, imgSrc, loadedImgHandler } = useLoadImg(imgLink);

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
				<AddToCartBtn product={product} className="column-product__prod-btn" />
			</div>
			<div className="column-product__prod-info">
				<h4 className="column-product__prod-name">
					<Link to={`/product/${id}`}>{summaryName}</Link>
				</h4>
			</div>
		</div>
	);
};

export default BottomProduct;
