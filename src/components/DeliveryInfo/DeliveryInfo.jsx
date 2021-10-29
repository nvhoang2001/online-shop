import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { checkoutActions } from "../../store/checkout-slice";

import Modal from "../UI/Modal/Modal";
import StripeButton from "../Payment/StripeButton";
import ErrorNotification from "../Layout/ErrorNotification";
import SuccessNotification from "../Layout/SuccessNotification";
import CustomInput from "../UI/CustomInput/CustomInput.component";
import CustomButton from "../UI/CustomButton/CustomButton.component";
import CustomTextArea from "../UI/CustomInput/CustomTextArea.component";

import phoneValiditor from "../../Helpers/phoneValidator";
import { baseURL, FORM_RECEIVE_ADDRESS } from "../../config";

import "./DeliveryInfo.scss";

const COUNT_DOWN = 5;

let timer;

const ONLINE_PAYMENT_ERROR_MSG = (id) => (
	<p>
		We're so sorry, your payment is successful, but, we can't send your order to our server.
		<br />
		Please contact to our customer service to get support.
		<br />
		Your payment id is: {id}. Please keep this id, and don't tell it to anyone aside our
		supporters.
	</p>
);

const ORDERING_ERROR_MSG = (
	<p>
		We really sorry, we can't connect to server.
		<br />
		Please check your internet connection and try again.
	</p>
);

