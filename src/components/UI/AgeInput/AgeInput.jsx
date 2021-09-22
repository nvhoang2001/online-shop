import { useState, useEffect } from "react";

const AgeInput = ({ sendInputValue, baseClass, className, defaultValue }) => {
	const [age, setAge] = useState("");

	useEffect(() => {
		if (defaultValue) {
			setAge(defaultValue);
		}
	}, []);

	const ageChangeHandler = (e) => {
		setAge(e.target.value);
		sendInputValue("age", e.target.value);
	};

	return (
		<div className={`custom-input ${baseClass}__input ${className}`}>
			<p>
				<label className="custom-input__label" htmlFor="age">
					Age
				</label>
			</p>

			<input
				className="custom-input__input"
				onChange={ageChangeHandler}
				name="age"
				type="number"
				id="age"
				min="0"
				value={age}
			/>
		</div>
	);
};

export default AgeInput;
