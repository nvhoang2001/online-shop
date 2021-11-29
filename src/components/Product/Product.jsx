import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkoutActions } from "../../store/checkout-slice";

import { ReactComponent as CartSVG } from "../../Assets/shopping-cart.svg";
import "./Product.scss";

const Product = ({ className = "", product, style }) => {
	const dispatch = useDispatch();
	const [imgIsLoaded, setImgIsLoaded] = useState(false);
	const [imgSrc, setImgSrc] = useState("");

	const { name, summaryName, sold, rating, price, imgLink, id } = product;

	const addItemToCart = () => {
		dispatch(checkoutActions.addItemToCart({ product, quantity: 1 }));
	};
	const imgLoadHandler = () => {
		setImgIsLoaded(true);
	};

	useEffect(() => {
		setImgSrc(imgLink);
	}, []);

	return (
		<figure className={`product ${className}`} style={style}>
			<div className="product__img-container">
				<img
					src={imgSrc}
					alt={name}
					className={`product__img ${!imgIsLoaded ? "product__img--loading" : ""}`}
					onLoad={imgLoadHandler}
				/>
				{!imgIsLoaded && <span className="product__img-skeleton"></span>}
			</div>
			<figcaption className={`product__cap ${className}__cap`}>
				<h4 className="product__name">
					<Link to={`/product/${id}`} title={name}>
						{name}
					</Link>
				</h4>
				<div>
					<p>Sold: {sold}</p>
					<p className="product__rating">
						Rating: {rating} / 5.0 <span />
					</p>
				</div>
				<div className="product__foot">
					<span className="product__price">${price}</span>
					<span>
						<CartSVG title="Add to cart" onClick={addItemToCart} />
					</span>
				</div>
			</figcaption>
		</figure>
	);
};

export default Product;
