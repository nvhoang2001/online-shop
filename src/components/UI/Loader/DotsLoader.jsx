import "./DotsLoader.scss";

const DotsLoader = ({ className }) => {
	return <div className={`dots-loader ${className ?? ""}`}></div>;
};
export default DotsLoader;
