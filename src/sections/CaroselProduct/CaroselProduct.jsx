import { useSelector } from "react-redux";

import ColumnProduct from "../../components/ColumnProduct/ColumnProduct";

import { types } from "../../store/product-slice";

import "./CaroselProduct.scss";

const CaroselProduct = () => {
	const prodItems = useSelector((store) => store.products.items);
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

	return (
		<section className="carosel-product">
			<div className="carosel-product__sect carosel-product__tech-sect">
				<ColumnProduct className="carosel-product__col" products={techFirstCol} />
				<ColumnProduct className="carosel-product__col" products={techSecondCol} />
			</div>
			<div className="carosel-product__sect carosel-product__fashion-sect">
				<ColumnProduct className="carosel-product__col" products={fashionFirstCol} />
				<ColumnProduct className="carosel-product__col" products={fashionSecondCol} />
			</div>
		</section>
	);
};

export default CaroselProduct;
