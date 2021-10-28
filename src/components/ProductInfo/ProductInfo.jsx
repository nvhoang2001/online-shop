import { useState } from "react";

import AddToCartBtn from "../ColumnProduct/AddToCartBtn";
import ErrorNotification2 from "../Layout/NonModalErrorNotification";
import SuccessNotification2 from "../Layout/NonModalSuccessNotification";

import "./ProductInfo.scss";

const ProductInfo = ({ product }) => {
	const { name, ratingNum, rating, sold, preview, price } = product;
	const [productQuantity, setProductQuantity] = useState(1);

	const [showError, setShowError] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const buyNowBtnClickHandler = () => {
		setShowError(true);
	};

	const hideErrorHandler = () => {
		setShowError(false);
	};

	const quantityChangeHanler = (e) => {
		if (Number(e.target.value) < 1) {
			setProductQuantity(1);
			return;
		}
		setProductQuantity(Number(e.target.value));
	};

	const increaseQuantityHandler = () => {
		setProductQuantity((quantity) => quantity + 1);
	};

	const decreaseQuantityHandler = () => {
		if (productQuantity === 1) {
			return;
		}
		setProductQuantity((quantity) => quantity - 1);
	};

	const addToCartHandler = () => {
		setShowSuccess(true);
		setProductQuantity(1);
		setTimeout(() => {
			setShowSuccess(false);
		}, 2500);
	};

	return (
		<div className="product-info">
			{showError && <ErrorNotification2 onHide={hideErrorHandler} />}
			{showSuccess && <SuccessNotification2 />}
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
			<div className="product-info__quantity">
				<p>Quantity:</p>
				<div>
					<button
						className="product-info__quantity-btn"
						onClick={decreaseQuantityHandler}
					>
						-
					</button>
					<input
						type="number"
						name="quantity"
						id="quantity"
						className="product-info__quantity-input"
						value={productQuantity}
						onChange={quantityChangeHanler}
						min="1"
					/>
					<button
						className="product-info__quantity-btn"
						onClick={increaseQuantityHandler}
					>
						+
					</button>
				</div>
			</div>
			<div className="product-info__btns">
				<AddToCartBtn
					className="product-info__btn"
					product={product}
					quantity={productQuantity}
					onSuccess={addToCartHandler}
				/>
				<button className="product-info__btn" onClick={buyNowBtnClickHandler}>
					Buy Now
				</button>
			</div>
		</div>
	);
};

export default ProductInfo;
