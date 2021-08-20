import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FooterFooter = () => {
	const brands = useSelector((store) => store.products.brands);
	const topBrands = brands.slice(4, 8);

	return (
		<div className="footer__footer">
			<h3 className="footer__title">POPULAR BRANDS</h3>
			<ul className="footer__footer-brand-list">
				{topBrands.map((brand) => (
					<li className="footer__footer-brand-item" key={brand.brand}>
						<Link to="#">{brand.brand}</Link>
					</li>
				))}
				<li className="footer__footer-brand-item" key="all">
					<Link to="#">View All</Link>
				</li>
			</ul>
		</div>
	);
};

export default FooterFooter;
