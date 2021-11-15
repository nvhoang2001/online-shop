import { useState } from "react";
import { useDispatch } from "react-redux";

import CustomButton from "../UI/CustomButton/CustomButton.component";
import { addFeedbackToProduct } from "../../store/product-slice";
import { FEEDBACKING, FEEDBACK_ERROR } from "../../store/user-slice";

import "./FeedbackForm.scss";

const FEEDBACK_URL = "https://jsonplaceholder.typicode.com/posts";
const FeedbackForm = ({ imgLink, productName, userInfo, productId, onHide, feedbackState }) => {
	const [hoverInput, setHoverInput] = useState(0);
	const [checkedInput, setCheckedInput] = useState(0);
	const [enteredValidInput, setEnteredValidInput] = useState(true);
	const RatingLabels = ["", "Very Bad", "Bad", "Normal", "Good", "Very Good"];
	const dispatch = useDispatch();

	const inputHoverHandler = (e) => {
		setHoverInput(+e.target.value);
	};

	const inputClickHandler = (e) => {
		setCheckedInput(+e.target.value);
	};

	const ratingMouseOutHandler = () => {
		setHoverInput(0);
	};

	const feedbackSubmitHandler = (e) => {
		e.preventDefault();
		const {
			username,
			auth: { localId: userId },
		} = userInfo;
		const {
			rating: { value: rating },
			feedback: { value: content },
		} = e.target;

		if (content.trim() === "" || rating.trim() === "") {
			setEnteredValidInput(false);
			return;
		}

		const feedbackTime = new Date().toLocaleString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		const feedbackObj = {
			userId,
			username,
			rating: +rating,
			feedbackTime,
			content,
		};
		dispatch(addFeedbackToProduct(productId, feedbackObj, FEEDBACK_URL));
	};

	let submitBtnContent = "Feedback Now";

	if (feedbackState === FEEDBACKING) {
		submitBtnContent = "Your feedback is processing...";
	}

	return (
		<div className="feedback-form">
			<h3 className="feedback-form__title">Feedback</h3>
			<button className="feedback-form__btn-close" onClick={onHide}>
				Close
			</button>

			<figure className="feedback-form__product">
				<img src={imgLink} alt="" className="feedback-form__product-img" />
				<figcaption className="feedback-form__product-name">{productName}</figcaption>
			</figure>
			<form className="feedback-form__form" onSubmit={feedbackSubmitHandler}>
				<div className="feedback-form__rating">
					<p>How do you feel about this product?</p>
					<div>
						<div
							className="feedback-form__rating-stars"
							onMouseLeave={ratingMouseOutHandler}
						>
							<input
								type="radio"
								name="rating"
								value="1"
								onMouseEnter={inputHoverHandler}
								onClick={inputClickHandler}
							/>
							<input
								type="radio"
								name="rating"
								value="2"
								onMouseEnter={inputHoverHandler}
								onClick={inputClickHandler}
							/>
							<input
								type="radio"
								name="rating"
								value="3"
								onMouseEnter={inputHoverHandler}
								onClick={inputClickHandler}
							/>
							<input
								type="radio"
								name="rating"
								value="4"
								onMouseEnter={inputHoverHandler}
								onClick={inputClickHandler}
							/>
							<input
								type="radio"
								name="rating"
								value="5"
								onMouseEnter={inputHoverHandler}
								onClick={inputClickHandler}
							/>
							<i
								style={{
									background: `conic-gradient(from -36deg,rgba(255, 0, 0, 0.3) ${
										hoverInput * 72
									}deg, #0000 0
							), conic-gradient(from -36deg, gold ${checkedInput * 72}deg, #0000 0), #ccc`,
								}}
							></i>
						</div>
						<p>
							{hoverInput !== 0
								? RatingLabels[hoverInput]
								: RatingLabels[checkedInput]}
						</p>
					</div>
				</div>
				<div className="feedback-form__feedback">
					<textarea
						name="feedback"
						rows="7"
						placeholder="Please share your experiences..."
					></textarea>
				</div>
				<CustomButton
					className="feedback-form__btn-submit"
					type="submit"
					disabled={feedbackState === FEEDBACKING}
				>
					{submitBtnContent}
				</CustomButton>
			</form>
			<div className="feedback-form__caution">
				{!enteredValidInput && (
					<p className="feedback-form__caution--imp">Please enter valid form!</p>
				)}
				{feedbackState === FEEDBACK_ERROR && (
					<p className="feedback-form__caution--imp">
						We can't send your feedback to the server. Please try again. <br /> If this
						still happen, please feedback again at another time.
					</p>
				)}
				<p>We may delete your feedback if it violates our Community Rules</p>
			</div>
		</div>
	);
};
export default FeedbackForm;
