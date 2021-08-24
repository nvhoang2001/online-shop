import { useEffect, useState } from "react";

const GenderInput = (props) => {
	const [gender, setGender] = useState([false, false]);

	const genderChooseHandler = (e) => {
		const clickedEl = e.target;
		if (clickedEl.name !== "gender") {
			return;
		}

		if (clickedEl.value === "male") {
			setGender([true, false]);
		} else {
			setGender([false, true]);
		}

		props.sendInputValue("gender", clickedEl.value);
	};

	const resetChoice = () => {
		setGender([false, false]);
	};

	useEffect(() => {
		props.sendClearInputFunc("gender", resetChoice);
	}, []);

	return (
		<div className={"custom-input register-form__input"}>
			<p>Gender</p>
			<div className="register-form__input-radio-container" onClick={genderChooseHandler}>
				<label htmlFor="gender-male" className="radio-choice">
					Male:{" "}
					<input
						id="gender-male"
						value="male"
						name="gender"
						type="radio"
						checked={gender[0]}
						readOnly
					/>
				</label>
				<label htmlFor="gender-female" className="radio-choice">
					Female:{" "}
					<input
						id="gender-female"
						value="female"
						name="gender"
						type="radio"
						checked={gender[1]}
						readOnly
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderInput;
