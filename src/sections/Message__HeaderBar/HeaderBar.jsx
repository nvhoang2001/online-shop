import "./HeaderBar.scss";

const HeaderBar = () => {
	return (
		<section className="header-bar">
			<h1 className="header-bar__title">Messages</h1>
			<p className="header-bar__unread-message">You have 0 unread message.</p>
		</section>
	);
};

export default HeaderBar;
