import { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { signupAuth } from "../../store/user-slice";

import AgeInput from "./AgeInput";
import GenderInput from "./GenderInput";
import Modal from "../../components/UI/Modal/Modal";
import ErrorNotification from "../../components/Layout/ErrorNotification";
import CustomInput from "../../components/UI/CustomInput/CustomInput.component";

import emailValidator from "../../Helpers/emailValidator";
import formReducer, {
	GET_CLEAR_FNS,
	GET_VALIDITY,
	GET_VALUES,
	initFormState,
} from "../../Helpers/formReducer";
import { EMAIL_EXISTS, TOO_MANY_ATTEMPTS_TRY_LATER } from "../../config";
import "./RegisterForm.scss";

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

const RegisterForm = () => {
	const [errorCode, setErrorCode] = useState(NO_ERROR);
	const [formState, setFormState] = useReducer(formReducer, initFormState);
	const dispatch = useDispatch();
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

	const getClearInputFunc = (id, clearFunc) => {
		setFormState({ type: GET_CLEAR_FNS, id, payload: clearFunc });
	};

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

	const submitFormHandler = (e) => {
		e.preventDefault();

		if (!formIsValid) {
			return;
		}

		dispatch(signupAuth(formState.values, hideError, showError));
	};

	let errorContent = null;
	if (errorCode === EMAIL_ERROR) {
		errorContent = (
			<Modal onHide={hideError}>
				<ErrorNotification onHide={hideError} emailErr>
					{EMAIL_EXISTS}
				</ErrorNotification>
			</Modal>
		);
	} else if (errorCode === ACCESS_ERROR) {
		errorContent = (
			<Modal onHide={hideError}>
				<ErrorNotification onHide={hideError} emailErr="false">
					{TOO_MANY_ATTEMPTS_TRY_LATER}
				</ErrorNotification>
			</Modal>
		);
	}

	return (
		<section className="register-form">
			{errorContent}
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

				<AgeInput sendInputValue={getInputValue} />

				<GenderInput sendInputValue={getInputValue} />

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
