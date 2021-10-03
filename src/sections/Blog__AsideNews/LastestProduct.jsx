import { Link } from "react-router-dom";

const LastestProduct = ({ products }) => {
	return (
		<div className="lastest-product">
			<h3 className="lastest-product__title">LASTEST PRODUCTS</h3>
			<ul className="lastest-product__list">
				{products.map((product) => {
					const { id, name, price, imgLink } = product;
					return (
						<li key={id} className="lastest-product__product">
							<img src={imgLink} alt="" className="lastest-product__product-img" />
							<div>
								<Link
									to={`/product/${id}`}
									className="lastest-product__product-name"
								>
									{name}
								</Link>
								<p className="lastest-product__product-price"> ${price}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default LastestProduct;
