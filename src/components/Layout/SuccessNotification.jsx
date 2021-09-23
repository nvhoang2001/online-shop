import { ReactComponent as CheckIcon } from "../../Assets/check-circle.min.svg";
import "./SuccessNotification.scss";

const SuccessNotification = ({ className, children }) => {
	const notiClasses = `success-notify ${className ?? ""}`;
	return (
		<div className={notiClasses}>
			<h2 className="success-notify__title">Success</h2>
			<figure className="success-notify__container">
				<CheckIcon />
				<div className="success-notify__content">{children}</div>
			</figure>
		</div>
	);
};

export default SuccessNotification;
