import { useHistory, useLocation, useParams } from "react-router-dom";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ProductListing from "../../components/ProductListing/ProductListing";
import ProductSideBar from "../../components/ProductSideBar/ProductSideBar";

import "./ProductContainer.scss";

const ProductContainer = () => {
	const location = useLocation();
	const history = useHistory();
	const params = useParams();
	console.log(location);
	console.log(history);
	console.log(params);

	return (
		<section className="product-containter">
			<BreadCrumbs location={location.pathname} />
			<ProductSideBar location={location.pathname} />
			<ProductListing location={location.pathname} />
		</section>
	);
};

export default ProductContainer;
