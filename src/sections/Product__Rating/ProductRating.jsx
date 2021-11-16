import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import CustomerFeedback from "../../components/CustomerFeedback/CustomerFeedback";
import RatingDetail from "../../components/RatingDetail/RatingDetail";
import "./ProductRating.scss";

const ProductRating = ({
	product: { feedbacks, rating, ratingNum, imgLink, name: productName, id: productId },
	feedbackable,
}) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [selectedFeedbacks, setSelectedFeedbacks] = useState(feedbacks);
	const ratingParams = +searchParams.get("rating-sort");
	useEffect(() => {
		if (!ratingParams) {
			setSelectedFeedbacks([...feedbacks]);
			return;
		}

		setSelectedFeedbacks(feedbacks.filter((cmt) => Math.trunc(cmt.rating) === ratingParams));
	}, [ratingParams, feedbacks]);

	return (
		<section className="product-rating">
			<RatingDetail feedbacks={feedbacks} rating={rating} ratingNum={ratingNum} />
			<CustomerFeedback
				feedbacks={selectedFeedbacks}
				productImg={imgLink}
				productName={productName}
				productId={productId}
				feedbackable={feedbackable}
			/>
		</section>
	);
};

export default ProductRating;
