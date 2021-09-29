import "./CustomButton.style.scss";

const CustomButton = ({ type, className, onClick, children, disabled }) => {
	return (
		<button
			type={type ?? "button"}
			className={`btn ${className ?? ""}`}
			onClick={onClick}
			disabled={disabled ?? ""}
		>
			{children}
		</button>
	);
};

export default CustomButton;
