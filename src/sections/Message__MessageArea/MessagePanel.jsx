import { useState } from "react";

import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import { ReactComponent as BoldSVG } from "../../Assets/star.min.svg";
import { ReactComponent as EmptyStarSVG } from "../../Assets/empty-star.svg";

import "./MessagePanel.scss";

const AllMessages = "All Messages",
	UnreadMessages = "Unread Messages",
	ImportantMessages = "Important Messages";

const MessagePanel = ({ selectMessageFnc, messagers }) => {
	const [selectOption, setSelectOption] = useState(AllMessages);
	const [searchUser, setSearchUser] = useState("");
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
	const formSubmitHandler = (e) => e.preventDefault();
	const resetSearchHandler = () => {
		setSearchUser("");
	};

	const selectMessageHandler = (e) => {
		const clickedMessage = e.target.closest(".message-panel__message-item");
		if (!clickedMessage) {
			return;
		}

		const messagePos = clickedMessage.dataset.pos;
		selectMessageFnc(messagePos);
	};

	return (
		<div className="message-panel">
			<div className="message-panel__top-panel">
				<form onSubmit={formSubmitHandler}>
					<div className="message-panel__select-container">
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
							className="message-panel__btn--search"
							onClick={resetSearchHandler}
						>
							X
						</CustomButton>
					</div>
				</form>
			</div>
			<ul className="message-panel__message-list" onClick={selectMessageHandler}>
				{messagesItems.map((mess, i) => {
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
								<p className="message-panel__message-message-content">
									{mess.messages.at(-1).content}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default MessagePanel;
