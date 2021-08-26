import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { signInAuth } from "../../store/user-slice";

import Card from "../../components/Layout/Card";
import CustomInput from "../../components/UI/CustomInput/CustomInput.component";
import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import emailValidator from "../../Helpers/emailValidator";
import formReducer, { GET_VALIDITY, GET_VALUES, initFormState } from "../../Helpers/formReducer";
import "./SignIn.scss";
import { INVALID_SIGN_IN } from "../../config";

const inputInfo = [
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
		validator: (password) => password.trim().length > 0,
		errorText: "Password should not be empty",
		isRequired: true,
	},
];
const SignIn = (props) => {
	const dispatch = useDispatch();
	const [hasError, setHasError] = useState(false);
	const [formState, setFormState] = useReducer(formReducer, initFormState);
	let formIsValid = false;

	if (Object.keys(formState.validity).length) {
		formIsValid = true;
		// Avoid get props from register form
		for (const inp of inputInfo) {
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

	const showError = () => {
		setHasError(true);
	};

	const hideError = () => {
		setHasError(false);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!formIsValid) {
			return;
		}
		dispatch(signInAuth(formState.values, hideError, showError));
	};

	return (
		<Card className="sign-in">
			<h2 className="sign-in__title">Sign In</h2>
			<form className="sign-in__form" onSubmit={submitHandler}>
				{inputInfo.map((inp) => (
					<CustomInput
						key={inp.id}
						input={inp}
						className="sign-in__input"
						sendInputValidity={getInputValidity}
						sendInputValue={getInputValue}
					/>
				))}
				{hasError && <div className="sign-in__error">{INVALID_SIGN_IN}</div>}
				<div className="sign-in__btns">
					<CustomButton onClick={props.onHide}>Cancel</CustomButton>
					<button type="submit" className="sign-in__btn" disabled={!formIsValid}>
						Sign in
					</button>
				</div>
			</form>
		</Card>
	);
};

export default SignIn;
