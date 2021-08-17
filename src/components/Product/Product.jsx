import { useDispatch } from "react-redux";
import { ReactComponent as CartSVG } from "../../Assets/shopping-cart.svg";
import { checkoutActions } from "../../store/checkout-slice";
import "./Product.scss";

const Product = (props) => {
	const dispatch = useDispatch();

	let classes = `product ${props.className || ""}`;
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
			<figcaption className="product__cap">
				<h4 className="product__name">{sumName}</h4>
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
