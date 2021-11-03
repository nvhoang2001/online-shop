import { useState, useEffect } from "react";

import CustomerFeedbackItem from "./CustomerFeedbackItem";
import Notification from "../Layout/NonModalNotification";

import { ReactComponent as MehEmoji } from "../../Assets/meh.min.svg";
import "./CustomerFeedback.scss";

const MAX_FEEDBACK = 5;

const CustomerFeedback = ({ feedbacks }) => {
	const [showedComment, setShowedComment] = useState([]);
	const [feedbackPage, setFeedbackPage] = useState(1);
	const [showNotification, setShowNotification] = useState(false);
	const MAX_CMT = Math.ceil(feedbacks.length / MAX_FEEDBACK);

	useEffect(() => {
		setShowedComment(
			feedbacks.filter((_, i) => {
				if (i >= feedbackPage * MAX_FEEDBACK) {
					return false;
				}
				return true;
			}),
		);
	}, [feedbackPage]);

	useEffect(() => {
		if (!showNotification) {
			return;
		}

		let timer = setTimeout(() => {
			setShowNotification(false);
		}, 5000);

		return () => {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			showNotification && setShowNotification(false);
		};
	}, [showNotification]);

	const loadPageHandler = () => {
		setFeedbackPage((no) => {
			if (no > MAX_CMT) {
				setShowNotification(true);
				return no;
			}

			return no + 1;
		});
	};

	return (
		<div className="customer-feedback">
			{showNotification && (
				<Notification className="customer-feedback__notify">
					<MehEmoji />
					<div className="customer-feedback__notify--out-of-feedback">
						You're at the end of feedback
					</div>
				</Notification>
			)}
			<h3 className="customer-feedback__title">Customer Feedbacks</h3>
			<ul className="customer-feedback__list">
				{showedComment.map((feedback) => {
					return (
						<CustomerFeedbackItem
							className="customer-feedback"
							feedback={feedback}
							key={feedback.userId}
						/>
					);
				})}
			</ul>

			<div className="customer-feedback__control-btns">
				<button className="customer-feedback__btn customer-feedback__btn-feedback">
					Add feedback
				</button>
				{MAX_CMT > 1 && (
					<button
						className="customer-feedback__btn customer-feedback__btn-next"
						onClick={loadPageHandler}
					>
						More feedbacks
					</button>
				)}
			</div>
		</div>
	);
};

export default CustomerFeedback;
