import { Link } from "react-router-dom";

import FooterNewsletter from "./FooterNewsletter";

import { ReactComponent as FacebookSVG } from "../../Assets/facebook.svg";
import { ReactComponent as InstagramSVG } from "../../Assets/instagram.svg";
import { ReactComponent as PinterestSVG } from "../../Assets/pinterest.svg";
import { ReactComponent as TwitterSVG } from "../../Assets/twitter.svg";
import { ReactComponent as YoutubeSVG } from "../../Assets/youtube.svg";

const FooterConnect = () => {
	return (
		<div className="footer__connect">
			<FooterNewsletter />
			<div className="footer__connect-social-media">
				<h3 className="footer__title footer__connect-title">CONNECT WITH US</h3>
				<div className="footer__connect-social-media-container">
					<Link to="#" className="footer__connect-social-media-item">
						<TwitterSVG />
					</Link>
					<Link to="#" className="footer__connect-social-media-item">
						<FacebookSVG />
					</Link>
					<Link to="#" className="footer__connect-social-media-item">
						<PinterestSVG />
					</Link>
					<Link to="#" className="footer__connect-social-media-item">
						<YoutubeSVG />
					</Link>
					<Link to="#" className="footer__connect-social-media-item">
						<InstagramSVG />
					</Link>
				</div>
			</div>
			<div className="footer__connect-app">
				<h3 className="footer__title footer__connect-title">SHOP ON-THE-PHONE</h3>
				<p className="footer__connect-text">
					<Link className="footer__connect-highlight" to="#">
						Download the app
					</Link>{" "}
					and get the world of masterpieces at your fingertip.
				</p>
			</div>
		</div>
	);
};

export default FooterConnect;
