import AddToCartBtn from "../ColumnProduct/AddToCartBtn";
import "./ProductInfo.scss";

const ProductInfo = ({ product }) => {
	const { name, ratingNum, rating, sold, preview, price } = product;
	return (
		<div className="product-info">
			<h1 className="product-info__title">{name}</h1>
			<div className="product-info__rating">
				<p>
					<span className="hightlight">{ratingNum}</span> ratings
				</p>
				<p>
					<span className="hightlight">{rating}</span> / 5.0
				</p>
				<p>
					<span className="hightlight">{sold}</span> sold
				</p>
			</div>
			<div className="product-info__price">${price}</div>
			<div className="product-info__brief">
				<p>
					<strong>About this item:</strong>
				</p>
				<ul className="product-info__brief-list">
					{preview.map((priv, i) => (
						<li key={i} className="product-info__brief-item">
							{priv}
						</li>
					))}
				</ul>
			</div>
			<div className="product-info__btns">
				<AddToCartBtn className="product-info__btn" product={product} />
				<button className="product-info__btn">Buy Now</button>
			</div>
		</div>
	);
};

export default ProductInfo;