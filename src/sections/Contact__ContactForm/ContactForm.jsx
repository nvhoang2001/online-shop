import { useReducer, useState } from "react";

import Modal from "../../components/UI/Modal/Modal";
import ErrorNotification from "../../components/Layout/ErrorNotification";
import SuccessNotification from "../../components/Layout/SuccessNotification";
import CustomInput from "../../components/UI/CustomInput/CustomInput.component";
import CustomButton from "../../components/UI/CustomButton/CustomButton.component";
import CustomTextArea from "../../components/UI/CustomInput/CustomTextArea.component";

import { FORM_RECEIVE_ADDRESS } from "../../config";
import emailValidator from "../../Helpers/emailValidator";
import "./ContactForm.scss";

const GET_VALUES = "GET_VALUES";
const GET_VALIDITY = "GET_VALIDITY";
const GET_RESET_FNC = "GET_RESET_FNC";

const initFormState = {
	validity: {},
	values: {},
	resetFncs: {},
};

const formReducer = (prevState, action) => {
	switch (action.type) {
		case GET_VALIDITY: {
			const clonedState = { ...prevState };
			clonedState.validity[action.id] = action.payload;
			return clonedState;
		}
		case GET_VALUES: {
			const clonedState = { ...prevState };
			clonedState.values[action.name] = action.payload;
			return clonedState;
		}
		case GET_RESET_FNC: {
			const clonedState = { ...prevState };
			clonedState.resetFncs[action.id] = action.payload;
			return clonedState;
		}

		default:
			break;
	}

	return {
		...initFormState,
	};
};

const ContactForm = () => {
	const [showError, setShowError] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [formState, setFormState] = useReducer(formReducer, initFormState);

	let formIsValid = false;

	if (Object.keys(formState.validity).length > 0) {
		formIsValid = true;
		for (const inpValidity of Object.values(formState.validity)) {
			if (!inpValidity) {
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

	const getInputResetFnc = (id, resetFnc) => {
		setFormState({ type: GET_RESET_FNC, id, payload: resetFnc });
	};

	const showSuccessMessage = () => {
		setShowSuccess(true);
	};

	const hideSuccessMessage = () => {
		setShowSuccess(false);
	};

	const showErrorMessage = () => {
		setShowError(true);
	};

	const hideErrorMessage = () => {
		setShowError(false);
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!formIsValid) {
			return;
		}

		console.log(formState);

		fetch(FORM_RECEIVE_ADDRESS, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formState.values),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Can't send message to database.");
				}

				return res.json();
			})
			.then(() => {
				showSuccessMessage();
				Object.values(formState.resetFncs).forEach((fnc) => fnc());
			})
			.catch((err) => {
				showErrorMessage();
				console.error(err.message);
			});
	};

	return (
		<section className="contact-form">
			{showSuccess && (
				<Modal onHide={hideSuccessMessage}>
					<SuccessNotification>
						<p>Sending successfully, we'll response as soon as posible!</p>
					</SuccessNotification>
				</Modal>
			)}
			{showError && (
				<Modal onHide={hideErrorMessage}>
					<ErrorNotification onHide={hideErrorMessage} btnContent="I'll try again">
						<p> We're really sorry, we can't send your info to the server. </p>
						<p> Please try again!</p>
					</ErrorNotification>
				</Modal>
			)}

			<p>We're happy to answer questions or help you with returns.</p>
			<p>Please fill out the form below if you need assistance.</p>

			<form className="contact-form__form" onSubmit={formSubmitHandler}>
				<CustomInput
					className="contact-form__input"
					input={{
						id: "username",
						name: "username",
						label: "Fullname",
						type: "text",
						placeholder: "",
					}}
					sendInputValidity={getInputValidity}
					sendInputValue={getInputValue}
					sendInputClearFnc={getInputResetFnc}
				/>
				<CustomInput
					className="contact-form__input"
					input={{
						id: "phone",
						name: "phone",
						label: "Phone Number",
						type: "number",
						placeholder: "",
					}}
					sendInputValidity={getInputValidity}
					sendInputValue={getInputValue}
					sendInputClearFnc={getInputResetFnc}
				/>
				<CustomInput
					className="contact-form__input"
					input={{
						id: "email",
						name: "email",
						label: "Email",
						type: "email",
						placeholder: "",
						validator: (email) => emailValidator(email),
						errorText:
							"Invaild email! Please enter a valid email! Such as: abc@xyz.def",
						isRequired: true,
					}}
					sendInputValidity={getInputValidity}
					sendInputValue={getInputValue}
					sendInputClearFnc={getInputResetFnc}
				/>
				<CustomInput
					className="contact-form__input"
					input={{
						id: "payment-id",
						name: "payment-id",
						label: "Payment Id",
						type: "text",
						placeholder: "",
					}}
					sendInputValidity={getInputValidity}
					sendInputValue={getInputValue}
					sendInputClearFnc={getInputResetFnc}
				/>

				<CustomTextArea
					className="custom-input contact-form__input contact-form__input--wide"
					textAreaClassName="contact-form__textarea"
					input={{
						id: "comment",
						name: "comment",
						label: "Comments/Questions",
						placeholder: "",
						validator: (text) => text.trim().length > 0,
						errorText:
							"We can't support you when you don't write anything! Please enter your question/ or comment",
						isRequired: true,
					}}
					sendInputValidity={getInputValidity}
					sendInputValue={getInputValue}
					sendInputClearFnc={getInputResetFnc}
				/>

				<CustomButton
					type="submit"
					className="contact-form__form--submit"
					disabled={!formIsValid}
				>
					Submit
				</CustomButton>
			</form>
		</section>
	);
};

export default ContactForm;
