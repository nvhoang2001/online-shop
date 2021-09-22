import "./CustomButton.style.scss";

const CustomButton = ({ type, className, onClick, children }) => {
	return (
		<button type={type ?? "button"} className={`btn ${className ?? ""}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default CustomButton;
