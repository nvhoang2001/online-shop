import React, { useState, useEffect } from "react";
import sendDataToURL from "../Helpers/sendDataToURL";
import { DB_URL } from "../config";

const messageContext = React.createContext({
	messages: [],
	updateMessage: (pos, propName, value) => {},
	addMessage: (uid) => {},
});

export const MessageProvider = ({ children, uid }) => {
	const [messages, setMessages] = useState([]);

	const updateMessageHandler = (pos, propName, value) => {
		const updatedMessages = [...messages];
		updatedMessages[pos][propName] = value;
		setMessages(updatedMessages);
	};

	const addMessageHandler = (messUid, successCallback, errorCallBack) => {
		for (const mes of messages) {
			if (messUid === mes.withUser) {
				errorCallBack("You messaged that person already!");
				return;
			}
		}
		const messageObj = {
			isRead: true,
			isImportant: false,
			messages: [],
			withUser: messUid,
		};
		fetch(`${DB_URL}/profile/${messUid}.json`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (!data) {
					throw new Error("Can't find that person!");
				}
				return sendDataToURL(`${DB_URL}/message/${uid}.json`, messageObj);
			})
			.then((res) => {
				messageObj.id = res.name;
				const updatedMessages = [...messages, messageObj];
				setMessages(updatedMessages);
				successCallback();
			})
			.catch((err) => {
				console.error(err);
				errorCallBack(err.message);
			});
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`${DB_URL}/message/${uid}.json`);
				const messages = await response.json();

				for (const key in messages) {
					messages[key].id = key;
					if (!messages[key]?.messages?.length) {
						messages[key].messages = [];
					}
				}

				setMessages(Object.values(messages));
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<messageContext.Provider
			value={{ messages, updateMessage: updateMessageHandler, addMessage: addMessageHandler }}
		>
			{children}
		</messageContext.Provider>
	);
};

export default messageContext;
