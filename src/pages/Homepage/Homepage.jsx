import Banner from "../../sections/Banner/Banner";
import FeatureProduct from "../../sections/FeatureProduct/FeatureProduct";
import Header from "../../sections/Header/Header";
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
		</>
	);
};

export default Homepage;
