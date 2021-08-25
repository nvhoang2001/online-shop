import ReactDOM from "react-dom";

import "./Modal.scss";

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<div className="backdrop" onClick={props.onHide}></div>,
				document.getElementById("backdrop-modal"),
			)}
			{ReactDOM.createPortal(
				<div className="modal">{props.children}</div>,
				document.getElementById("overlay-modal"),
			)}
		</>
	);
};

export default Modal;
