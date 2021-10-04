import MessagePanel from "./MessagePanel";
import "./MessageArea.scss";

const MessageArea = ({ messages }) => {
	return (
		<section className="message-area">
			<MessagePanel messages={messages} />
		</section>
	);
};

export default MessageArea;
