import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DB_URL } from "../../config";

import ClonesLoader from "../../components/UI/Loader/ClonesLoader";

import { ReactComponent as CartSVG } from "../../Assets/shopping-cart.svg";

import "./PurchasedProducts.scss";
import Order from "./Order";

const IS_FETCHING = null;

const PurchasedProducts = () => {
	const [orders, setOrders] = useState(IS_FETCHING);
	const [timestamp, setTimestamp] = useState(null);

	const uid = useSelector((store) => store.user.auth.localId);

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
				const purchaseData = Object.values(resData);
				setOrders(purchaseData);
				setTimestamp(Date.now());
			} catch (error) {
				setOrders([]);
			}
		})();
	}, []);

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
						<Link to="#">All</Link>
					</li>
					<li>
						<Link to="#">Completed</Link>
					</li>
					<li>
						<Link to="#">Delivering</Link>
					</li>
					<li>
						<Link to="#">Progessing</Link>
					</li>
					<li>
						<Link to="#">Cancel</Link>
					</li>
				</ul>
			</nav>

			{ordersContent}
		</section>
	);
};

export default PurchasedProducts;
