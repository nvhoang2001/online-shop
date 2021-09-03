import { useContext } from "react";
import filterContext from "../../store/filterContext";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const FilterProduct = (props) => {
	const { location } = props;
	const filterCtx = useContext(filterContext);
	const { brands, rating, price } = filterCtx;
	const filterTags = [];
	brands.forEach((brand) => {
		filterTags.push({
			id: brand,
			type: "brand",
			content: brand,
		});
	});

	if (rating > 0) {
		filterTags.push({
			id: "rating",
			type: "rating",
			content: `From ${rating}`,
		});
	}

	if (price.from > 0 || price.to) {
		filterTags.push({
			id: "price",
			type: "price",
			content: `${price.from > 0 ? `From $${price.from}` : ""} ${
				price.to ? `to $${price.to}` : ""
			} `,
		});
	}

	const clearTagBtnHandler = (e) => {
		const clickEl = e.target;
		if (clickEl.classList.contains("filter-product--clear")) {
			filterCtx.clearBrand();
			filterCtx.updateRating(0);
			filterCtx.updatePrice({ from: "", to: "" });
			return;
		}

		if (!clickEl.classList.contains("filter-tag__clear-btn")) {
			return;
		}

		const listItem = clickEl.closest(".filter-tag");
		const { type, name } = listItem.dataset;
		switch (type) {
			case "brand":
				filterCtx.updateBrands(name);
				return;

			case "rating":
				filterCtx.updateRating(0);
				return;
			case "price":
				filterCtx.updatePrice({ from: "", to: "" });
				return;

			default:
				break;
		}
	};

	return (
		<div className="filter-product">
			<h2 className="filter-product__title">Refine by</h2>
			<div className="filter-product--filter" onClick={clearTagBtnHandler}>
				<button className="filter-product--clear">Clear</button>
				{filterTags.length === 0 && (
					<p className="filter-tag--empty-tag">No filters applied</p>
				)}
				<ul>
					{filterTags.map((tag) => {
						const star = tag.type === "rating" ? <span className="star" /> : "";

						return (
							<li
								className="filter-tag"
								key={tag.id}
								data-type={tag.type}
								data-name={tag.id}
							>
								{tag.content} {star}
								<button className="filter-tag__clear-btn">x</button>
							</li>
						);
					})}
					{/* <li className="filter-tag">
						Apple <button>x</button>
					</li>
					<li className="filter-tag">
						Apple <button>x</button>
					</li>
					<li className="filter-tag">
						Apple <button>x</button>
					</li>
					<li className="filter-tag">
						Apple <button>x</button>
					</li>
					<li className="filter-tag">
						Apple <button>x</button>
					</li> */}
				</ul>
			</div>
			<BrandFilter location={location} />
			<PriceFilter />
			<RatingFilter />
		</div>
	);
};

export default FilterProduct;
