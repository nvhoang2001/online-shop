import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CustomerFeedbackItem from "./CustomerFeedbackItem";

import "./CustomerFeedback.scss";

const MAX_FEEDBACK = 5;

const CustomerFeedback = ({ feedbacks }) => {
	const [showedComment, setShowedComment] = useState([]);
	const history = useHistory();
	const { location } = history;
	const searchParams = new URLSearchParams(location.search);
	const commentPage = +searchParams.get("comment") || 1;
	const MAX_PAGE = Math.ceil(feedbacks.length / MAX_FEEDBACK);

	useEffect(() => {
		if (commentPage === null) {
			setShowedComment(feedbacks.slice(0, MAX_FEEDBACK));
			return;
		}

		if (commentPage <= 0 || commentPage > MAX_PAGE) {
			setShowedComment([]);
			return;
		}

		setShowedComment(
			feedbacks.slice(MAX_FEEDBACK * (commentPage - 1), MAX_FEEDBACK * commentPage),
		);
	}, [commentPage, feedbacks]);

	const btnsClickHandler = (e) => {
		const clickEl = e.target;
		if (!clickEl.id) {
			return;
		}
		const replaceParams = new URLSearchParams(location.search);
		const commentPage = +searchParams.get("comment") || 1;
		if (clickEl.id === "control-btn-next") {
			replaceParams.set("comment", commentPage + 1);
		} else if (clickEl.id === "control-btn-prev") {
			replaceParams.set("comment", commentPage - 1);
		}
		history.push(`${location.pathname}?${replaceParams.toString()}`);
	};

	return (
		<div className="customer-feedback">
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
			{MAX_PAGE > 1 && (
				<div className="customer-feedback__control-btns" onClick={btnsClickHandler}>
					{commentPage !== 1 && <button id="control-btn-prev">Previous comments</button>}
					{commentPage < MAX_PAGE && <button id="control-btn-next">Next comments</button>}
				</div>
			)}
		</div>
	);
};

export default CustomerFeedback;
