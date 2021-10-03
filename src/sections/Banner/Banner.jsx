import { Link } from "react-router-dom";

import "./Banner.scss";

const Banner = ({ imgLink }) => {
	return (
		<section className="banner">
			<Link to="#" className="banner__link">
				<div
					className="banner__img"
					style={{
						backgroundImage: `url(${imgLink})`,
					}}
				></div>
				{/* <img src={imgLink} alt="" className="banner__img" /> */}
			</Link>
		</section>
	);
};

export default Banner;
