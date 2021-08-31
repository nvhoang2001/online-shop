import CategoriesList from "./CategoriesList";
import FilterProduct from "./FilterProduct";

import "./ProductSideBar.scss";

const ProductSideBar = (props) => {
	const { location } = props;
	return (
		<div className="side-bar">
			<CategoriesList location={location} />
			<FilterProduct location={location} />
		</div>
	);
};

export default ProductSideBar;
