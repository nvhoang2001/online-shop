import { useEffect } from "react";

import Banner from "../../sections/Banner/Banner";
import TopBar from "../../sections/TopBar/TopBar";
import BrandCarosel from "../../sections/BrandCarosel/BrandCarosel";
import TwoSideProduct from "../../sections/TwoSideProduct/TwoSideProduct";
import CaroselProduct from "../../sections/CaroselProduct/CaroselProduct";
import FeatureProduct from "../../sections/FeatureProduct/FeatureProduct";
import ProductByCategory from "../../sections/ProductByCategory/ProductByCategory";

const Homepage = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<>
			<TopBar />
			<FeatureProduct />
			<Banner imgLink="https://m.media-amazon.com/images/I/71o0Os5bUeL._SX3740_.jpg" />
			<TwoSideProduct />
			<Banner imgLink="https://m.media-amazon.com/images/I/61Eo8-tsy0L._SX3000_.jpg" />
			<ProductByCategory type="technology" driveId="1F4p24lo1nlvxtfPUEo1QSfzbtmmlaeBz" />
			<Banner imgLink="https://m.media-amazon.com/images/I/61R1lkAv-hL._SX3740_.jpg" />
			<ProductByCategory type="fashion" driveId="1BJ2lz8SWW9y3p5BOJ3Ed13fqEeSsslQT" />
			<Banner imgLink="https://m.media-amazon.com/images/I/61MSGpQK43L._SX3740_.jpg" />
			<CaroselProduct />
			<BrandCarosel />
		</>
	);
};

export default Homepage;
