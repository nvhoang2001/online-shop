import { useSelector } from "react-redux";

import ColumnProduct from "../../components/ColumnProduct/ColumnProduct";

import capitalizeFirstCharacter from "../../Helpers/capitalizeFirstChar";
import "./CaroselProduct.scss";

const CaroselProduct = () => {
	const prodItems = useSelector((store) => store.products.items);
	const types = useSelector((store) => store.products.types);
	const filterProductByType = () => {
		const filteredItems = [];
		filteredItems[0] = prodItems.filter((prod) => prod.type === types[0]);
		filteredItems[1] = prodItems.filter((prod) => prod.type === types[1]);
		return filteredItems;
	};

	const [techProds, fashionProds] = filterProductByType();
	const techFirstCol = techProds.slice(0, 6),
		techSecondCol = techProds.slice(6, 12);
	const fashionFirstCol = fashionProds.slice(0, 6),
		fashionSecondCol = fashionProds.slice(6, 12);

	const colTimers = [{}, {}, {}, {}];

	return (
		<section className="carosel-product">
			<div className="carosel-product__sect carosel-product__tech-sect">
				<h2 className="carosel-product__title">{capitalizeFirstCharacter(types[0])}</h2>
				<ColumnProduct
					className="carosel-product__col"
					products={techFirstCol}
					timer={colTimers}
					index={0}
				/>
				<ColumnProduct
					className="carosel-product__col"
					products={techSecondCol}
					timer={colTimers}
					index={1}
				/>
			</div>
			<div className="carosel-product__sect carosel-product__fashion-sect">
				<h2 className="carosel-product__title">{capitalizeFirstCharacter(types[1])}</h2>
				<ColumnProduct
					className="carosel-product__col"
					products={fashionFirstCol}
					timer={colTimers}
					index={2}
				/>
				<ColumnProduct
					className="carosel-product__col"
					products={fashionSecondCol}
					timer={colTimers}
					index={3}
				/>
			</div>
		</section>
	);
};

export default CaroselProduct;
