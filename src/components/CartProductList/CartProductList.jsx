const CartProductList = (props) => {
	const { items, baseClass } = props;
	return (
		<ul className={`${baseClass}__list`}>
			{items.map((item) => {
				const { imgLink, name, amount, price } = item;
				let sumName = name.split(" ");
				sumName.length = 5;
				sumName = sumName.join(" ");
				return (
					<li className={`${baseClass}__item`} key={item.id}>
						<img src={imgLink} alt={name} className={`${baseClass}__img`} />
						<div className={`${baseClass}__info`}>
							<p>{sumName}</p>
							<p>
								${price} x {amount}
							</p>
						</div>
						<p className={`${baseClass}__price`}>${amount * price}</p>
					</li>
				);
			})}
		</ul>
	);
};

export default CartProductList;
