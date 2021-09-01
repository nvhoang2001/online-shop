import MarketBox from "./MarketBox";
import SortingBox from "./SortingBox";

import "./ProductListing.scss";

const ProductListing = (props) => {
	const { location } = props;

	return (
		<div className="product-listing">
			<MarketBox location={location} />
			<SortingBox />
		</div>
	);
};

export default ProductListing;
