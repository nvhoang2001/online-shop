import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductRating from "../../sections/Product__Rating/ProductRating";
import ProductBrieffing from "../../sections/ProductBrieffing/ProductBrieffing";
import ProductDetail from "../../sections/Product__ProductDetail/ProductDetail";
import RecommendationProducts from "../../sections/Product__RecommendationProducts/RecommendationProducts";
import ManufacturerDescription from "../../sections/Product_ManufacturerDescription/ManufacturerDescription";
import { DB_URL } from "../../config";

const ProductDetailPage = () => {
	const params = useParams();
	const { productId } = params;
	const auth = useSelector((store) => store.user.auth);
	const product = useSelector((store) =>
		store.products.items.find((prod) => prod.id === productId),
	);
	const [feedbackable, setFeedbackable] = useState(false);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});

		if (!auth) {
			return;
		}

		fetch(`${DB_URL}/checkout/${auth.localId}.json`)
			.then((res) => {
				if (!res.ok) {
					throw new Error();
				}
				return res.json();
			})
			.then((orders) => {
				let fe = false;
				outer: for (const orderID in orders) {
					const order = orders[orderID];
					if (order.items.find((item) => item.id === productId)) {
						fe = true;
						break outer;
					}
				}
				setFeedbackable(fe);
			})
			.catch((_) => {
				setFeedbackable(false);
			});
	}, [productId]);

	return (
		<div className="product-page-wrapper" style={{ backgroundColor: "#f9fbfd" }}>
			<ProductBrieffing product={product} />
			<ManufacturerDescription />
			<ProductDetail product={product} />
			<ProductRating product={product} feedbackable={feedbackable} />
			<RecommendationProducts product={product} />
		</div>
	);
};

export default ProductDetailPage;
