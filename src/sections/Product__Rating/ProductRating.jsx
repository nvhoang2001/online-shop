import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import CustomerFeedback from "../../components/CustomerFeedback/CustomerFeedback";
import RatingDetail from "../../components/RatingDetail/RatingDetail";
import "./ProductRating.scss";

const ProductRating = ({ product: { feedbacks, rating, ratingNum } }) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [selectedFeedbacks, setSelectedFeedbacks] = useState(feedbacks);
	const ratingParams = +searchParams.get("rating-sort");
	useEffect(() => {
		if (!ratingParams) {
			return;
		}

		setSelectedFeedbacks(feedbacks.filter((cmt) => Math.trunc(cmt.rating) === ratingParams));
	}, [ratingParams]);

	return (
		<section className="product-rating">
			<RatingDetail feedbacks={feedbacks} rating={rating} ratingNum={ratingNum} />
			<CustomerFeedback feedbacks={selectedFeedbacks} />
		</section>
	);
};

export default ProductRating;
