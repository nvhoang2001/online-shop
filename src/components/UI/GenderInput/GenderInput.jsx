import { useState, useEffect } from "react";

const GenderInput = ({ sendInputValue, baseClass, className, defaultValue }) => {
	const [gender, setGender] = useState([false, false, false]);

	useEffect(() => {
		if (defaultValue) {
			switch (defaultValue) {
				case "male":
					setGender([true, false, false]);

					break;
				case "female":
					setGender([false, true, false]);

					break;
				case "other":
					setGender([false, false, true]);

					break;

				default:
					break;
			}
		}
	}, []);

	const genderChooseHandler = (e) => {
		const clickedEl = e.target.closest(".radio-choice");

		if (!clickedEl) {
			return;
		}

		switch (clickedEl.dataset.value) {
			case "male":
				setGender([true, false, false]);
				break;
			case "female":
				setGender([false, true, false]);
				break;
			case "other":
				setGender([false, false, true]);
				break;

			default:
				break;
		}

		sendInputValue("gender", clickedEl.value);
	};

	return (
		<div className={`custom-input ${baseClass}__input ${className}`}>
			<p>Gender</p>
			<div className={`${baseClass}__input-radio-container`} onClick={genderChooseHandler}>
				<label data-value="male" htmlFor="gender-male" className="radio-choice">
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
				<label data-value="female" htmlFor="gender-female" className="radio-choice">
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
				<label data-value="other" htmlFor="gender-other" className="radio-choice">
					Other:{" "}
					<input
						id="gender-other"
						value="other"
						name="gender"
						type="radio"
						checked={gender[2]}
						readOnly
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderInput;
