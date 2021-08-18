import { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "../../components/Product/ProductList";
import { driveViewLink } from "../../config";
import capitalizeFirstCharacter from "../../Helpers/capitalizeFirstChar";

import "./ProductByCategory.scss";

const ITEM_LIMIT = 5;
const NONE = "NONE",
	SOLD = "SOLD",
	VIEW = "VIEW",
	RATING = "RATING";

const ProductByCategory = (props) => {
	const [sortType, setSortType] = useState(NONE);

	const { type, driveId } = props;
	const items = useSelector((store) => store.products.items);

	const filterItemBy = (type = NONE) => {
		const prodItems = items.filter((prod) => prod.type === props.type);
		switch (type) {
			case SOLD:
				prodItems.sort((prev, next) => next.sold - prev.sold);
				break;
			case VIEW:
				prodItems.sort((prev, next) => next.viewInWeek - prev.viewInWeek);
				break;
			case RATING:
				prodItems.sort((prev, next) => next.rating - prev.rating);
				break;

			default:
				break;
		}
		prodItems.length = ITEM_LIMIT;
		return prodItems;
	};

	const fileredItems = filterItemBy(sortType);

	const btnContainerClickHandler = (e) => {
		const clickedEl = e.target;
		if (!clickedEl.dataset.type) {
			return;
		}

		switch (clickedEl.dataset.type) {
			case SOLD:
				setSortType(SOLD);
				break;
			case VIEW:
				setSortType(VIEW);
				break;
			case RATING:
				setSortType(RATING);
				break;
			default:
				setSortType(NONE);
				break;
		}
	};

	return (
		<section className="product-by-category">
			<h2 className="product-by-category__title">{capitalizeFirstCharacter(type)}</h2>
			<div className="product-by-category__container">
				<div className="product-by-category__img">
					<img src={`${driveViewLink}${driveId}`} alt="" />
				</div>
				<div className="product-by-category__list-container">
					<div
						className="product-by-category__btn-container"
						onClick={btnContainerClickHandler}
					>
						<button
							className={`product-by-category__btn ${
								sortType === NONE ? "product-by-category__btn--active" : ""
							}`}
							data-type={NONE}
						>
							ALL
						</button>
						<button
							className={`product-by-category__btn ${
								sortType === SOLD ? "product-by-category__btn--active" : ""
							}`}
							data-type={SOLD}
						>
							TOP SOLD
						</button>
						<button
							className={`product-by-category__btn ${
								sortType === VIEW ? "product-by-category__btn--active" : ""
							}`}
							data-type={VIEW}
						>
							TOP VIEW
						</button>
						<button
							className={`product-by-category__btn ${
								sortType === RATING ? "product-by-category__btn--active" : ""
							}`}
							data-type={RATING}
						>
							TOP RATING
						</button>
					</div>

					<ProductList
						products={fileredItems}
						className="product-by-category__list"
						baseClass="product-by-category"
					/>
				</div>
			</div>
		</section>
	);
};

export default ProductByCategory;
