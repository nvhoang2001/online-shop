import "./FlexContainer.scss";

const FlexContainer = ({ className, children }) => {
	return <div className={`flex-container ${className || ""}`}>{children}</div>;
};
export default FlexContainer;
