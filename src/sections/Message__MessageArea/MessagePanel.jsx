import { useState } from "react";

import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import { ReactComponent as SearchSVG } from "../../Assets/search.svg";
import "./MessagePanel.scss";

const MessagePanel = ({ messages }) => {
	console.log(messages);
	const [selectOption, setSelectOption] = useState("All Messages");
	const [searchUser, setSearchUser] = useState("");
	const selectHandler = (e) => {
		setSelectOption(e.target.value);
	};
	const searchUserHandler = (e) => {
		setSearchUser(e.target.value);
	};
	const formSubmitHandler = (e) => e.preventDefault();

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
							<option value="All Messages">All Messages</option>
							<option value="Unread Messages">Unread Messages</option>
							<option value="Important Messages">Important Messages</option>
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
			<ul className="message-panel__message-list"></ul>
		</div>
	);
};

export default MessagePanel;
