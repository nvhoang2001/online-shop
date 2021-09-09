import { Link } from "react-router-dom";
import NotFoundImg from "../../Assets/404.png";
import { baseURL } from "../../config";
import "./NotFound.scss";

const NotFound = () => {
	return (
		<section class="page_404">
			<div class="page_404__container">
				<figure className="page_404__img">
					<img src={NotFoundImg} alt="404 image" />
				</figure>
				<div class="page_404__noti">
					<h1 class="page_404__title">Look like you're lost</h1>

					<p>The page you are looking for not avaible!</p>

					<Link to={baseURL} class="page_404__link_404">
						Go to Home
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