const DeliveryInfo = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const userInfo = useSelector((store) => store.user);
	const checkout = useSelector((store) => store.checkout);

	const [errorMgs, setErrorMgs] = useState(null);
	const [addressType, setAddressType] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("");
	const [countdownTime, setCountdownTime] = useState(COUNT_DOWN);
	const [isSendingRequest, setIsSendingRequest] = useState(false);
	const [formValidity, setFormValidity] = useState({
		username: false,
		address: false,
		phone: false,
		city: false,
		country: false,
		zipCode: false,
	});

	const {
		username,
		address,
		phone,
		city,
		country,
		zipCode,
		shipFee,
		discount,
		totalPrice: prodPrice,
	} = checkout;
	const isLoggedIn = !!userInfo.auth;
	const { email } = userInfo;
	const totalPrice = +(prodPrice + shipFee - discount).toFixed(2);
	const submitBtnClasses = `delivery__btn ${
		isSendingRequest ? "delivery__submit-btn--loading" : "delivery__submit-btn"
	}`;

	const formIsValid =
		Object.values(formValidity).indexOf(false) === -1 &&
		addressType !== "" &&
		paymentMethod !== "";

	const fillUserInfoHandler = () => {
		const { username, address, phone, city, country, zipCode } = userInfo;
		dispatch(checkoutActions.updateUserInfo({ name: "username", value: username }));
		dispatch(checkoutActions.updateUserInfo({ name: "address", value: address ?? "" }));
		dispatch(checkoutActions.updateUserInfo({ name: "phone", value: phone ?? "" }));
		dispatch(checkoutActions.updateUserInfo({ name: "city", value: city ?? "" }));
		dispatch(checkoutActions.updateUserInfo({ name: "country", value: country ?? "" }));
		dispatch(checkoutActions.updateUserInfo({ name: "zipCode", value: zipCode ?? "" }));
	};

	const inputChangeHandler = (inputName, inputValue) => {
		dispatch(checkoutActions.updateUserInfo({ name: inputName, value: inputValue }));
	};

	const inputValidityChangeHandler = (inputName, inputValue) => {
		setFormValidity((formState) => {
			return { ...formState, [inputName]: inputValue };
		});
	};

	const paymentChangeHandler = (e) => {
		setPaymentMethod(e.target.value);
	};

	const addressTypeChangeHandler = (e) => {
		setAddressType(e.target.value);
	};

	const clearTimer = () => {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	};

	const redirectHandler = () => {
		clearTimer();
		setShowSuccess(false);
		history.push(baseURL);
		dispatch(checkoutActions.reset());
	};

	const initTimer = (callbackFn) => {
		timer = setInterval(() => {
			let change = false;

			setCountdownTime((time) => {
				if (time === 0) {
					change = true;
				}
				return time - 1;
			});
			change && callbackFn();
		}, 1000);
	};

	const hideSuccessModal = () => {
		redirectHandler();
	};

	const hideErrorModal = () => {
		setErrorMgs(null);
	};

	const submitHandler = (errorMessage) => {
		const { cartItems: items, totalAmount, note } = checkout;

		if (items.length === 0) {
			setErrorMgs("Your cart is empty. Please add some items to buy them.");

			return;
		}
		setIsSendingRequest(true);

		const sendItems = items.map((item) => {
			const { id, name, amount, price } = item;
			return { id, name, price, amount };
		});
		const deliInfo = {
			username,
			address,
			phone,
			city,
			country,
			zipCode,
			items: sendItems,
			totalPrice,
			totalAmount,
			delivery: addressType,
			payment: paymentMethod,
			note,
		};

		const checkoutURL = `${FORM_RECEIVE_ADDRESS}/${
			isLoggedIn ? userInfo.auth.localId : "anonymous"
		}.json`;
		fetch(checkoutURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(deliInfo),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Order fail!");
				}
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setShowSuccess(true);
				initTimer(() => {
					redirectHandler();
				});
			})
			.catch((err) => {
				console.log(err);
				setErrorMgs(errorMessage);
			})
			.finally(() => {
				setIsSendingRequest(false);
			});
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!formIsValid) {
			return;
		}

		submitHandler(ORDERING_ERROR_MSG);
	};

	return (
		<section className="delivery">
			{errorMgs && (
				<Modal onHide={hideErrorModal}>
					<ErrorNotification onHide={hideErrorModal} btnContent="OK, I'll try">
						{errorMgs}
					</ErrorNotification>
				</Modal>
			)}
			{showSuccess && (
				<Modal onHide={hideSuccessModal}>
					<SuccessNotification className="delivery__notify--success">
						<p>THANK YOU FOR YOUR ORDER</p>
						<p>You'll be redirect to homepage in {countdownTime}s</p>
						<button onClick={redirectHandler}>Continue shopping</button>
					</SuccessNotification>
				</Modal>
			)}
			<h2 className="delivery__title">Delivery Info</h2>
			{isLoggedIn && (
				<div className="delivery__login-section">
					<div>
						<p className="delivery__login-section-title">
							Login <span>&#x02713;</span>
						</p>
						<p>
							<strong>
								{userInfo.username} {userInfo.phone ? `- ${userInfo.phone}` : null}
							</strong>
						</p>
					</div>
					<button onClick={fillUserInfoHandler}>Fill my information</button>
				</div>
			)}
			<form className="delivery__form" onSubmit={formSubmitHandler}>
				<CustomInput
					className="delivery__input"
					input={{
						id: "username",
						name: "username",
						label: "Username",
						type: "text",
						placeholder: "Your name",
						validator: (name) => name.trim().length > 0,
						errorText: "Your name is empty! Please check it again!",
						isRequired: true,
						defaultValue: username ?? "",
					}}
					sendInputValidity={inputValidityChangeHandler}
					sendInputValue={inputChangeHandler}
				/>
				<CustomInput
					className="delivery__input"
					input={{
						id: "phone",
						name: "phone",
						label: "Phone Number",
						type: "text",
						placeholder: "+012 345 6789",
						validator: (phone) => phoneValiditor(phone),
						errorText: "Your phone number is invalid! Please check it again!",
						isRequired: true,
						defaultValue: phone ?? "",
					}}
					sendInputValidity={inputValidityChangeHandler}
					sendInputValue={inputChangeHandler}
				/>
				<CustomInput
					className="delivery__input"
					input={{
						id: "country",
						name: "country",
						label: "Country",
						type: "text",
						placeholder: "Your country",
						validator: (country) => country.trim().length > 0,
						errorText: "Your country is empty! Please check it again!",
						isRequired: true,
						defaultValue: country ?? "",
					}}
					sendInputValidity={inputValidityChangeHandler}
					sendInputValue={inputChangeHandler}
				/>
				<CustomInput
					className="delivery__input"
					input={{
						id: "city",
						name: "city",
						label: "Province/ City",
						type: "text",
						placeholder: "Your city",
						validator: (city) => city.trim().length > 0,
						errorText: "Your city is empty! Please check it again!",
						isRequired: true,
						defaultValue: city ?? "",
					}}
					sendInputValidity={inputValidityChangeHandler}
					sendInputValue={inputChangeHandler}
				/>
				<CustomInput
					className="delivery__input expand-7"
					input={{
						id: "address",
						name: "address",
						label: "Address",
						type: "text",
						placeholder: "Your Address",
						validator: (address) => address.trim().length > 0,
						errorText: "Your address is empty! Please check it again!",
						isRequired: true,
						defaultValue: address ?? "",
					}}
					sendInputValidity={inputValidityChangeHandler}
					sendInputValue={inputChangeHandler}
				/>
				<CustomInput
					className="delivery__input expand-3"
					input={{
						id: "zipCode",
						name: "zipCode",
						label: "Zip/Postcode",
						type: "text",
						placeholder: "Zipcode",
						defaultValue: zipCode ?? "",
					}}
					sendInputValidity={inputValidityChangeHandler}
					sendInputValue={inputChangeHandler}
				/>
				<div className="delivery__form-section">
					<p>Payment Method</p>
					<label htmlFor="online-method">
						<input
							type="radio"
							name="payment"
							id="online-method"
							value="online-method"
							checked={paymentMethod === "online-method"}
							onChange={paymentChangeHandler}
						/>
						Online
					</label>
					<label htmlFor="offline-method">
						<input
							type="radio"
							name="payment"
							id="offline-method"
							value="offline-method"
							checked={paymentMethod === "offline-method"}
							onChange={paymentChangeHandler}
						/>
						Offline
					</label>
					{paymentMethod === "online-method" && (
						<p className="caution">
							This is not a real e-commerce website, so use this card number:
							5555555555554444 <br />
							You can use whatever number you want with the remains.
						</p>
					)}
				</div>
				<div className="delivery__form-section">
					<p>Address Type</p>
					<label htmlFor="home-type">
						<input
							type="radio"
							name="delivery"
							id="home-type"
							value="home-type"
							checked={addressType === "home-type"}
							onChange={addressTypeChangeHandler}
						/>
						Home (All Day Delivery)
					</label>
					<label htmlFor="office-type">
						<input
							type="radio"
							name="delivery"
							id="office-type"
							value="office-type"
							checked={addressType === "office-type"}
							onChange={addressTypeChangeHandler}
						/>
						Office (Delivery Between 10 AM - 5 PM)
					</label>
				</div>

				<CustomTextArea
					className="delivery__input expand-10"
					textAreaClassName="delivery__input--textarea"
					input={{
						id: "note",
						name: "note",
						label: "Note",
						type: "textarea",
						placeholder: "Note...",
						defaultValue: "",
					}}
					sendInputValidity={inputValidityChangeHandler}
					sendInputValue={inputChangeHandler}
				/>

				<div className="delivery__form-section delivery__btn-section">
					<CustomButton
						type="submit"
						className={submitBtnClasses}
						disabled={!formIsValid}
					>
						{isSendingRequest ? "Sending your order..." : "Save And Deliver Here"}
					</CustomButton>
					{paymentMethod === "online-method" && (
						<StripeButton
							price={totalPrice}
							email={email ?? ""}
							disabled={!formIsValid}
							callbackFn={submitHandler}
							errorMgs={ONLINE_PAYMENT_ERROR_MSG}
							className="delivery__btn delivery__btn--online-payment"
						/>
					)}
				</div>
			</form>
		</section>
	);
};

export default DeliveryInfo;
