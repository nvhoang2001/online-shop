import { useDispatch, useSelector } from "react-redux";

const FeatureProduct = () => {
	const dispatch = useDispatch();
	const store = useSelector((store) => store.products);

	console.log(store);

	return <section></section>;
};

export default FeatureProduct;
