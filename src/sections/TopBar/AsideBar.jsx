import { Link } from "react-router-dom";

const AsideBar = (props) => {
	return (
		<div className={`${props.className ?? ""}`}>
			<Link to={props.to}>
				<img src={props.link} alt="" />
			</Link>
		</div>
	);
};

export default AsideBar;
