import { useEffect } from "react";
import Checkout from "../../sections/Checkout/Checkout";

const CheckoutPage = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<>
			<Checkout />
		</>
	);
};

export default CheckoutPage;
