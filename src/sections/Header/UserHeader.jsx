import { Link } from "react-router-dom";

import { baseURL } from "../../config";
import { ReactComponent as GiftSVG } from "../../Assets/gift.svg";
import { ReactComponent as CartSVG } from "../../Assets/shopping-cart.svg";
import { ReactComponent as SearchSVG } from "../../Assets/search.svg";
import "./UserHeader.scss";

const UserHeader = () => {
	const cartNum = 0;

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
				<CartSVG title="Shopping Cart" />
				<span className="cart-numbers">{cartNum}</span>
			</div>
		</div>
	);
};

export default UserHeader;
