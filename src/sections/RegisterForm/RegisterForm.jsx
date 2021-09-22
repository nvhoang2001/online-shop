import { useDispatch } from "react-redux";
import { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { signupAuth } from "../../store/user-slice";

import Modal from "../../components/UI/Modal/Modal";
import AgeInput from "../../components/UI/AgeInput/AgeInput";
import GenderInput from "../../components/UI/GenderInput/GenderInput";
import ErrorNotification from "../../components/Layout/ErrorNotification";
import SuccessNotification from "../../components/Layout/SuccessNotification";
import CustomInput from "../../components/UI/CustomInput/CustomInput.component";

import emailValidator from "../../Helpers/emailValidator";
import { baseURL, EMAIL_EXISTS, TOO_MANY_ATTEMPTS_TRY_LATER } from "../../config";
import formReducer, { GET_VALIDITY, GET_VALUES, initFormState } from "../../Helpers/formReducer";
import "./RegisterForm.scss";

let timeoutTimer, interTimer;

const PASSWORD_MIN_LIMIT = 6;

const inputInf = [
	{
		id: "email",
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "Your email address",
		validator: (email) => emailValidator(email),
		errorText: "Invaild email! Please enter a valid email!",
		isRequired: true,
	},
	{
		id: "password",
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "",
		validator: (password) => password.trim().length > PASSWORD_MIN_LIMIT,
		errorText: "Password should be at least 6 characters",
		isRequired: true,
	},
	{
		id: "confirm-password",
		name: "confirm-password",
		label: "Confirm Password",
		type: "password",
		placeholder: "",
		validator: () => {
			const password = document.getElementById("password")?.value;
			const confirmPass = document.getElementById("confirm-password")?.value;
			return confirmPass === password;
		},
		errorText: "Please re-enter your password here!",
		isRequired: true,
	},
	{
		id: "username",
		name: "username",
		label: "Fullname",
		type: "text",
		placeholder: "Your name",
		validator: (name) => name.trim() !== "",
		errorText: "Please enter your name!",
		isRequired: true,
	},
	{
		id: "phone",
		name: "phone",
		label: "Phone Number",
		type: "text",
		placeholder: "Your phone number",
	},
	{
		id: "country",
		name: "country",
		label: "Country",
		type: "text",
		placeholder: "Your country",
	},
	{
		id: "city",
		name: "city",
		label: "Province/ City",
		type: "text",
		placeholder: "Your city",
	},
	{
		id: "address",
		name: "address",
		label: "Address",
		type: "text",
		placeholder: "Your Address",
	},
	{
		id: "zipcode",
		name: "zipcode",
		label: "Zip/Postcode",
		type: "text",
		placeholder: "Zipcode",
	},
];

const NO_ERROR = 0,
	EMAIL_ERROR = 1,
	ACCESS_ERROR = 2;
const COUNTDOWN_TIME = 5,
	SHOW_MODAL_TIME = 500;

const RegisterForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errorCode, setErrorCode] = useState(NO_ERROR);
	const [showSuccess, setShowSuccess] = useState(false);
	const [countdownTime, setCountdownTime] = useState(COUNTDOWN_TIME);
	const [formState, setFormState] = useReducer(formReducer, initFormState);
	const requiredInputs = inputInf.slice(0, 4);
	const normInputs = inputInf.slice(4);
	let formIsValid = false;

	if (Object.keys(formState.validity).length) {
		formIsValid = true;
		for (const inp of inputInf) {
			if (!formState.validity[inp.id]) {
				formIsValid = false;
				break;
			}
		}
	}

	const getInputValidity = (id, validity) => {
		setFormState({ type: GET_VALIDITY, id, payload: validity });
	};

	const getInputValue = (name, value) => {
		setFormState({ type: GET_VALUES, name, payload: value });
	};

	const showError = (errorCode) => {
		setErrorCode(errorCode);
	};
	const hideError = () => {
		setErrorCode(NO_ERROR);
	};

	const successRegisterHandler = () => {
		hideError();
		setShowSuccess(true);
		timeoutTimer = setTimeout(() => {
			interTimer = setInterval(() => {
				if (countdownTime === 0) {
					clearInterval(interTimer);
					history.push(baseURL);
					setShowSuccess(false);
				}
				setCountdownTime((time) => time - 1);
			}, 1000);
		}, SHOW_MODAL_TIME);
		return { wait: true, time: (COUNTDOWN_TIME + 1) * 1000 };
	};

	const successRegisterNoCountdown = () => {
		hideError();
		setShowSuccess(false);
		clearTimeout(timeoutTimer);
		clearInterval(interTimer);
		setTimeout(() => {
			history.push(baseURL);
		}, 0);
		return { wait: false };
	};

	const successModalClickHandler = () => {
		dispatch(signupAuth(formState.values, successRegisterNoCountdown, showError, false));
	};

	const submitFormHandler = (e) => {
		e.preventDefault();

		if (!formIsValid) {
			return;
		}

		dispatch(signupAuth(formState.values, successRegisterHandler, showError));
	};

	let errorContent = null;
	if (errorCode === EMAIL_ERROR) {
		errorContent = (
			<Modal onHide={hideError}>
				<ErrorNotification onHide={hideError} btnContent="Change a new one? Ez :)">
					{EMAIL_EXISTS}
				</ErrorNotification>
			</Modal>
		);
	} else if (errorCode === ACCESS_ERROR) {
		errorContent = (
			<Modal onHide={hideError}>
				<ErrorNotification onHide={hideError} btnContent="It's just some minutes!">
					{TOO_MANY_ATTEMPTS_TRY_LATER}
				</ErrorNotification>
			</Modal>
		);
	}

	return (
		<section className="register-form">
			{errorContent}
			{showSuccess && (
				<Modal onHide={successModalClickHandler}>
					<SuccessNotification>
						<p>
							Register success, you'll be redirect to homepage in{" "}
							<span style={{ color: "#d80100" }}>{countdownTime}</span> seconds....
						</p>
					</SuccessNotification>
				</Modal>
			)}
			<h1 className="register-form__title">New Account</h1>
			<form className="register-form__form" onSubmit={submitFormHandler}>
				{requiredInputs.map((inp) => (
					<CustomInput
						key={inp.id}
						input={inp}
						className="register-form__input"
						sendInputValidity={getInputValidity}
						sendInputValue={getInputValue}
					/>
				))}

				<AgeInput baseClass="register-form" sendInputValue={getInputValue} />

				<GenderInput baseClass="register-form" sendInputValue={getInputValue} />

				{normInputs.map((inp) => (
					<CustomInput
						key={inp.id}
						input={inp}
						className="register-form__input"
						sendInputValidity={getInputValidity}
						sendInputValue={getInputValue}
					/>
				))}

				<div className="register-form__row">
					<button type="submit" className="register-form__btn" disabled={!formIsValid}>
						Create Account
					</button>
				</div>
			</form>
		</section>
	);
};

export default RegisterForm;
