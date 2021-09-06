import { useLocation } from "react-router-dom";

import { FilterProvider } from "../../store/filterContext";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ProductListing from "../../components/ProductListing/ProductListing";
import ProductSideBar from "../../components/ProductSideBar/ProductSideBar";

import "./ProductContainer.scss";

const ProductContainer = () => {
	const location = useLocation();

	return (
		<section className="product-containter">
			<BreadCrumbs location={location.pathname} />
			<FilterProvider>
				<ProductSideBar location={location.pathname} />
				<ProductListing location={location.pathname} />
			</FilterProvider>
		</section>
	);
};

export default ProductContainer;
