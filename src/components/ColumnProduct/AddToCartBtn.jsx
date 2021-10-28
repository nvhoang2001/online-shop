import { useDispatch } from "react-redux";
import { checkoutActions } from "../../store/checkout-slice";

const AddToCartBtn = ({ product, className, quantity = 1, onSuccess = null }) => {
	const dispatch = useDispatch();

	const addToCartHandler = () => {
		dispatch(checkoutActions.addItemToCart({ product, quantity }));
		onSuccess?.();
	};

	return (
		<button className={className ?? ""} onClick={addToCartHandler}>
			Add To Cart
		</button>
	);
};

export default AddToCartBtn;
