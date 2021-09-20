import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CustomerFeedbackItem from "../../components/CustomerFeedback/CustomerFeedbackItem";

import "./Activities.scss";

const Activities = ({ uid, username }) => {
	const products = useSelector((store) => store.products.items);
	const feedbackedProducts = products.filter((product) => {
		const { feedbacks } = product;
		return feedbacks.find((feedback) => feedback.username === username);
	});
	let userFeedback;
	if (feedbackedProducts.length > 0) {
		userFeedback = feedbackedProducts
			.map((product) => {
				const { feedbacks } = product;

				return feedbacks.filter((feedback) => feedback.username === username);
			})
			.flat(2);
	}

	return (
		<section className="community-activities">
			<h2 className="community-activities__title">Community activity</h2>
			<div className="community-activities__container">
				<ul>
					{feedbackedProducts.length === 0 && (
						<p className="community-activities__no-activity">No activity</p>
					)}
					{feedbackedProducts.length > 0 &&
						userFeedback.map((feedback, i) => {
							const { id, imgLink, name } = feedbackedProducts[i];

							return (
								<CustomerFeedbackItem
									className="community-activities"
									feedback={feedback}
									key={i}
								>
									<div className="community-activities__feedback-product">
										<img
											src={imgLink}
											alt=""
											className="community-activities__feedback-product-img"
										/>
										<Link
											to={`/product/${id}`}
											className="community-activities__feedback-product-link"
										>
											{name}
										</Link>
									</div>
								</CustomerFeedbackItem>
							);
						})}
				</ul>
			</div>
		</section>
	);
};

export default Activities;
