import { useHistory } from "react-router-dom";

import { ReactComponent as OneAngle } from "../../Assets/1-angle.min.svg";
import { ReactComponent as OneHalfAngle } from "../../Assets/1.5-angle.min.svg";
import { ReactComponent as TwoAngle } from "../../Assets/2-angle.min.svg";
import { ReactComponent as TwoHalfAngle } from "../../Assets/2.5-angle.min.svg";
import { ReactComponent as ThreeAngle } from "../../Assets/3-angle.min.svg";
import { ReactComponent as ThreeHalfAngle } from "../../Assets/3.5-angle.min.svg";
import { ReactComponent as FourAngle } from "../../Assets/4-angle.min.svg";
import { ReactComponent as FourHalfAngle } from "../../Assets/4.5-angle.min.svg";
import { ReactComponent as FiveAngle } from "../../Assets/5-angle.min.svg";

import "./RatingDetail.scss";

const RatingDetail = ({ feedbacks, rating, ratingNum }) => {
	const history = useHistory();

	let star;
	switch (true) {
		case rating <= 1:
			star = <OneAngle />;
			break;
		case rating <= 1.5:
			star = <OneHalfAngle />;
			break;
		case rating <= 2:
			star = <TwoAngle />;
			break;
		case rating <= 2.5:
			star = <TwoHalfAngle />;
			break;
		case rating <= 3:
			star = <ThreeAngle />;
			break;
		case rating <= 3.5:
			star = <ThreeHalfAngle />;
			break;
		case rating <= 4:
			star = <FourAngle />;
			break;
		case rating <= 4.5:
			star = <FourHalfAngle />;
			break;
		default:
			star = <FiveAngle />;
			break;
	}

	const ratingList = new Array(5).fill(0);
	feedbacks.forEach((feedback) => {
		ratingList[feedback.rating - 1]++;
	});

	const ratingStars = [<OneAngle />, <TwoAngle />, <ThreeAngle />, <FourAngle />, <FiveAngle />];

	const ratingListClickHandler = (e) => {
		const clickedEl = e.target;
		const clickedRatingItem = clickedEl.closest(".rating-detail__rating-item");
		if (!clickedRatingItem) {
			return;
		}
		const params = new URLSearchParams(history.location.search);
		if (!params.get("rating-sort")) {
			params.append("rating-sort", clickedRatingItem.dataset.rating);
			history.push(`${history.location.pathname}?${params.toString()}`);
			return;
		}

		params.set("rating-sort", clickedRatingItem.dataset.rating);
		history.push(`${history.location.pathname}?${params.toString()}`);
	};

	return (
		<div className="rating-detail">
			<h3 className="rating-detail__title">Customer reviews</h3>
			<div className="rating-detail__rating">
				{star} {rating} out of 5
			</div>
			<div className="rating-detail__rating-num">{ratingNum} global ratings</div>
			<div className="rating-detail__detail">
				<ul onClick={ratingListClickHandler}>
					{ratingStars.map((rating, i) => {
						const ratingRatio = Math.trunc((100 * ratingList[i]) / ratingNum);
						return (
							<li
								className="rating-detail__rating-item"
								title={`${i + 1} edges represent of ${ratingRatio}% rating`}
								key={i}
								data-rating={i + 1}
							>
								{rating}
								<div className="rating-detail__progress-bar">
									<div
										className="rating-detail__progress-bar--progress"
										style={{ width: `${ratingRatio}%` }}
									></div>
								</div>
								<span>{`${ratingRatio}%`}</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default RatingDetail;
