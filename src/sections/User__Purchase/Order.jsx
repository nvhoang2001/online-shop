import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as QuestionSVG } from "../../Assets/question-circle.min.svg";
import "./Order.scss";

const Order = ({ id, items = [], state = "cancel", totalPrice, className = "", time }) => {
	const timeObj = new Date(time);

	const products = useSelector((store) => store.products.items);

	return (
		<li className={`ordered ${className}`}>
			<div className="ordered__header">
				<p className="ordered__id">Order's ID: {id}</p>
				<div>
					<h3 className="ordered__title">{state}</h3>
					<div className="ordered__additional">
						<QuestionSVG />
						<div className="ordered__additional-content">
							<p>Last update:</p>
							<p>
								{timeObj.toLocaleDateString()} - {timeObj.toLocaleTimeString()}
							</p>
						</div>
					</div>
				</div>
			</div>
			<ul className="ordered__list">
				{items.map((item) => {
					const { id, name, amount, price } = item;

					const productInfo = products.find((prod) => prod.id === id);
					const { imgLink: img } = productInfo;
					return (
						<li className="ordered__item" key={id}>
							<div className="ordered__order-info">
								<figure>
									<img src={img} alt="" className="ordered__order-img" />
									<figcaption>
										<h4>
											<Link to={`/product/${id}`}>{name}</Link>
										</h4>
										<p>x {amount}</p>
									</figcaption>
								</figure>
								<div className="ordered__order-price hightlight">${price}</div>
							</div>
						</li>
					);
				})}
			</ul>
			<div className="ordered__total">
				Total: <span className="hightlight">${totalPrice}</span>
			</div>
		</li>
	);
};

export default Order;
