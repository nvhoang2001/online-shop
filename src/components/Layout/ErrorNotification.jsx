import Card from "./Card";
import CustomButton from "../UI/CustomButton/CustomButton.component";

import { ReactComponent as CryEmoji } from "../../Assets/sad-tear.svg";
import "./ErrorNotification.scss";

const ErrorNotification = ({ btnContent, className, children, onHide }) => {
	const notiClasses = `error-notify ${className ?? ""}`;
	return (
		<Card className={notiClasses}>
			<figure className="error-notify__container">
				<CryEmoji />
				<div className="error-notify__content">{children}</div>
				<CustomButton className="error-notify__btn" onClick={onHide}>
					{btnContent}
				</CustomButton>
			</figure>
		</Card>
	);
};

export default ErrorNotification;
