import BigCarosel from "../../components/Carosel/BigCarosel";
import { driveViewLink } from "../../config";
import AsideBar from "./AsideBar";

import "./Topbar.scss";

const TopBar = () => {
	return (
		<section className="TopBar">
			<BigCarosel className="TopBar__carosel" />
			<AsideBar
				className="TopBar__aside"
				link={driveViewLink + "1bunegyOuB-hMpsl4sysW378rIbk_NJOh"}
				to="#"
			/>
			<AsideBar
				className="TopBar__aside"
				link={driveViewLink + "1bunegyOuB-hMpsl4sysW378rIbk_NJOh"}
				to="#"
			/>
		</section>
	);
};

export default TopBar;
