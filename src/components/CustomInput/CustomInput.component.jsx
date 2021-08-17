import useInput from "../../hooks/useInput";
import "./CustomInput.scss";

const CustomInput = (props) => {
	const { id, label, type, placeholder, validator, errorText } = props.input;

	const { clear, hasError, value, isValid, inputChangeHandler, touchedInputHandler } =
		useInput(validator);

	const changeHandler = (e) => {
		inputChangeHandler(e.target.value);
	};

	const inputBlurHandler = () => {
		touchedInputHandler(true);
	};

	props.sendClearInputFunc(id, clear);
	props.sendInputValidity(id, isValid);
	props.sendInputTouchFunc(id, touchedInputHandler);

	const inputClass = `custom-input__input ${hasError ? "invalid" : ""}`;

	return (
		<div className="custom-input">
			<label className="custom-input__label" htmlFor={id}>
				{label}
			</label>
			<br />
			<input
				className={inputClass}
				type={type}
				placeholder={placeholder}
				id={id}
				value={value}
				onChange={changeHandler}
				onBlur={inputBlurHandler}
			/>

			{hasError && <p className="error-text">{errorText}</p>}
		</div>
	);
};

export default CustomInput;
