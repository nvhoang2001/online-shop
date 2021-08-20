import { useState, useRef } from "react";

import emailValidator from "../../Helpers/emailValidator";

const FooterNewsletter = () => {
	const [isInValidEmail, setIsInValidEmail] = useState(false);
	const emailInputRef = useRef();

	const subscibeHandler = () => {
		const email = emailInputRef.current.value;
		if (!emailValidator(email)) {
			setIsInValidEmail(true);
			return;
		}

		emailInputRef.current.value = "";
		setIsInValidEmail(false);
	};

	return (
		<div className="footer__connect-newsletter">
			<h3 className="footer__title footer__connect-title">SUBCRIBE TO OUR NEWSLETTER</h3>
			<div className="footer__connect-input">
				<input
					type="text"
					placeholder="Your email address"
					ref={emailInputRef}
					className={`${isInValidEmail ? "footer__connect-input--error" : ""}`}
				/>
				<button className="footer__connect-btn" onClick={subscibeHandler}>
					SUBSCRIBE
				</button>
			</div>
			{isInValidEmail && (
				<p className="error-text">* Invalid email! Please enter a valid email!</p>
			)}
			<p className="footer__connect-text">
				Get the latest updates on new products and upcoming sales
			</p>
		</div>
	);
};

export default FooterNewsletter;
