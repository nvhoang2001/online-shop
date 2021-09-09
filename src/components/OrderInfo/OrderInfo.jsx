import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutActions } from "../../store/checkout-slice";

import CartProductList from "../CartProductList/CartProductList";

import "./OrderInfo.scss";

const OrderInfo = () => {
	const checkout = useSelector((store) => store.checkout);
	const isSignedIn = !!useSelector((store) => store.user.auth);
	const dispatch = useDispatch();
	const { cartItems: items, totalPrice, shipFee, discount } = checkout;
	useEffect(() => {
		if (isSignedIn) {
			dispatch(checkoutActions.updateUserInfo({ name: "discount", value: 10 }));
		}
	}, [isSignedIn]);

	return (
		<section className="order-info" style={{ height: items.length >= 3 ? "" : "fit-content" }}>
			<h3 className="order-info__title">Your Order</h3>
			<CartProductList items={items} baseClass="order-info" />
			<div className="order-info__delivery">
				<p>
					<span>Delivery</span>
					<span>${shipFee} Express</span>
				</p>
				<p>
					<span>Discount</span>
					<span>-${discount}</span>
				</p>
			</div>
			<div className="order-info__total">
				<p>Total:</p>
				<p>${(totalPrice + shipFee - discount).toFixed(2)}</p>
			</div>
		</section>
	);
};

export default OrderInfo;
