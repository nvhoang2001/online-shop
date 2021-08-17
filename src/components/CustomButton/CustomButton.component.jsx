import "./CustomButton.style.scss";

const CustomButton = (props) => {
	return (
		<button
			type={props.type ?? "button"}
			className={`btn ${props.className ? props.className : ""}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default CustomButton;
