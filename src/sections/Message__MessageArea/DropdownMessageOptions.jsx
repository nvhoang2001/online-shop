import Card from "../../components/Layout/Card";
import { ReactComponent as FlagSVG } from "../../Assets/flag.min.svg";
import "./DropdownMessageOptions.scss";

const DropdownMenu = ({
	isImportant,
	isRead,
	toggleReadHandler,
	toggleImportantHandler,
	showReportHandler,
}) => {
	return (
		<Card className="dropdown-menu">
			<ul className="dropdown-menu__list">
				<li className="dropdown-menu__item" onClick={toggleImportantHandler}>
					Mark As {isImportant ? "Unimportant" : "Important"}
				</li>
				<li className="dropdown-menu__item" onClick={toggleReadHandler}>
					Mark As {isRead ? "Unread" : "Read"}
				</li>
				<li className="dropdown-menu__item" onClick={showReportHandler}>
					<FlagSVG /> Report
				</li>
			</ul>
		</Card>
	);
};

export default DropdownMenu;
