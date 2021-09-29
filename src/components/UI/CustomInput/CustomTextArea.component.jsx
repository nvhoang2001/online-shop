import { useEffect } from "react";
import useInput from "../../../hooks/useInput";

import "./CustomInput.scss";

const CustomTextArea = ({
	input,
	sendInputValidity,
	sendInputValue,
	className,
	textAreaClassName,
	sendInputClearFnc,
	sendInputTouchFnc,
	rows = 10,
	cols,
}) => {
	const { id, label, name, placeholder, validator, errorText, isRequired, defaultValue } = input;

	const {
		hasError,
		value,
		isValid,
		inputChangeHandler,
		touchedInputHandler,
		setInputValue,
		clear,
	} = useInput(validator, isRequired);

	const changeHandler = (e) => {
		inputChangeHandler(e.target.value);
		sendInputValue(name, e.target.value);
	};

	const inputBlurHandler = () => {
		touchedInputHandler(true);
	};

	useEffect(() => {
		if (defaultValue) {
			setInputValue(defaultValue);
		}
	}, [defaultValue, setInputValue]);

	useEffect(() => {
		if (sendInputClearFnc) {
			sendInputClearFnc(id, clear);
		}
	}, [id, clear]);

	useEffect(() => {
		sendInputValidity(id, isValid);
	}, [id, isValid]);

	useEffect(() => {
		if (sendInputTouchFnc) {
			sendInputTouchFnc(id, inputBlurHandler);
		}
	}, []);

	const inputClass = `custom-input__input ${textAreaClassName || ""} ${
		hasError ? "invalid" : ""
	}`;

	let style;
	if (isRequired) {
		style = {
			display: "flex",
			justifyContent: "space-between",
		};
	}

	return (
		<div className={`custom-input ${className || " "}`}>
			<p style={style}>
				<label className="custom-input__label" htmlFor={id}>
					{label}
				</label>
				{isRequired && <span style={{ color: "#ccc" }}>REQUIRED</span>}
			</p>

			<textarea
				className={inputClass}
				placeholder={placeholder}
				id={id}
				value={value}
				name={name}
				onChange={changeHandler}
				onBlur={inputBlurHandler}
				cols={cols || ""}
				rows={rows}
			></textarea>

			{hasError && <p className="error-text">{errorText}</p>}
		</div>
	);
};

export default CustomTextArea;
