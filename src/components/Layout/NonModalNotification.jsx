import "./NonModalNotification.scss";

const Notification = ({ className = "", children }) => {
	return <div className={`notification ${className}`}>{children}</div>;
};

export default Notification;
