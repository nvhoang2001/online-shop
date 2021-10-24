import { useState, useRef, useEffect } from "react";

import DotsLoader from "../../components/UI/Loader/DotsLoader";
import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import { ReactComponent as BoldSVG } from "../../Assets/star.min.svg";
import { ReactComponent as EmptyStarSVG } from "../../Assets/empty-star.svg";
import { ReactComponent as PlusSVG } from "../../Assets/plus.min.svg";

import "./MessagePanel.scss";

const AllMessages = "All Messages",
	UnreadMessages = "Unread Messages",
	ImportantMessages = "Important Messages";

const MessagePanel = ({ onSelectMessage, messagers, isLoading, onComposeMessage }) => {
	const panelRef = useRef();
	const topPanelRef = useRef();

	const [searchUser, setSearchUser] = useState("");
	const [listHeight, setListHeight] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [showCompose, setShowCompose] = useState(false);
	const [selectOption, setSelectOption] = useState(AllMessages);
	let messagesItems = messagers;

	switch (selectOption) {
		case UnreadMessages: {
			messagesItems = messagesItems.filter((mess) => !mess.isRead);
			break;
		}
		case ImportantMessages: {
			messagesItems = messagesItems.filter((mess) => mess.isImportant);
			break;
		}
		default:
			break;
	}

	messagesItems = messagesItems.filter((mess) =>
		mess.name.toLowerCase().includes(searchUser.toLowerCase()),
	);

	const selectHandler = (e) => {
		setSelectOption(e.target.value);
	};
	const searchUserHandler = (e) => {
		setSearchUser(e.target.value);
	};

	const toggleShowComposeHanlder = () => {
		setShowCompose((show) => !show);
	};

	const successComposeHandler = () => {
		hideComposeFormHandler();
		setErrorMessage("");
	};

	const errorComposeHandler = (errorText) => {
		setErrorMessage(errorText);
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();
		const formEl = e.target;
		const { "user-id": messageUserInpEl } = formEl;
		const { value: userId } = messageUserInpEl;
		if (!userId.trim()) {
			return;
		}
		onComposeMessage(userId, successComposeHandler, errorComposeHandler);
	};

	const hideComposeFormHandler = (e) => {
		if (e?.target?.tagName === "INPUT") {
			return;
		}
		setShowCompose(false);
		setErrorMessage("");
	};

	const resetSearchHandler = () => {
		setSearchUser("");
	};

	const selectMessageHandler = (e) => {
		const clickedMessage = e.target.closest(".message-panel__message-item");
		if (!clickedMessage) {
			return;
		}

		const messagePos = clickedMessage.dataset.pos;
		onSelectMessage(messagePos);
	};

	useEffect(() => {
		setListHeight(
			`${
				parseFloat(getComputedStyle(panelRef.current).height) -
				parseFloat(getComputedStyle(topPanelRef.current).height)
			}px`,
		);
	}, []);
	console.log(listHeight);
	return (
		<div className="message-panel" ref={panelRef}>
			<div
				className="message-panel__top-panel"
				onMouseLeave={hideComposeFormHandler}
				ref={topPanelRef}
			>
				<form onSubmit={formSubmitHandler}>
					<div className="message-panel__select-container">
						<CustomButton
							className="message-panel__btn--compose"
							onClick={toggleShowComposeHanlder}
						>
							Compose
						</CustomButton>

						<select
							name="message-type"
							id="message-type"
							className="message-panel__input--select"
							onChange={selectHandler}
							value={selectOption}
						>
							<option value={AllMessages}>All Messages</option>
							<option value={UnreadMessages}>Unread Messages</option>
							<option value={ImportantMessages}>Important Messages</option>
						</select>
						{showCompose && (
							<div className="message-panel__compose">
								<div className="message-panel__compose-container">
									<p>
										<label
											htmlFor="message-compose"
											className="message-panel__compose-label"
										>
											User's ID:
										</label>
									</p>
									<div className="message-panel__compose-input">
										<input
											type="text"
											name="user-id"
											id="message-compose"
											className="message-panel__input--compose"
											placeholder="Type user's id you want to contact"
										/>
										<CustomButton
											className="message-panel__btn--add"
											type="submit"
										>
											<PlusSVG />
										</CustomButton>
									</div>
									{errorMessage && (
										<p className="error-text message-panel__error-text">
											Error: {errorMessage}
										</p>
									)}
								</div>
							</div>
						)}
					</div>
					<div className="message-panel__search-field">
						<input
							type="text"
							className="message-panel__input--search"
							placeholder="Search"
							onChange={searchUserHandler}
							value={searchUser}
						/>
						<CustomButton
							className="message-panel__btn--clear"
							onClick={resetSearchHandler}
						>
							X
						</CustomButton>
					</div>
				</form>
			</div>
			<ul
				className="message-panel__message-list"
				onClick={selectMessageHandler}
				style={{
					height: listHeight,
				}}
			>
				{isLoading && (
					<div className="message-panel__loader">
						<DotsLoader />
					</div>
				)}
				{!isLoading && messagesItems.length === 0 && (
					<p className="message-panel__no-message">You have no messages</p>
				)}
				{!isLoading &&
					messagesItems.length > 0 &&
					messagesItems.map((mess, i) => {
						const { name, isRead, imgLink, isImportant, id } = mess;
						return (
							<li className="message-panel__message-item" key={id} data-pos={i}>
								<div className="message-panel__message-user">
									<div>
										<input
											className="message-panel__message-user-read"
											type="radio"
											checked={isRead}
											readOnly
										/>
										<img
											className="message-panel__message-user-img"
											src={imgLink}
											alt={name}
										/>
									</div>
									<div>
										{isImportant ? (
											<BoldSVG className="message-panel__message-user-important" />
										) : (
											<EmptyStarSVG className="message-panel__message-user-important" />
										)}
									</div>
								</div>
								<div className="message-panel__message-message">
									<p className="message-panel__message-message-name">
										<strong>{name}</strong>
									</p>

									{mess?.messages?.length > 0 ? (
										<p className="message-panel__message-message-content">
											{mess.messages.at(-1).content}
										</p>
									) : (
										<p className="message-panel__message-message-content"></p>
									)}
								</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default MessagePanel;
