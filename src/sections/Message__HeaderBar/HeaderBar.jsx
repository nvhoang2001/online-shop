import "./HeaderBar.scss";

const HeaderBar = ({ unRead }) => {
	return (
		<section className="header-bar">
			<h1 className="header-bar__title">Messages</h1>
			<p className="header-bar__unread-message">You have {unRead} unread message.</p>
		</section>
	);
};

export default HeaderBar;
