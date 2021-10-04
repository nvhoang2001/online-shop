import { useEffect, useState } from "react";
import { RANDOM_KEY } from "../../config";
import HeaderBar from "../../sections/Message__HeaderBar/HeaderBar";
import MessageArea from "../../sections/Message__MessageArea/MessageArea";

const urls = [
	`https://randommer.io/api/Text/LoremIpsum?loremType=normal&type=paragraphs&number=${Math.ceil(
		Math.random() * 6,
	)}`,
	`https://randommer.io/api/Text/LoremIpsum?loremType=normal&type=paragraphs&number=${Math.ceil(
		Math.random() * 6,
	)}`,
	`https://randommer.io/api/Text/LoremIpsum?loremType=normal&type=paragraphs&number=${Math.ceil(
		Math.random() * 6,
	)}`,
	`https://randommer.io/api/Text/LoremIpsum?loremType=normal&type=paragraphs&number=${Math.ceil(
		Math.random() * 6,
	)}`,
	`https://randommer.io/api/Text/LoremIpsum?loremType=normal&type=paragraphs&number=${Math.ceil(
		Math.random() * 6,
	)}`,
];

const MessagePage = () => {
	const [messages, setMessages] = useState([]);

	const unreadMessage =
		messages.length === 0
			? 0
			: messages.reduce((unread, message) => {
					if (message.isRead) return unread;
					return unread + 1;
			  }, 0);

	useEffect(() => {
		(async () => {
			const messagers = [
				"0BrA5Dx6MABikU11hGJzhc8g5lYY1svrv",
				"0n5alphBtF2Pe1svokQRfU1ZYJgNuyptg",
				"1gYvWZmP5EKu8E2XqKDLAgnSN2aAhHbt7",
				"2Gq5ZgyIgWUev4f1gB9twdgvkKAaLYBXB",
				"338eG57JECMOfETA19WALDPnqbwnvpJ3S",
			];
			try {
				for (let i = 0; i < messagers.length; i++) {
					const messagerId = messagers[i];
					const requests = urls.map((url) =>
						fetch(url, {
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								"X-Api-Key": RANDOM_KEY,
							},
						}),
					);

					const responses = await Promise.all(requests);
					const data = await Promise.all(responses.map((res) => res.json()));

					const messages = data.map((mes, i) => {
						return {
							content: mes,
							time: Date.now() - 1_000_000 + i * 5000,
							isAuthor: Math.random() < 0.5 ? true : false,
						};
					});
					const message = {
						withUser: messagerId,
						isRead: Math.random() < 0.5 ? true : false,
						isImportant: Math.random() < 0.5 ? true : false,
						messages,
					};

					messagers[i] = message;
				}

				setMessages(messagers);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<>
			<HeaderBar unRead={unreadMessage} />
			<MessageArea messages={messages} />
		</>
	);
};
export default MessagePage;
