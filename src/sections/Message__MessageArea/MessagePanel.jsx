import { useState, useEffect } from "react";

import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import { ReactComponent as SearchSVG } from "../../Assets/search.svg";
import { ReactComponent as BoldSVG } from "../../Assets/star.min.svg";
import { ReactComponent as EmptyStarSVG } from "../../Assets/empty-star.svg";
import { DB_URL } from "../../config";
import "./MessagePanel.scss";

const AllMessages = "All Messages",
	UnreadMessages = "Unread Messages",
	ImportantMessages = "Important Messages";

const MessagePanel = ({ messages }) => {
	const [selectOption, setSelectOption] = useState(AllMessages);
	const [userProfiles, setUserProfiles] = useState([]);
	const [searchUser, setSearchUser] = useState("");

	let messagers =
		messages.length !== userProfiles.length
			? []
			: userProfiles.map((urs, i) => {
					return {
						name: urs.username,
						imgLink: urs.profileImgs,
						...messages[i],
					};
			  });

	switch (selectOption) {
		case UnreadMessages: {
			messagers = messagers.filter((mess) => !mess.isRead);
			break;
		}
		case ImportantMessages: {
			messagers = messagers.filter((mess) => mess.isImportant);
			break;
		}
		default:
			break;
	}

	messagers = messagers.filter((mess) =>
		mess.name.toLowerCase().includes(searchUser.toLowerCase()),
	);

	const selectHandler = (e) => {
		setSelectOption(e.target.value);
	};
	const searchUserHandler = (e) => {
		setSearchUser(e.target.value);
	};
	const formSubmitHandler = (e) => e.preventDefault();

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
						<CustomButton className="message-panel__btn--search" onClick={() => {}}>
							<SearchSVG />
						</CustomButton>
					</div>
				</form>
			</div>
			<ul className="message-panel__message-list">
				{messagers.map((mess) => {
					const { name, isRead, imgLink, isImportant } = mess;
					return (
						<li className="message-panel__message-item" key={name}>
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