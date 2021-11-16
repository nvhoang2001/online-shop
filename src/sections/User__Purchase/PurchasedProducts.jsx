import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DB_URL } from "../../config";

import Order from "./Order";
import ClonesLoader from "../../components/UI/Loader/ClonesLoader";

import { ReactComponent as CartSVG } from "../../Assets/shopping-cart.svg";
import "./PurchasedProducts.scss";

const FETCHING_DATA = null;
const orderTypes = ["all", "completed", "delivering", "processing", "cancel"];
let orderItems = null;

const PurchasedProducts = () => {
	const [orders, setOrders] = useState(FETCHING_DATA);
	const [timestamp, setTimestamp] = useState(null);

	const uid = useSelector((store) => store.user.auth.localId);
	const location = useLocation();

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`${DB_URL}/checkout/${uid}.json`);
				const resData = await response.json();
				if (!resData) {
					throw new Error("No purchase");
				}

				for (const id in resData) {
					resData[id].id = id;
				}
				orderItems = Object.values(resData);
				const searchURL = new URLSearchParams(location.search);
				const orderType = searchURL.get("type");
				if (!orderType) {
					setOrders(orderItems);
				} else {
					setOrders(orderItems.filter((order) => order.state === orderType));
				}
				setTimestamp(Date.now());
			} catch (error) {
				setOrders([]);
			}
		})();
	}, []);

	useEffect(() => {
		if (!orders) {
			return;
		}

		const searchURL = new URLSearchParams(location.search);
		const orderType = searchURL.get("type");
		if (!orderType) {
			setOrders(orderItems);
			return;
		}
		setOrders(orderItems.filter((order) => order.state === orderType));
	}, [location.search]);

	let ordersContent = (
		<div className="purchase__fetching">
			<ClonesLoader className="purchase__loader" />
			<p>We're fetching data</p>
		</div>
	);

	if (orders?.length === 0) {
		ordersContent = (
			<div className="purchase__orders--none">
				<CartSVG className="purchase__cart-icon" />
				<p className="purchase__noti">You have no orders</p>
			</div>
		);
	} else if (orders?.length > 0) {
		ordersContent = (
			<ul className="purchase__orders">
				{orders.map((order) => {
					return <Order time={timestamp} {...order} key={order.id} />;
				})}
			</ul>
		);
	}

	return (
		<section className="purchase">
			<nav className="purchase__nav">
				<ul>
					<li>
						<Link to={location.pathname}>All</Link>
					</li>
					<li>
						<Link to={`${location.pathname}?type=${orderTypes[1]}`}>Completed</Link>
					</li>
					<li>
						<Link to={`${location.pathname}?type=${orderTypes[2]}`}>Delivering</Link>
					</li>
					<li>
						<Link to={`${location.pathname}?type=${orderTypes[3]}`}>Processing</Link>
					</li>
					<li>
						<Link to={`${location.pathname}?type=${orderTypes[4]}`}>Cancel</Link>
					</li>
				</ul>
			</nav>

			{ordersContent}
		</section>
	);
};

export default PurchasedProducts;
