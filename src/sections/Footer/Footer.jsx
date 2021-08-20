import { Link } from "react-router-dom";

import FooterTraits from "./FooterTraits";
import FooterConnect from "./FooterConnect";
import FooterFooter from "./FooterFooter";

import "./Footer.scss";

const Footer = () => {
	return (
		<footer className="footer">
			<FooterTraits />
			<FooterConnect />
			<FooterFooter />
			<div className="footer__author">
				Made with <span className="heart">&hearts;</span> by{" "}
				<Link to="#">Ngo Viet Hoang</Link>
			</div>
		</footer>
	);
};

export default Footer;
