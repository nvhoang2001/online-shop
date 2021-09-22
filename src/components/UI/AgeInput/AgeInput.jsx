import { useState } from "react";

const AgeInput = ({ sendInputValue, baseClass }) => {
	const [age, setAge] = useState("");

	const ageChangeHandler = (e) => {
		setAge(e.target.value);
		sendInputValue("age", e.target.value);
	};

	return (
		<div className={`custom-input ${baseClass}__input`}>
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
