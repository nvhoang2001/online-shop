import Banner from "../../sections/Banner/Banner";
import FeatureProduct from "../../sections/FeatureProduct/FeatureProduct";
import Header from "../../sections/Header/Header";
import ProductByCategory from "../../sections/ProductByCategory/ProductByCategory";
import TopBar from "../../sections/TopBar/TopBar";
import TwoSideProduct from "../../sections/TwoSideProduct/TwoSideProduct";

const Homepage = () => {
	return (
		<>
			<Header />
			<TopBar />
			<FeatureProduct />
			<Banner />
			<TwoSideProduct />
			<Banner />
			<ProductByCategory type="technology" driveId="1F4p24lo1nlvxtfPUEo1QSfzbtmmlaeBz" />
			<Banner />
			<ProductByCategory type="fashion" driveId="1BJ2lz8SWW9y3p5BOJ3Ed13fqEeSsslQT" />
		</>
	);
};

export default Homepage;
