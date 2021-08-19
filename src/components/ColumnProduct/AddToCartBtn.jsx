import { useDispatch } from "react-redux";
import { checkoutActions } from "../../store/checkout-slice";

const AddToCartBtn = (props) => {
	const dispatch = useDispatch();

	const addToCartHandler = () => {
		dispatch(checkoutActions.addItemToCart(props.product));
	};

	return (
		<button className={props.className ? props.className : ""} onClick={addToCartHandler}>
			Add To Cart
		</button>
	);
};

export default AddToCartBtn;
