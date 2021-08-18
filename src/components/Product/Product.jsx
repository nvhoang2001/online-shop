import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { checkoutActions } from "../../store/checkout-slice";

import { ReactComponent as CartSVG } from "../../Assets/shopping-cart.svg";
import "./Product.scss";

const Product = (props) => {
	const dispatch = useDispatch();

	let classes = `product ${props.className || ""}`;
	let capClasses = `product__cap ${props.className || ""}__cap`;
	const { product } = props;
	const { name, sold, rating, price, imgLink } = product;
	let sumName = name.split(" ");
	sumName.length = 5;
	sumName = sumName.join(" ");

	const addItemToCart = () => {
		dispatch(checkoutActions.addItemToCart(product));
	};

	return (
		<figure className={classes} style={props.style}>
			<img src={imgLink} alt={name} className="product__img" />
			<figcaption className={capClasses}>
				<h4 className="product__name">
					<Link to={`/products/${product.type}/${product.name.replaceAll(" ", "+")}`}>
						{sumName}
					</Link>
				</h4>
				<p>Sold: {sold}</p>
				<p>Rating: {rating} / 5.0</p>
				<div className="product__foot">
					<span className="product__price">${price}</span>
					<span>
						<CartSVG title="Add to cart" onClick={addItemToCart} />
					</span>
				</div>
			</figcaption>
		</figure>
	);
};

export default Product;
