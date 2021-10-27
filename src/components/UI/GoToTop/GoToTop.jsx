import { ReactComponent as UpArrowSVG } from "../../../Assets/up-arrow.min.svg";
import "./GoToTop.scss";

const GoToTop = () => {
	const goToTopHandler = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button className="go-top" onClick={goToTopHandler}>
			<span>
				<UpArrowSVG />
			</span>
			<span>Go Top</span>
		</button>
	);
};

export default GoToTop;
