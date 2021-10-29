import { useState } from "react";

import { ReactComponent as UpArrowSVG } from "../../../Assets/up-arrow.min.svg";
import "./GoToTop.scss";

const GoToTop = () => {
	const [isMinimize, setIsMinimize] = useState(false);

	const toggleMinimizeHandler = () => {
		setIsMinimize((mini) => !mini);
	};

	const goToTopHandler = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			className={`go-top ${isMinimize ? "go-top--minimize" : ""}`}
			onClick={goToTopHandler}
		>
			<span>{isMinimize ? "\u21D1" : <UpArrowSVG />}</span>
			<div id="cross" onClick={toggleMinimizeHandler}>
				{isMinimize ? "+" : "x"}{" "}
			</div>
		</button>
	);
};

export default GoToTop;
