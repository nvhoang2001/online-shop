import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import capitalizeFirstCharacter from "../../Helpers/capitalizeFirstChar";
import getNthFloorProperties from "../../Helpers/getNthFloorProperties";

const PRODUCT_FLOOR = 4;

const MarketBox = (props) => {
	const { location } = props;
	const locas = location.split("/");
	locas.at(0) === "" && locas.shift();
	locas.at(-1) === "" && locas.pop();
	const marketBoxTitle = locas.at(-1);
	const [activeWindow, setActiveWindow] = useState(0);
	const catedProds = useSelector((store) => store.products.catedItems);
	let catList = [];
	let cates = catedProds;
	if (locas.length <= 3) {
		if (locas.length !== 1) {
			for (let i = 1; i < locas.length; i++) {
				cates = cates[locas[i]];
			}
		}
		catList = Object.keys(cates);
	}

	const prodArray = [];
	for (const key in cates) {
		prodArray.push(getNthFloorProperties(cates[key], PRODUCT_FLOOR - locas.length - 1));
	}

	const maxActiveItem = catList.length - 4;
	const controlBtnsClickHandler = (e) => {
		const clickedEl = e.target;
		if (!clickedEl.classList.contains("market-box__btn")) {
			return;
		}

		if (clickedEl.dataset.role === "prev") {
			if (activeWindow === 0) {
				return;
			}
			setActiveWindow((activeWindow) => activeWindow - 1);
			return;
		}
		if (clickedEl.dataset.role === "next") {
			if (activeWindow === maxActiveItem) {
				return;
			}
			setActiveWindow((activeWindow) => activeWindow + 1);
			return;
		}
	};

	useEffect(() => {
		setActiveWindow(0);
	}, [locas.length]);

	return (
		<div className="market-box">
			<h1 className="market-box__title">{capitalizeFirstCharacter(marketBoxTitle)}</h1>
			{catList.length > 4 && (
				<div className="market-box__control-btns" onClick={controlBtnsClickHandler}>
					<button className="market-box__btn" data-role="prev">
						&lt;
					</button>
					<button className="market-box__btn" data-role="next">
						&gt;
					</button>
				</div>
			)}
			<ul
				className="market-box__list"
				style={{
					display: `${catList.length > 0 ? "" : "none"}`,
				}}
			>
				{catList.map((cate, i) => (
					<li
						key={cate}
						className="market-box__list-item"
						style={{
							left: `${(i - activeWindow) * 25 + 1.19}%`,
						}}
					>
						<Link to={`${location}/${cate}`}>{capitalizeFirstCharacter(cate)}</Link>
						<p>{prodArray[i].length} Products</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MarketBox;
