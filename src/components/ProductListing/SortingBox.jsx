import { useHistory } from "react-router-dom";
import {
	SORTING_ALPHAASC,
	SORTING_ALPHADESC,
	SORTING_AVGCUSTOMERREVIEW,
	SORTING_BESTSELLING,
	SORTING_NEWEST,
	SORTING_PRICEASC,
	SORTING_PRICEDESC,
} from "../../config";

const SortingBox = () => {
	const history = useHistory();
	const sortChangeHandler = (e) => {
		const searchParams = new URLSearchParams(history.location.search);
		if (searchParams.has("sort")) {
			searchParams.set("sort", e.target.value);
		} else searchParams.append("sort", e.target.value);
		history.push(`${history.location.pathname}?${searchParams.toString()}`);
	};

	return (
		<div className="sorting-box">
			<form className="sorting-box__form">
				<label htmlFor="product-sorting">Sort By:</label>
				<select
					name="sort-by"
					id="product-sorting"
					className="sorting-box__select"
					onChange={sortChangeHandler}
					defaultValue={SORTING_NEWEST}
				>
					<option value={SORTING_NEWEST}>Newest Items</option>
					<option value={SORTING_BESTSELLING}>Best Selling</option>
					<option value={SORTING_ALPHAASC}>A to Z</option>
					<option value={SORTING_ALPHADESC}>Z to A</option>
					<option value={SORTING_AVGCUSTOMERREVIEW}>By Review</option>
					<option value={SORTING_PRICEASC}>Price &uarr;</option>
					<option value={SORTING_PRICEDESC}>Price &darr;</option>
				</select>
			</form>
		</div>
	);
};

export default SortingBox;
