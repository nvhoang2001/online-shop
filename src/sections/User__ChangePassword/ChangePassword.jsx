import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

import Modal from "../../components/UI/Modal/Modal";
import ErrorNotification from "../../components/Layout/ErrorNotification";
import SuccessNotification from "../../components/Layout/SuccessNotification";
import CustomInput from "../../components/UI/CustomInput/CustomInput.component";
import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import "./ChangePassword.scss";
import { API_KEY } from "../../config";
import sendDataToURL from "../../Helpers/sendDataToURL";

const CHANGE_PASSWORD_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const SUCCESS_CONTENT = "Update password successfully!";
const EMPTY_NOTIFY = "";
const PASSWORD_MIN_LIMIT = 6;

const ChangePassword = () => {
	const dispatch = useDispatch();
	const authData = useSelector((store) => store.user.auth);
	const [showPassword, setShowPassword] = useState(false);
	const [notificationContent, setNotificationContent] = useState(EMPTY_NOTIFY);
	const [inputState, setInputState] = useState({});

	const hideNotification = (_, isLogout = false) => {
		setNotificationContent(EMPTY_NOTIFY);
		if (isLogout) {
			dispatch(userActions.logOut());
		}
	};
	const getInputValidity = (_, inputValidity) => {
		setInputState((state) => ({ ...state, validity: inputValidity }));
	};
	const getInputValue = (_, inputValue) => {
		setInputState((state) => ({ ...state, value: inputValue }));
	};
	const getInputClearFnc = (_, clearFnc) => {
		setInputState((state) => ({ ...state, clearFnc: clearFnc }));
	};
	const getInputTouchFnc = (_, touchFnc) => {
		setInputState((state) => ({ ...state, touchFnc: touchFnc }));
	};
	const toggleShowPasswordHandler = () => {
		setShowPassword((show) => !show);
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();
		inputState.touchFnc();

		const newPassword = inputState.value;
		if (!inputState.validity) {
			return;
		}

		const { idToken } = authData;
		(async () => {
			const submitObj = { idToken, password: newPassword, returnSecureToken: true };

			try {
				const responseData = await sendDataToURL(CHANGE_PASSWORD_ENDPOINT, submitObj);
				const { idToken, expiresIn, refreshToken } = responseData;

				dispatch(
					userActions.refreshAuthInfo({
						id_token: idToken,
						expires_in: expiresIn,
						refresh_token: refreshToken,
					}),
				);
				inputState.clearFnc();
				setNotificationContent(SUCCESS_CONTENT);
			} catch (error) {
				console.error(error);

				setNotificationContent("Something went wrong, please sign-in again!");
			}
		})();
	};

	const notifiContent =
		notificationContent === EMPTY_NOTIFY ? null : notificationContent !== SUCCESS_CONTENT ? (
			<ErrorNotification
				className="change-password__error-message"
				btnContent="Close"
				onHide={hideNotification.bind(null, null, true)}
			>
				{notificationContent}
			</ErrorNotification>
		) : (
			<SuccessNotification className="change-password__success-message">
				{notificationContent}
			</SuccessNotification>
		);

	return (
		<section className="change-password">
			{notifiContent && <Modal onHide={hideNotification}>{notifiContent}</Modal>}
			<form className="change-password__form" onSubmit={formSubmitHandler}>
				<CustomInput
					input={{
						id: "new-password",
						name: "new-password",
						label: "New password",
						type: showPassword ? "text" : "password",
						placeholder: "",
						validator: (password) => password.trim().length > PASSWORD_MIN_LIMIT,
						errorText: "Password should be at least 6 characters",
						isRequired: true,
					}}
					className="change-password__input"
					sendInputValidity={getInputValidity}
					sendInputValue={getInputValue}
					sendInputClearFnc={getInputClearFnc}
					sendInputTouchFnc={getInputTouchFnc}
				/>
				<div className="change-password__show-password-area">
					<label htmlFor="show-password">
						<input
							type="checkbox"
							name="show-password"
							id="show-password"
							checked={showPassword}
							onChange={toggleShowPasswordHandler}
						/>
						Show password
					</label>
				</div>
				<CustomButton className="change-password__submit-btn" type="submit">
					Change
				</CustomButton>
			</form>
		</section>
	);
};

export default ChangePassword;
