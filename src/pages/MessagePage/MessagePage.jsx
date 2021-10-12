import { useSelector } from "react-redux";

import { MessageProvider } from "../../store/messageContext";
import HeaderBar from "../../sections/Message__HeaderBar/HeaderBar";
import MessageArea from "../../sections/Message__MessageArea/MessageArea";

const MessagePage = () => {
	const uid = useSelector((store) => store.user.auth.localId);

	return (
		<MessageProvider uid={uid}>
			<HeaderBar />
			<MessageArea userId={uid} />
		</MessageProvider>
	);
};
export default MessagePage;
