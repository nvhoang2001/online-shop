import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import capitalizeFirstCharacter from "../../Helpers/capitalizeFirstChar";

const CategoriesList = (props) => {
	const { location } = props;
	const [showList, setShowList] = useState(true);
	const catedProds = useSelector((store) => store.products.catedItems);

	const locas = location.split("/");
	locas.at(0) === "" && locas.shift();
	locas.at(-1) === "" && locas.pop();
	let catList = [];
	if (locas.length <= 2) {
		let cates = catedProds;
		if (locas.length !== 1) {
			for (let i = 1; i < locas.length; i++) {
				cates = cates[locas[i]];
			}
		}
		catList = Object.keys(cates);
	}

	const toggleShowListHandler = () => {
		setShowList((isShow) => !isShow);
	};

	return (
		<div className="categories">
			<div className="categories__title">
				<h2>Category</h2>
				<button onClick={toggleShowListHandler} className="categories__btn">
					{showList && catList.length !== 0 ? "-" : "+"}
				</button>
			</div>

			<ul
				className="categories__list"
				style={{
					height: showList ? "auto" : "0",
				}}
			>
				{catList.map((cate) => (
					<li key={cate} className="categories__list-item">
						<Link to={`${location}/${cate}`}>{capitalizeFirstCharacter(cate)}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoriesList;
