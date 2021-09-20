import { Link } from "react-router-dom";

import { ReactComponent as OneAngle } from "../../Assets/1-angle.min.svg";
import { ReactComponent as TwoAngle } from "../../Assets/2-angle.min.svg";
import { ReactComponent as ThreeAngle } from "../../Assets/3-angle.min.svg";
import { ReactComponent as FourAngle } from "../../Assets/4-angle.min.svg";
import { ReactComponent as FiveAngle } from "../../Assets/5-angle.min.svg";
import { PUBLIC_USR } from "../../config";

const CustomerFeedbackItem = ({ className, feedback, children }) => {
	const { userId, username, rating, feedbackTime, content } = feedback;
	const ratingStars = [<OneAngle />, <TwoAngle />, <ThreeAngle />, <FourAngle />, <FiveAngle />];
	return (
		<li className={`${className}__feedback`} key={userId}>
			<h4 className={`${className}__user`}>
				<Link className={`${className}__username`} to={`${PUBLIC_USR}/${userId}`}>
					{username}
				</Link>
				<span title={`rating ${rating}`}>Rating{ratingStars[rating - 1]}</span>
			</h4>

			<p className={`${className}__feedback-time`}>Reviewed on {feedbackTime}</p>
			<p className={`${className}__feedback-content`}>{content}</p>
			{children}
		</li>
	);
};

export default CustomerFeedbackItem;
