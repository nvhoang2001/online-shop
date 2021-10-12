import { useState, useEffect, useRef } from "react";

import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import { ReactComponent as EmptyStarSVG } from "../../Assets/empty-star.svg";
import { ReactComponent as FillStarSVG } from "../../Assets/star.min.svg";
import { DB_URL } from "../../config";
import "./MessageContent.scss";
import DropdownMenu from "./DropdownMessageOptions";

const MessageContent = ({ message, uid }) => {
	const [messageContent, setMessageContent] = useState("");
	const [showDropdown, setShowDropDown] = useState(false);
	const [messageIsImportant, setMessageIsImportant] = useState(message?.isImportant);
	const [messageIsRead, setMessageIsRead] = useState(message?.isRead);
	const listMessageRef = useRef();

	useEffect(() => {
		if (!message?.messages.length) {
			return;
		}

		const shouldScroll =
			listMessageRef.current.clientHeight === listMessageRef.current.scrollHeight;
		if (!shouldScroll) {
			listMessageRef.current.scrollTop = listMessageRef.current.scrollHeight;
		}
	}, [message?.messages.length]);

	useEffect(() => {
		if (message?.isImportant === undefined) {
			return;
		}

		message.isImportant = messageIsImportant;
	}, [messageIsImportant]);

	useEffect(() => {
		if (message?.isRead === undefined) {
			return;
		}

		message.isRead = messageIsRead;
	}, [messageIsRead]);

	console.log(message);

	if (!message) {
		return (
			<main className="message-content">
				<p className="message-content--empty">Select a message to read it here.</p>
			</main>
		);
	}

	const { imgLink, name, messages, id: messageKey } = message;

	const showDropdownHandler = () => {
		setShowDropDown(true);
	};
	const hideDropdownHandler = () => {
		setShowDropDown(false);
	};

	const toggleImportantHandler = () => {
		setMessageIsImportant((state) => !state);
	};
	const toggleReadHandler = () => {
		setMessageIsRead((state) => !state);
	};

	const editMessageHandler = (e) => {
		setMessageContent(e.target.value);
	};

	const sendMessageHandler = () => {
		if (!messageContent) {
			return;
		}

		messages.push({ content: messageContent, isAuthor: true, time: Date.now() });

		fetch(`${DB_URL}/message/${uid}/${messageKey}/messages.json`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(messages),
		});

		setMessageContent("");
	};

	return (
		<main className="message-content">
			<div className="message-content__user-bar" onMouseLeave={hideDropdownHandler}>
				<div className="message-content__user-field">
					{messageIsImportant ? (
						<FillStarSVG className="message-content__message-important" />
					) : (
						<EmptyStarSVG className="message-content__message-important" />
					)}
					<img src={imgLink} alt="" className="message-content__user-img" />
					<span className="message-content__user-name">{name}</span>
				</div>
				<div className="message-content__message-settings">
					<span onClick={showDropdownHandler}>&#x022EE;</span>
					{showDropdown && (
						<DropdownMenu
							isImportant={messageIsImportant}
							isRead={messageIsRead}
							toggleImportantHandler={toggleImportantHandler}
							toggleReadHandler={toggleReadHandler}
						/>
					)}
				</div>
			</div>
			<div className="message-content__message-area">
				<ul className="message-content__message-list" ref={listMessageRef}>
					{messages.map(({ content, time: timeStamp, isAuthor }) => {
						const messageTime = new Date(timeStamp);
						const time = `${messageTime.toLocaleDateString()} - ${messageTime.toLocaleTimeString()}`;
						return (
							<li
								className={`message-content__message-item ${
									isAuthor ? "message-content__message-item--author" : ""
								}`}
								title={time}
								key={timeStamp}
							>
								{content}
							</li>
						);
					})}
				</ul>
				<div className="message-content__message-editor">
					<textarea
						className="message-content__message-input"
						name="message"
						id="message"
						rows="5"
						placeholder="Type your message..."
						value={messageContent}
						onChange={editMessageHandler}
					></textarea>
					<CustomButton
						className="message-content__message-send"
						onClick={sendMessageHandler}
					>
						Send
					</CustomButton>
				</div>
			</div>
		</main>
	);
};

export default MessageContent;
