import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import CartWindow from "../../components/ShoppingCart/CartWindow";
import ErrorNotification2 from "../../components/Layout/NonModalErrorNotification";

import { baseURL, PROD_DIR } from "../../config";
import { ReactComponent as GiftSVG } from "../../Assets/gift.svg";
import { ReactComponent as SearchSVG } from "../../Assets/search.svg";
import { ReactComponent as CartSVG } from "../../Assets/shopping-cart.svg";
import "./UserHeader.scss";

const UserHeader = () => {
	const totalAmount = useSelector((store) => store.checkout.totalAmount);
	const [showError, setShowError] = useState(false)
	const [showShoppingCart, setShowShoppingCart] = useState(false);
	const history = useHistory();
	const searchBtnRef = useRef();

	const toggleShoppingCartHandler = () => {
		setShowShoppingCart((show) => !show);
	};

	const hideShoppingCartHandler = () => {
		setShowShoppingCart(false);
	};

	const searchHandler = (e) => {
		e.preventDefault();
		const searchValue = searchBtnRef.current.value;
		history.push(`${PROD_DIR}?search=${searchValue}`);
	};

	const showGiftHandler = () => {
		setShowError(true)
	}

	const hideErrorHandler = () => {
		setShowError(false)
	}

	return (
		<div className="user-header">
			{showError && <ErrorNotification2 onHide={hideErrorHandler} />}
			<div className="logo">
				<Link to={baseURL} className="user-header__logo">
					Hoangzzzsss
				</Link>
			</div>
			<div className="user-header__search-bar">
				<form onSubmit={searchHandler}>
					<input
						type="text"
						name="search"
						id="search-bar"
						ref={searchBtnRef}
						placeholder="Search for products..."
					/>
					<button type="submit">
						<SearchSVG className="search-icon" />
					</button>
				</form>
			</div>
			<div className="user-header__shopping-info">
				<div >
					<GiftSVG title="Gift" onClick={showGiftHandler} />
				</div>
				<div className="user-header__cart">
					<CartSVG title="Shopping Cart" onClick={toggleShoppingCartHandler} />
					<span className="cart-numbers">{totalAmount}</span>
					{showShoppingCart && <CartWindow hideWindow={hideShoppingCartHandler} />}
				</div>
			</div>
		</div>
	);
};

export default UserHeader;
