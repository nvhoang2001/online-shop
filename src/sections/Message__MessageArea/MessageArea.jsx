import { useState, useEffect, useContext } from "react";
import messageContext from "../../store/messageContext";

import MessagePanel from "./MessagePanel";
import MessageContent from "./MessageContent";

import { DB_URL } from "../../config";
import "./MessageArea.scss";

const MessageArea = ({ userId }) => {
	const messageCtx = useContext(messageContext);
	const { messages, addMessage } = messageCtx;

	const [messagers, setMessagers] = useState([]);
	const [selectMessage, setSelectMessage] = useState();
	const [userProfiles, setUserProfiles] = useState([]);
	const [isLoadingMessage, setIsLoadingMessage] = useState(true);
	const selectMessageHandler = (pos) => {
		setSelectMessage(pos);
	};

	useEffect(() => {
		(async () => {
			const userIds = messages.map((mes) => mes.withUser);
			const urls = userIds.map((id) => `${DB_URL}/profile/${id}.json`);
			try {
				const responses = await Promise.all(urls.map((url) => fetch(url)));
				const data = await Promise.all(responses.map((res) => res.json()));
				const ursProfiles = data.map((data) => {
					const [ursProfile] = Object.values(data);
					return ursProfile;
				});
				setUserProfiles(ursProfiles);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [messages.length]);

	useEffect(() => {
		if (messages.length !== userProfiles.length) {
			return;
		}
		const messagers = userProfiles.map((urs, i) => {
			return {
				name: urs.username,
				imgLink: urs.profileImgs,
				...messages[i],
			};
		});

		setMessagers(messagers);
		setIsLoadingMessage(false);
	}, [messages, userProfiles]);

	const addMessageHanler = (messagerID, successCallback, errorCallback) => {
		addMessage(
			messagerID,
			() => {
				successCallback();
				setSelectMessage(messages.length);
			},
			errorCallback,
		);
	};

	return (
		<section className="message-area">
			<MessagePanel
				messages={messages}
				messagers={messagers}
				onSelectMessage={selectMessageHandler}
				isLoading={isLoadingMessage}
				onComposeMessage={addMessageHanler}
			/>
			<MessageContent
				message={messagers[selectMessage]}
				messagePos={selectMessage}
				uid={userId}
			/>
		</section>
	);
};

export default MessageArea;
