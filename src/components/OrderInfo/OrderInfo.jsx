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

	const increaseProductHandler = (product) => {
		dispatch(checkoutActions.updateItem({ itemID: product.id, amount: product.amount + 1 }));
	};
	const decreaseProductHandler = (product) => {
		if (product.amount === 1) {
			dispatch(checkoutActions.removeItem({ itemID: product.id }));
			return;
		}
		dispatch(checkoutActions.updateItem({ itemID: product.id, amount: product.amount - 1 }));
	};

	useEffect(() => {
		if (isSignedIn) {
			dispatch(checkoutActions.updateUserInfo({ name: "discount", value: 10 }));
		}
	}, [isSignedIn]);

	return (
		<section className="order-info" style={{ height: items.length >= 3 ? "" : "fit-content" }}>
			<h3 className="order-info__title">Your Order</h3>
			<CartProductList
				items={items}
				baseClass="order-info"
				readOnly={false}
				increaseProductHandler={increaseProductHandler}
				decreaseProductHandler={decreaseProductHandler}
			/>
			<div className="order-info__delivery">
				<p>
					<span>Delivery</span>
					<span>${items.length !== 0 ? shipFee : 0} Express</span>
				</p>
				<p>
					<span>Discount</span>
					<span>-${discount}</span>
				</p>
			</div>
			<div className="order-info__total">
				<p>Total:</p>
				<p>${(items.length !== 0 ? totalPrice + shipFee - discount : 0).toFixed(2)}</p>
			</div>
		</section>
	);
};

export default OrderInfo;
