import { useRef, useState } from "react";
import "./ProductIllustration.scss";

const DIV_SIZE = 200;

const ProductIllustration = ({ imgLink, name }) => {
	const illusRef = useRef();
	const [hoverAreaStyle, setHoverAreaStyle] = useState(null);
	const [zoomAreaStyle, setZoomAreaStyle] = useState({
		backgroundImage: `url(${imgLink})`,
		backgroundSize: "3500px",
		backgroundPosition: "center",
	});

	const illusHoverHandler = (e) => {
		const imgSize = illusRef.current.getBoundingClientRect();
		const { left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight } = imgSize;
		const { clientX: mouseX, clientY: mouseY } = e;
		const xRelative = mouseX - imgLeft,
			yRelative = mouseY - imgTop;
		let top = yRelative - DIV_SIZE / 2,
			left = xRelative - DIV_SIZE / 2;
		top = top < 0 ? 0 : top + DIV_SIZE > imgHeight ? imgHeight - DIV_SIZE : top;
		left = left < 0 ? 0 : left + DIV_SIZE > imgWidth ? imgWidth - DIV_SIZE : left;
		setHoverAreaStyle({
			display: "inline-block",
			top: `${top}px`,
			left: `${left}px`,
		});

		setZoomAreaStyle({
			display: "inline-block",
			backgroundImage: `url(${imgLink})`,
			backgroundSize: `${imgWidth * 2}px ${imgHeight * 2}px`,
			backgroundPosition: `${(xRelative / imgWidth) * 100}% ${
				(yRelative / imgHeight) * 100
			}%`,
		});
	};

	const illusMouseOutHandler = () => {
		setHoverAreaStyle(null);
		setZoomAreaStyle(null);
	};

	return (
		<>
			<div className="product-illustration__container">
				<figure
					className="product-illustration"
					onMouseMove={illusHoverHandler}
					onMouseLeave={illusMouseOutHandler}
					ref={illusRef}
				>
					<img className="product-illustration__img" src={imgLink} alt={name} />
					<div className="product-illustration__hover-area" style={hoverAreaStyle} />
				</figure>
				<div className="product-illustration__zoom-area" style={zoomAreaStyle} />
			</div>
		</>
	);
};

export default ProductIllustration;
