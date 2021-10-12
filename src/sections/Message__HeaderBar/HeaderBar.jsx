import { useContext } from "react";
import messageContext from "../../store/messageContext";
import "./HeaderBar.scss";

const HeaderBar = () => {
	const messageCtx = useContext(messageContext);
	const { messages } = messageCtx;
	const unreadMessage =
		messages.length === 0
			? 0
			: messages.reduce((unread, message) => {
					if (message.isRead) return unread;
					return unread + 1;
			  }, 0);

	return (
		<section className="header-bar">
			<h1 className="header-bar__title">Messages</h1>
			<p className="header-bar__unread-message">You have {unreadMessage} unread message.</p>
		</section>
	);
};

export default HeaderBar;
