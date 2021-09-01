import { useHistory } from "react-router-dom";

const SortingBox = () => {
	const history = useHistory();

	const sortChangeHandler = (e) => {
		history.push(`${history.location.pathname}?sort=${e.target.value}`);
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
					defaultValue="newest"
				>
					<option value="newest">Newest Items</option>
					<option value="bestselling">Best Selling</option>
					<option value="alphaasc">A to Z</option>
					<option value="alphadesc">Z to A</option>
					<option value="avgcustomerreview">By Review</option>
					<option value="priceasc">Price &uarr;</option>
					<option value="pricedesc">Price &darr;</option>
				</select>
			</form>
		</div>
	);
};

export default SortingBox;
