import { useContext } from "react";
import filterContext from "../../store/filterContext";

const PriceFilter = () => {
	const filterCtx = useContext(filterContext);

	const minInputChangeHandler = (e) => {
		filterCtx.updatePrice({ from: e.target.value });
	};
	const maxInputChangeHandler = (e) => {
		filterCtx.updatePrice({ to: e.target.value });
	};
	const clearInputHandler = () => {
		filterCtx.updatePrice({ from: "", to: "" });
	};

	return (
		<div className="filter-section filter-price">
			<div className="filter-section-header">
				<h3>Price:</h3>
				<button
					className="filter-section-btn"
					onClick={clearInputHandler}
					disabled={!filterCtx.price.from && !filterCtx.price.to}
					title="Clear"
				>
					x
				</button>
			</div>
			<div className="filter-section-body filter-price__body">
				<input
					type="number"
					min="0"
					placeholder="$ From"
					value={filterCtx.price.from}
					onChange={minInputChangeHandler}
				/>{" "}
				-
				<input
					type="number"
					min="0"
					placeholder="$ To"
					value={filterCtx.price.to}
					onChange={maxInputChangeHandler}
				/>
			</div>
		</div>
	);
};

export default PriceFilter;
