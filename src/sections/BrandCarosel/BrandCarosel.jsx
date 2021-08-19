import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./BrandCarosel.scss";

const BrandCarosel = () => {
	const [activePoint, setActivePoint] = useState(0);
	const brands = useSelector((store) => store.products.brands);
	const topBrands = brands.slice(0, 10);

	const slideLeftHandler = () => {
		if (activePoint === 0) {
			return;
		}
		setActivePoint((curPoint) => curPoint - 1);
	};

	const slideRightHandler = () => {
		if (activePoint === 5) {
			return;
		}
		setActivePoint((curPoint) => curPoint + 1);
	};

	return (
		<section className="brand-catorsel">
			<div className="brand-catorsel__title">
				<h2>#WE ON SOCIAL MEDIA</h2>
			</div>
			<ul className="brand-catorsel__list">
				{topBrands.map((brand, i) => (
					<li
						className="brand-catorsel__brand"
						key={brand.brand}
						style={{
							transform: `translate(${(i - activePoint) * 100}%, -50%)`,
						}}
					>
						<Link to="#"> {brand.brand}</Link>
					</li>
				))}

				<button
					className="brand-catorsel__btn brand-catorsel__btn--left"
					onClick={slideLeftHandler}
				>
					&lt;
				</button>
				<button
					className="brand-catorsel__btn brand-catorsel__btn--right"
					onClick={slideRightHandler}
				>
					&gt;
				</button>
			</ul>
		</section>
	);
};

export default BrandCarosel;
