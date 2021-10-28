import { ReactComponent as UpArrowSVG } from "../../Assets/chevron-up.min.svg";
import { ReactComponent as DownArrowSVG } from "../../Assets/chevron-down.min.svg";

const CartProductList = ({
	items,
	baseClass,
	readOnly = true,
	increaseProductHandler,
	decreaseProductHandler,
}) => {
	return (
		<ul className={`${baseClass}__list`}>
			{items.map((item) => {
				const { imgLink, name, amount, price, totalPrice } = item;
				let sumName = name.split(" ");
				sumName.length = 5;
				sumName = sumName.join(" ");
				return (
					<li className={`${baseClass}__item`} key={item.id}>
						<img src={imgLink} alt={name} className={`${baseClass}__img`} />
						{readOnly && (
							<>
								<div className={`${baseClass}__info`}>
									<p title={name}>{sumName}</p>
									<p>
										${price} x {amount}
									</p>
								</div>
								<p className={`${baseClass}__price`}>${totalPrice}</p>
							</>
						)}
						{!readOnly && (
							<>
								<div className={`${baseClass}__info`}>
									<p title={name}>{sumName}</p>
									<div>
										<p>${price}</p>
										<p className={`${baseClass}__info-remains`}>123 remains</p>
									</div>
								</div>
								<div className={`${baseClass}__quantity`}>
									<button
										className={`${baseClass}__quantity-btn`}
										onClick={increaseProductHandler.bind(null, item)}
										title="Increase"
									>
										<UpArrowSVG />
									</button>
									<span className={`${baseClass}__quantity-amount`}>
										{amount}
									</span>
									<button
										className={`${baseClass}__quantity-btn`}
										onClick={decreaseProductHandler.bind(null, item)}
										title="Decrease"
									>
										<DownArrowSVG />
									</button>
								</div>
							</>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default CartProductList;
