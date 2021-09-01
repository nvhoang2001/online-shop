import MarketBox from "./MarketBox";

import "./ProductListing.scss";

const ProductListing = (props) => {
	const { location } = props;

	return (
		<div className="product-listing">
			<MarketBox location={location} />
		</div>
	);
};

export default ProductListing;
