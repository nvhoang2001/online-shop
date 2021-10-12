import React, { useState, useEffect } from "react";
import { DB_URL } from "../config";

const messageContext = React.createContext({
	messages: [],
	updateMessage: (pos, propName, value) => {},
});

export const MessageProvider = ({ children, uid }) => {
	const [messages, setMessages] = useState([]);

	const updateMessageHandler = (pos, propName, value) => {
		const updatedMessages = [...messages];
		updatedMessages[pos][propName] = value;
		setMessages(updatedMessages);
	};

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
		<messageContext.Provider value={{ messages, updateMessage: updateMessageHandler }}>
			{children}
		</messageContext.Provider>
	);
};

export default messageContext;
