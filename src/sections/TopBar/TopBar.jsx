import { useSelector } from "react-redux";

import BigCarosel from "../../components/Carosel/BigCarosel";
import AsideBar from "./AsideBar";

import Aside1 from "../../Assets/side-banner-1.jpg";
import Aside2 from "../../Assets/side-banner-2.jpg";
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
			<AsideBar className="TopBar__aside" imgLink={Aside1} />
			<AsideBar className="TopBar__aside" imgLink={Aside2} />
		</section>
	);
};

export default TopBar;
