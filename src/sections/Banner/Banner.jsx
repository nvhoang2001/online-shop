import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { PROD_DIR } from "../../config";

import "./Banner.scss";

const Banner = () => {
	const bannerProd = useSelector((store) => store.products.items[20]);
	const { imgLink } = bannerProd;
	const linkConver = `${PROD_DIR}/${bannerProd.type}/${bannerProd.category}/${bannerProd.brand}`;
	console.log(bannerProd);
	return (
		<section className="banner">
			<Link to={linkConver} className="banner__link">
				<img src={imgLink} alt={bannerProd.name} className="banner__img" />
			</Link>
		</section>
	);
};

export default Banner;
