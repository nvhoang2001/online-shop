import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../Layout/Card";
import CustomButton from "../UI/CustomButton/CustomButton.component";

import "./CartWindow.scss";
import { checkoutPage } from "../../config";

const CartWindow = () => {
	const cart = useSelector((store) => store.checkout);
	const { totalPrice } = cart;
	const items = cart.cartItems;
	const history = useHistory();

	let listContent = (
		<ul className="shopping-cart__list">
			{items.map((item) => {
				const { imgLink, name, amount, price } = item;
				let sumName = name.split(" ");
				sumName.length = 5;
				sumName = sumName.join(" ");
				return (
					<li className="shopping-cart__item" key={item.id}>
						<img src={imgLink} alt={name} className="shopping-cart__img" />
						<div className="shopping-cart__item-info">
							<p>{sumName}</p>
							<p>
								${price} x {amount}
							</p>
						</div>
						<p className="shopping-cart__price">${amount * price}</p>
					</li>
				);
			})}
		</ul>
	);

	if (items.length === 0) {
		listContent = (
			<p className="shopping-cart__empty-noti">No items yet! Let's buy something :)</p>
		);
	}

	const goToCheckout = () => {
		history.push(checkoutPage);
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
