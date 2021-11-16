import { useState } from "react";
import Notification from "../../components/Layout/NonModalErrorNotification";

const AsideBar = ({ className = "", imgLink }) => {
	const [showNoti, setShowNoti] = useState(false);
	const showNotifiHandler = () => {
		setShowNoti(true);
	};
	const hideNotifiHandler = () => {
		setShowNoti(false);
	};

	return (
		<div className={`${className}`}>
			{showNoti && (
				<Notification
					errorContent="We're sorry. This event is ended. We'll remove this soon."
					btnContent="Close"
					onHide={hideNotifiHandler}
				/>
			)}
			<img src={imgLink} alt="" onClick={showNotifiHandler} />
		</div>
	);
};

export default AsideBar;
