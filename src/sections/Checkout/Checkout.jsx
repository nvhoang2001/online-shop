import DeliveryInfo from "../../components/DeliveryInfo/DeliveryInfo";
import OrderInfo from "../../components/OrderInfo/OrderInfo";

import "./Checkout.scss";

const Checkout = () => {
	return (
		<main className="checkout">
			<h1 className="checkout__title">Shopping Cart</h1>
			<DeliveryInfo />
			<OrderInfo />
		</main>
	);
};

export default Checkout;
