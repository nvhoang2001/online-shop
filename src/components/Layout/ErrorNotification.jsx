import Card from "./Card";
import CustomButton from "../UI/CustomButton/CustomButton.component";

import { ReactComponent as CryEmoji } from "../../Assets/sad-tear.svg";
import "./ErrorNotification.scss";

const ErrorNotification = (props) => {
	const { btnContent } = props;
	return (
		<Card className="error-notify">
			<figure className="error-notify__container">
				<CryEmoji />
				<div className="error-notify__content">{props.children}</div>
				<CustomButton className="error-notify__btn" onClick={props.onHide}>
					{btnContent}
				</CustomButton>
			</figure>
		</Card>
	);
};

export default ErrorNotification;
