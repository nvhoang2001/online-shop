import { useEffect } from "react";
import { RANDOM_KEY } from "../../config";
import HeaderBar from "../../sections/Message__HeaderBar/HeaderBar";

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
	useEffect(() => {
		(async () => {
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
			console.log(data);
		})();
	}, []);

	return (
		<>
			<HeaderBar />
		</>
	);
};
export default MessagePage;
