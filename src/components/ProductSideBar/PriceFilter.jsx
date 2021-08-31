import { useState } from "react";

const PriceFilter = () => {
	const [minInputValue, setMinInputValue] = useState("");
	const [maxInputValue, setMaxInputValue] = useState("");

	const minInputChangeHandler = (e) => {
		setMinInputValue(e.target.value);
	};
	const maxInputChangeHandler = (e) => {
		setMaxInputValue(e.target.value);
	};
	const clearInputHandler = () => {
		setMinInputValue("");
		setMaxInputValue("");
	};

	return (
		<div className="filter-product--filter filter-section filter-price">
			<div className="filter-section-header">
				<h3>Price:</h3>
				<button
					className="filter-price--clear"
					onClick={clearInputHandler}
					disabled={!minInputValue && !maxInputValue}
				>
					x
				</button>
			</div>
			<div className="filter-section-body filter-price__body">
				<input
					type="number"
					min="0"
					placeholder="$ From"
					value={minInputValue}
					onChange={minInputChangeHandler}
				/>{" "}
				-
				<input
					type="number"
					min="0"
					placeholder="$ To"
					value={maxInputValue}
					onChange={maxInputChangeHandler}
				/>
			</div>
		</div>
	);
};

export default PriceFilter;
