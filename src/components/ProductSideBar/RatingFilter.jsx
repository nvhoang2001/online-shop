import { useContext } from "react";
import filterContext from "../../store/filterContext";

import { ReactComponent as OneAngle } from "../../Assets/1-angle.min.svg";
import { ReactComponent as TwoAngle } from "../../Assets/2-angle.min.svg";
import { ReactComponent as ThreeAngle } from "../../Assets/3-angle.min.svg";
import { ReactComponent as FourAngle } from "../../Assets/4-angle.min.svg";
import { ReactComponent as FiveAngle } from "../../Assets/5-angle.min.svg";

const RatingFilter = () => {
	const filterCtx = useContext(filterContext);
	const filterRating = filterCtx.rating;
	const buttons = [];
	for (let i = 0; i < 5; i++) {
		buttons.push(i + 1);
	}

	const selectRatingHandler = (e) => {
		const clickEl = e.target;
		const clickedBtn = clickEl.closest(".filter-rating__btn");
		if (!clickedBtn) {
			return;
		}

		const ratingValue = +clickedBtn.dataset.value;
		filterCtx.updateRating(ratingValue);
	};

	const resetRatingHandler = () => {
		filterCtx.updateRating(0);
	};

	return (
		<div className="filter-section filter-rating">
			<div className="filter-section-header">
				<h3>Rating:</h3>
				<button
					className="filter-section-btn"
					onClick={resetRatingHandler}
					title="Clear"
					disabled={filterRating === 0}
				>
					x
				</button>
			</div>
			<div className="filter-section-body filter-rating__body" onClick={selectRatingHandler}>
				{buttons.map((button, i) => {
					// const stars = new Array(button).fill("");
					let star;
					const buttonClasses = `filter-rating__btn ${
						filterRating === i + 1 ? "filter-rating__btn--active" : ""
					}`;

					switch (i) {
						case 0:
							star = <OneAngle />;
							break;
						case 1:
							star = <TwoAngle />;
							break;
						case 2:
							star = <ThreeAngle />;
							break;
						case 3:
							star = <FourAngle />;
							break;
						case 4:
							star = <FiveAngle />;
							break;
						default:
							break;
					}

					return (
						<button className={buttonClasses} data-value={i + 1} key={i}>
							{/* {stars.map((_, index) => (
								
								<div className="start-angle" key={index} />
							))} */}
							{star} {i + 1}.0 {"&"} up
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default RatingFilter;
