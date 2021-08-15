import { useDispatch, useSelector } from "react-redux";
import BigCarosel from "../../components/Carosel/BigCarosel";
import { driveViewLink } from "../../config";
import { productActions } from "../../store/product-slice";
import AsideBar from "./AsideBar";

import "./Topbar.scss";

const ITEM_AMOUNT = 5;

const TopBar = () => {
	const dispatch = useDispatch();

	dispatch(productActions.setTopViewItems(ITEM_AMOUNT));

	const topProds = useSelector((store) => store.products.topItems);

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
