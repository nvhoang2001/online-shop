import { useEffect, useState } from "react";

const AgeInput = (props) => {
	const [age, setAge] = useState("");

	const ageChangeHandler = (e) => {
		setAge(e.target.value);
		props.sendInputValue("age", e.target.value);
	};

	const resetAge = () => {
		setAge("");
	};

	useEffect(() => {
		props.sendClearInputFunc("age", resetAge);
	}, []);

	return (
		<div className={"custom-input register-form__input"}>
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
