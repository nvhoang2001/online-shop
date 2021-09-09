import StripeCheckout from "react-stripe-checkout";

import { STRIPE_KEY } from "../../config";
import logo from "../../Assets/logo.png";

const StripeButton = ({ price, email, disabled, callbackFn, className, errorMgs }) => {
	const exchangePrice = price * 100;
	const successAction = (token) => {
		callbackFn(errorMgs(token.id));
	};

	return (
		<StripeCheckout
			name="Hz Co."
			image={logo}
			email={email}
			description={`Your total is $${price}`}
			amount={exchangePrice}
			panelLabel="Pay Now"
			token={successAction}
			stripeKey={STRIPE_KEY}
			ComponentClass="div"
		>
			<button type="button" disabled={disabled} className={className}>
				Pay Online
			</button>
		</StripeCheckout>
	);
};

export default StripeButton;
