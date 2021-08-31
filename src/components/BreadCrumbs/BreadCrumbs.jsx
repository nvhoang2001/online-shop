import { Link } from "react-router-dom";

import "./BreadCrumbs.scss";

const BreadCrumbs = (props) => {
	const { location } = props;
	const crumbs = location.split("/");
	crumbs[0] = "homepage";
	const [firstCrumb, ...remainCrumbs] = crumbs;
	remainCrumbs.at(-1) === "" && remainCrumbs.pop();
	const lastCrumb = remainCrumbs.pop();
	return (
		<div className="bread-crumbs">
			<ul>
				<li className="bread-crumbs__item">
					<Link to="/">{firstCrumb}</Link>
				</li>
				{remainCrumbs.map((crumb, i) => {
					const crumbLink = `/${remainCrumbs.slice(0, i + 1).join("/")}`;
					return (
						<li className="bread-crumbs__item" key={crumb}>
							<Link to={crumbLink}>{crumb}</Link>
						</li>
					);
				})}
				<li className="bread-crumbs__item bread-crumbs__item--active">{lastCrumb}</li>
			</ul>
		</div>
	);
};

export default BreadCrumbs;
