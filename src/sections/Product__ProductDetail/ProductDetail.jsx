import { Link } from "react-router-dom";
import "./ProductDetail.scss";

const ProductDetail = ({ product }) => {
	console.log(product);

	const { description } = product;
	const descriptionData = Object.entries(description);
	const firstTableData = descriptionData.slice(0, Math.floor(descriptionData.length * 0.7));
	const secondTableData = descriptionData.slice(Math.floor(descriptionData.length * 0.7));

	return (
		<section className="product-detail">
			<h2 className="product-detail__title">Technical Details</h2>
			<div className="product-detail__container">
				<div className="product-detail__content product-detail__content--left">
					<table className="product-detail__table">
						<tbody>
							{firstTableData.map((data) => {
								return (
									<tr key={data[0]}>
										<th className="product-detail__table-row product-detail__table-row--head">
											{data[0]}
										</th>
										<td className="product-detail__table-row product-detail__table-row--column">
											{data[1]}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="product-detail__content product-detail__content--right">
					<table className="product-detail__table">
						<tbody>
							{secondTableData.map((data) => {
								return (
									<tr key={data[0]}>
										<th className="product-detail__table-row product-detail__table-row--head">
											{data[0]}
										</th>
										<td className="product-detail__table-row product-detail__table-row--column">
											{data[1]}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<h2 className="product-detail__title">Warranty & Support</h2>
					<p>
						Return Policy:You may return any new computer purchased from us that is
						"dead on arrival," arrives in damaged condition, or is still in unopened
						boxes, for a full refund within 30 days of purchase. We reserves the right
						to test "dead on arrival" returns and impose a customer fee equal to 15
						percent of the product sales price if the customer misrepresents the
						condition of the product. Any returned computer that is damaged through
						customer misuse, is missing parts, or is in unsellable condition due to
						customer tampering will result in the customer being charged a higher
						restocking fee based on the condition of the product. We will not accept
						returns of any desktop or notebook computer more than 30 days after you
						receive the shipment. New, used, and refurbished products purchased from
						Marketplace vendors are subject to the returns policy of the individual
						vendor.
					</p>
					<p>
						Manufacturer’s warranty can be requested from customer service. Click{" "}
						<Link className="product-detail__link" to="#">
							here
						</Link>{" "}
						to make a request to customer service.
					</p>
				</div>
			</div>
		</section>
	);
};

export default ProductDetail;
