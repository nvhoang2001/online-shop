import "./NonModalErrorNotification.scss";

const ErrorNotification2 = ({
	errorContent = "We're very sorry! This feature is currently not availabel!",
	btnContent = "OK",
	onHide,
}) => {
	return (
		<div className="error-notification2">
			<p className="error-notification2__content">{errorContent}</p>
			<div className="error-notification2__btns-container">
				<button className="error-notification2__btn--hide" onClick={onHide}>
					{btnContent}
				</button>
			</div>
		</div>
	);
};

export default ErrorNotification2;
