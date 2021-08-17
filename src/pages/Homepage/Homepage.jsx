import Banner from "../../sections/Banner/Banner";
import FeatureProduct from "../../sections/FeatureProduct/FeatureProduct";
import Header from "../../sections/Header/Header";
import TopBar from "../../sections/TopBar/TopBar";

const Homepage = () => {
	return (
		<>
			<Header />
			<TopBar />
			<FeatureProduct />
			<Banner />
		</>
	);
};

export default Homepage;
