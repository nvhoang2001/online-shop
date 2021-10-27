import { useEffect } from "react";
import ProductContainer from "../../sections/ProductContainer/ProductContainer";

const ProductPage = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<>
			<ProductContainer />
		</>
	);
};

export default ProductPage;
