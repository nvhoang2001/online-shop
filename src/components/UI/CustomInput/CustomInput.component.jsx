import { useEffect } from "react";
import useInput from "../../../hooks/useInput";

import "./CustomInput.scss";

const CustomInput = (props) => {
	const { id, label, type, name, placeholder, validator, errorText, isRequired } = props.input;

	const { clear, hasError, value, isValid, inputChangeHandler, touchedInputHandler } = useInput(
		validator,
		isRequired,
	);

	const changeHandler = (e) => {
		inputChangeHandler(e.target.value);
		props.sendInputValue(name, e.target.value);
	};

	const inputBlurHandler = () => {
		touchedInputHandler(true);
	};

	useEffect(() => {
		props.sendClearInputFunc(id, clear);
	}, [id]);

	useEffect(() => {
		props.sendInputValidity(id, isValid);
	}, [id, isValid]);

	const inputClass = `custom-input__input ${hasError ? "invalid" : ""}`;

	let style;
	if (isRequired) {
		style = {
			display: "flex",
			justifyContent: "space-between",
		};
	}

	return (
		<div className={`custom-input ${props.className || " "}`}>
			<p style={style}>
				<label className="custom-input__label" htmlFor={id}>
					{label}
				</label>
				{isRequired && <span style={{ color: "#ccc" }}>REQUIRED</span>}
			</p>

			<input
				className={inputClass}
				type={type}
				placeholder={placeholder}
				id={id}
				value={value}
				name={name}
				onChange={changeHandler}
				onBlur={inputBlurHandler}
			/>

			{hasError && <p className="error-text">{errorText}</p>}
		</div>
	);
};

export default CustomInput;
