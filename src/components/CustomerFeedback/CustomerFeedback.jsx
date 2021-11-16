import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FEEDBACK_SUCCESS } from "../../store/user-slice";

import Modal from "../UI/Modal/Modal";
import FeedbackForm from "./FeedbackForm";
import CustomerFeedbackItem from "./CustomerFeedbackItem";
import Notification from "../Layout/NonModalNotification";

import { ReactComponent as MehEmoji } from "../../Assets/meh.min.svg";
import { ReactComponent as SadEmoji } from "../../Assets/sad-face.min.svg";
import { ReactComponent as CheckIcon } from "../../Assets/check-circle.min.svg";
import "./CustomerFeedback.scss";

const MAX_FEEDBACK = 5;

const notificationContents = [
	<>
		<MehEmoji />
		<div className="customer-feedback__notify--out-of-feedback">
			You're at the end of feedback
		</div>
	</>,
	<>
		<CheckIcon style={{ color: "greenyellow" }} />
		<div className="customer-feedback__notify--out-of-feedback">Your feedback is posted</div>
	</>,
	<>
		<SadEmoji style={{ color: "blueviolet" }} />
		<div className="customer-feedback__notify--out-of-feedback">
			We're sorry, you can't feedback in this product
		</div>
	</>,
];

const CustomerFeedback = ({ feedbacks, productImg, productName, productId, feedbackable }) => {
	const [showedComment, setShowedComment] = useState([]);
	const [feedbackPage, setFeedbackPage] = useState(1);
	const [showNotification, setShowNotification] = useState(false);
	const [showFeedbackForm, setShowFeedbackForm] = useState(false);
	const [notificationIndex, setNotificationIndex] = useState(0);
	const userInfo = useSelector((store) => store.user);
	const feedbackState = userInfo.feedbackState;
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
	}, [feedbackPage, feedbacks]);

	useEffect(() => {
		if (feedbackState !== FEEDBACK_SUCCESS) {
			return;
		}

		setShowFeedbackForm(false);
		setShowNotification(true);
		setNotificationIndex(1);
		let timer = setTimeout(() => {
			setShowNotification(false);
			timer = null;
		}, 5000);

		return () => {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			showNotification && setShowNotification(false);
		};
	}, [feedbackState]);

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
				setNotificationIndex(0);
				return no;
			}

			return no + 1;
		});
	};

	const showFeedbackFormHandler = () => {
		if (!feedbackable) {
			setNotificationIndex(2);
			setShowNotification(true);
			return;
		}

		setShowFeedbackForm(true);
	};
	const hideFeedbackFormHandler = () => {
		setShowFeedbackForm(false);
	};

	return (
		<div className="customer-feedback">
			{showNotification && (
				<Notification className="customer-feedback__notify">
					{notificationContents[notificationIndex]}
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
				{userInfo.auth && (
					<button
						className="customer-feedback__btn customer-feedback__btn-feedback"
						onClick={showFeedbackFormHandler}
					>
						Add feedback
					</button>
				)}
				{MAX_CMT > 1 && (
					<button
						className="customer-feedback__btn customer-feedback__btn-next"
						onClick={loadPageHandler}
						style={{
							width: userInfo.auth ? "" : "100%",
						}}
					>
						More feedbacks
					</button>
				)}
			</div>
			{showFeedbackForm && (
				<Modal onHide={hideFeedbackFormHandler}>
					<FeedbackForm
						imgLink={productImg}
						productName={productName}
						userInfo={userInfo}
						productId={productId}
						onHide={hideFeedbackFormHandler}
						feedbackState={feedbackState}
					/>
				</Modal>
			)}
		</div>
	);
};

export default CustomerFeedback;
