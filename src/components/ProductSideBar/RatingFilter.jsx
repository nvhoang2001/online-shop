import { useContext } from "react";
import filterContext from "../../store/filterContext";

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
					const stars = new Array(button).fill("");
					const buttonClasses = `filter-rating__btn ${
						filterRating === i + 1 ? "filter-rating__btn--active" : ""
					}`;

					return (
						<button className={buttonClasses} data-value={i + 1} key={i}>
							{stars.map((_, index) => (
								<div className="start-angle" key={index} />
							))}
							{i + 1}.0 {"&"} up
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default RatingFilter;
