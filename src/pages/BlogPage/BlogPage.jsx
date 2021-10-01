import FlexContainer from "../../components/Layout/FlexContainer";
import AsideNews from "../../sections/Blog__AsideNews/AsideNews";
import MainNews from "../../sections/Blog__MainNews/MainNews";

const BlogPage = () => {
	return (
		<>
			<FlexContainer className="page-section">
				<MainNews />
				<AsideNews />
			</FlexContainer>
		</>
	);
};

export default BlogPage;
