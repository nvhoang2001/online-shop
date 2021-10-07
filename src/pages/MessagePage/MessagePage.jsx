import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import HeaderBar from "../../sections/Message__HeaderBar/HeaderBar";
import MessageArea from "../../sections/Message__MessageArea/MessageArea";
import { DB_URL } from "../../config";

const MessagePage = () => {
	const [messages, setMessages] = useState([]);
	const uid = useSelector((store) => store.user.auth.localId);

	const unreadMessage =
		messages.length === 0
			? 0
			: messages.reduce((unread, message) => {
					if (message.isRead) return unread;
					return unread + 1;
			  }, 0);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`${DB_URL}/message/${uid}.json`);
				const messages = await response.json();

				for (const key in messages) {
					messages[key].id = key;
				}

				setMessages(Object.values(messages));
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<>
			<HeaderBar unRead={unreadMessage} />
			<MessageArea messages={messages} userId={uid} />
		</>
	);
};
export default MessagePage;
