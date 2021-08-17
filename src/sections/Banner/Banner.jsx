import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Banner.scss";

const Banner = () => {
	const bannerProd = useSelector((store) => store.products.items[20]);
	const { imgLink } = bannerProd;
	const linkConver = bannerProd.name.replaceAll(" ", "+");
	return (
		<section className="banner">
			<Link to={`/products/${bannerProd.type}/${linkConver}`} className="banner__link">
				<img src={imgLink} alt={bannerProd.name} className="banner__img" />
			</Link>
		</section>
	);
};

export default Banner;
