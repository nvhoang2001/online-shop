import { Link } from "react-router-dom";

import { baseURL } from "../../config";
import { ReactComponent as GiftSVG } from "../../Assets/gift.svg";
import { ReactComponent as CartSVG } from "../../Assets/shopping-cart.svg";
import { ReactComponent as SearchSVG } from "../../Assets/search.svg";
import "./UserHeader.scss";
import { useSelector } from "react-redux";
import CartWindow from "../../components/ShoppingCart/CartWindow";
import { useState } from "react";

const UserHeader = () => {
	const totalAmount = useSelector((store) => store.checkout.totalAmount);
	const [showShoppingCart, setShowShoppingCart] = useState(false);

	const toggleShoppingCartHandler = () => {
		setShowShoppingCart((show) => !show);
	};

	return (
		<div className="user-header">
			<div className="logo">
				<Link to={baseURL} className="user-header__logo">
					Hoangzzzsss
				</Link>
			</div>
			<div className="user-header__search-bar">
				<input
					type="text"
					name="search"
					id="search-bar"
					placeholder="Search for products..."
				/>
				<SearchSVG className="search-icon" />
			</div>
			<div className="user-header__shopping-info">
				<GiftSVG title="Gift" />
				<CartSVG title="Shopping Cart" onClick={toggleShoppingCartHandler} />
				<span className="cart-numbers">{totalAmount}</span>
				{showShoppingCart && <CartWindow />}
			</div>
		</div>
	);
};

export default UserHeader;
