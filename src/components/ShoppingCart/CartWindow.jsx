import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../Layout/Card";
import CustomButton from "../UI/CustomButton/CustomButton.component";

import { checkoutPage } from "../../config";
import "./CartWindow.scss";
import CartProductList from "../CartProductList/CartProductList";

const CartWindow = (props) => {
	const cart = useSelector((store) => store.checkout);
	const { hideWindow } = props;
	const { totalPrice } = cart;
	const items = cart.cartItems;
	const history = useHistory();

	let listContent = <CartProductList items={items} baseClass="shopping-cart" />;

	if (items.length === 0) {
		listContent = (
			<p className="shopping-cart__empty-noti">No items yet! Let's buy something :)</p>
		);
	}

	const goToCheckout = () => {
		history.push(checkoutPage);
		hideWindow();
	};

	return (
		<Card className="shopping-cart">
			{listContent}
			<div>
				<hr />
				<p className="shopping-cart__total">
					<span>Total:</span>
					<span>${totalPrice.toFixed(2)}</span>
				</p>

				<CustomButton className="shopping-cart__checkout-btn" onClick={goToCheckout}>
					GO TO CHECKOUT
				</CustomButton>
			</div>
		</Card>
	);
};

export default CartWindow;
