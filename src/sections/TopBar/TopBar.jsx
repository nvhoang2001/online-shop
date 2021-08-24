import { useSelector } from "react-redux";

import BigCarosel from "../../components/Carosel/BigCarosel";
import AsideBar from "./AsideBar";

import { driveViewLink } from "../../config";
import "./Topbar.scss";

const ITEM_AMOUNT = 5;

const TopBar = () => {
	const products = useSelector((store) => store.products.items);
	const productsList = [...products];
	productsList.sort((prevIem, nextItem) => {
		return prevIem.viewInMonth - nextItem.viewInMonth;
	});

	const topProds = productsList.slice(0, ITEM_AMOUNT);

	return (
		<section className="TopBar">
			<BigCarosel className="TopBar__carosel" topProds={topProds} />
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
