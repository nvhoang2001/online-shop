import { useSelector } from "react-redux";
import { useState, useContext } from "react";
import filterContext from "../../store/filterContext";
import getNthFloorProperties from "../../Helpers/getNthFloorProperties";

const BRAND_FLOOR = 3;

const BrandFilter = (props) => {
	const { location } = props;
	const filterCtx = useContext(filterContext);

	const [isExpandingBrands, setIsExpandingBrands] = useState(false);
	const catedProds = useSelector((store) => store.products.catedItems);
	const locas = location.split("/");
	locas.at(0) === "" && locas.shift();
	locas.at(-1) === "" && locas.pop();
	let cates = catedProds;
	let brands = [];

	if (locas.length <= 3) {
		if (locas.length !== 1) {
			for (let i = 1; i < locas.length; i++) {
				cates = cates[locas[i]];
			}
		}

		brands = Object.entries(getNthFloorProperties(cates, BRAND_FLOOR - locas.length));
	}

	const topBrands = brands.slice(0, 5),
		botBrands = brands.slice(5);

	const brandsExpandHandler = () => {
		setIsExpandingBrands(true);
	};
	const brandsShrinkHandler = () => {
		setIsExpandingBrands(false);
	};
	const checkBrandHandler = (e) => {
		const currentEl = e.target;
		const filterItem = currentEl.closest(".filter-product__item");
		if (!filterItem) {
			return;
		}

		const itemIndex = filterItem.dataset.index;
		// Get brand name
		filterCtx.updateBrands(brands[itemIndex][0]);
	};

	const clearBrandFilter = () => {
		filterCtx.clearBrand();
	};

	const selectedIsEmpty = filterCtx.brands.length === 0;

	return (
		<div
			className="filter-section filter-brand"
			onClick={checkBrandHandler}
			style={{
				display: `${brands.length > 0 ? "" : "none"}`,
			}}
		>
			<div className="filter-section-header">
				<h3>Brands:</h3>
				<button
					className="filter-section-btn"
					onClick={clearBrandFilter}
					disabled={selectedIsEmpty}
					title="Clear"
				>
					x
				</button>
			</div>

			<ul className="filter-brand__list filter-brand__list--top">
				{topBrands.map((brand, i) => {
					return (
						<li
							key={brand[0]}
							className={`filter-product__item ${
								filterCtx.brands.includes(brand[0])
									? "filter-product__item--is-selected"
									: ""
							}`}
							data-index={i}
						>
							<button className="filter-product__item-btn">
								{brand[0]}{" "}
								<span className="filter-product--semi-trans">
									({brand[1].length})
								</span>
							</button>
						</li>
					);
				})}

				{!isExpandingBrands && botBrands.length > 0 && (
					<button
						className="filter-product__btn filter-product__btn--expand"
						onClick={brandsExpandHandler}
					>
						Show more <span className="filter-product--semi-trans">&rArr;</span>
					</button>
				)}
			</ul>
			{isExpandingBrands && botBrands.length > 0 && (
				<ul className="filter-brand__list--bot">
					{botBrands.map((brand, i) => {
						return (
							<li
								key={brand[0]}
								className={`filter-product__item ${
									filterCtx.brands.includes(brand[0])
										? "filter-product__item--is-selected"
										: ""
								}`}
								data-index={i + 5}
							>
								<button className="filter-product__item-btn">
									{brand[0]}{" "}
									<span className="filter-product--semi-trans">
										({brand[1].length})
									</span>
								</button>
							</li>
						);
					})}

					<button
						className="filter-product__btn filter-product__btn--shrink"
						onClick={brandsShrinkHandler}
					>
						Show less <span className="filter-product--semi-trans">&uArr;</span>
					</button>
				</ul>
			)}
		</div>
	);
};

export default BrandFilter;
