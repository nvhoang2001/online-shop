import { ReactComponent as CheckIcon } from "../../Assets/check-circle.min.svg";
import "./SuccessNotification.scss";

const SuccessNotification = (props) => {
	return (
		<div className="success-notify">
			<h2 className="success-notify__title">Success</h2>
			<figure className="success-notify__container">
				<CheckIcon />
				<div className="success-notify__content">{props.children}</div>
			</figure>
		</div>
	);
};

export default SuccessNotification;
