import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const FilterProduct = (props) => {
	const { location } = props;

	return (
		<div className="filter-product">
			<h2 className="filter-product__title">Refine by</h2>
			<div className="filter-product--filter filter-tag">
				<p className="filter-tag--empty-tag">No filters applied</p>
			</div>
			<BrandFilter location={location} />
			<PriceFilter />
			<RatingFilter />
		</div>
	);
};

export default FilterProduct;
