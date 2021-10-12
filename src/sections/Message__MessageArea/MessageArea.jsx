import { useState, useEffect } from "react";

import MessagePanel from "./MessagePanel";
import MessageContent from "./MessageContent";

import { DB_URL } from "../../config";
import "./MessageArea.scss";

const MessageArea = ({ messages, userId }) => {
	const [userProfiles, setUserProfiles] = useState([]);
	const [selectMessage, setSelectMessage] = useState();
	const [messagers, setMessagers] = useState([]);
	const selectMessageHandler = (pos) => {
		setSelectMessage(messagers[pos]);
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
	}, [messages.length, userProfiles.length]);

	return (
		<section className="message-area">
			<MessagePanel
				messages={messages}
				messagers={messagers}
				selectMessageFnc={selectMessageHandler}
			/>
			<MessageContent message={selectMessage} uid={userId} />
		</section>
	);
};

export default MessageArea;
