import { useCallback } from "react";
import { useSelector } from "react-redux";

import SideProduct from "../../components/SideProduct/SideProduct";

import "./TwoSideProduct.scss";

const PRODUCT_MAX = 9;

const TwoSideProduct = () => {
	const productItems = useSelector((store) => store.products.items);

	const getTopRatingItems = useCallback(() => {
		const prods = [...productItems];
		prods.sort((prevProd, nextProd) => nextProd.rating - prevProd.rating);
		prods.length = PRODUCT_MAX;
		return prods;
	}, []);

	const getTopWeekViewItems = useCallback(() => {
		const prods = [...productItems];
		prods.sort((prevProd, nextProd) => nextProd.viewInWeek - prevProd.viewInWeek);
		prods.length = PRODUCT_MAX;
		return prods;
	}, []);

	return (
		<section className="two-side-product">
			<SideProduct products={getTopRatingItems()} title="Top rating items" side="left" />
			<SideProduct products={getTopWeekViewItems()} title="Top view items" side="right" />
		</section>
	);
};

export default TwoSideProduct;
