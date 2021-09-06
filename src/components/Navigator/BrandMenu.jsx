import { Link } from "react-router-dom";
import capitalizeFirstCharacter from "../../Helpers/capitalizeFirstChar";

const BrandMenu = (props) => {
	const { items, baseLink } = props;
	const categories = Object.keys(items);
	const brands = Object.values(items).map((brand) => Object.keys(brand));

	return (
		<ul className="nav__sub-cate">
			{categories.map((category, index) => {
				const linkItem = `${baseLink}/${category}`;
				return (
					<li key={category} className="nav__cate-item">
						<Link to={linkItem} className="title">
							{capitalizeFirstCharacter(category)}
						</Link>
						<ul>
							{brands[index].map((brand, i) => {
								if (i >= 5) {
									return null;
								}

								return (
									<li key={brand} className="nav__cate-link">
										<Link to={`${linkItem}/${brand}`}>{brand}</Link>
									</li>
								);
							})}
						</ul>
					</li>
				);
			})}
		</ul>
	);
};

export default BrandMenu;
