import MarketBox from "./MarketBox";
import SortingBox from "./SortingBox";
import ProductGrid from "./ProductGrid";

import "./ProductListing.scss";

const ProductListing = (props) => {
	const { location } = props;

	return (
		<div className="product-listing">
			<MarketBox location={location} />
			<SortingBox />
			<ProductGrid />
		</div>
	);
};

export default ProductListing;
