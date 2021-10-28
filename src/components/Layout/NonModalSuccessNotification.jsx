import { ReactComponent as CheckSVG } from "../../Assets/check-circle.min.svg";
import "./NonModalSuccessNotification.scss";

const SuccessNotification2 = ({
	className = "",
	notifyContent = "Your product(s) was added to cart",
}) => {
	return (
		<div className={`success-notification2 ${className}`}>
			<div className="success-notification2__icon">
				<CheckSVG />
			</div>
			<div className="success-notification2__content">{notifyContent}</div>
		</div>
	);
};

export default SuccessNotification2;
