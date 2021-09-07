import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner from "../../sections/Banner/Banner";
import BrandCarosel from "../../sections/BrandCarosel/BrandCarosel";
import CaroselProduct from "../../sections/CaroselProduct/CaroselProduct";
import FeatureProduct from "../../sections/FeatureProduct/FeatureProduct";

import ProductByCategory from "../../sections/ProductByCategory/ProductByCategory";
import TopBar from "../../sections/TopBar/TopBar";
import TwoSideProduct from "../../sections/TwoSideProduct/TwoSideProduct";

const Homepage = () => {
	return (
		<>
			<TopBar />
			<FeatureProduct />
			<Banner />
			<TwoSideProduct />
			<Banner />
			<ProductByCategory type="technology" driveId="1F4p24lo1nlvxtfPUEo1QSfzbtmmlaeBz" />
			<Banner />
			<ProductByCategory type="fashion" driveId="1BJ2lz8SWW9y3p5BOJ3Ed13fqEeSsslQT" />
			<Banner />
			<CaroselProduct />
			<BrandCarosel />
		</>
	);
};

export default Homepage;
