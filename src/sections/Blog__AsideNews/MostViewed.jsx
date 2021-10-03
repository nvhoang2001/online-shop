import { Link } from "react-router-dom";

const MostViewed = ({ news }) => {
	return (
		<div className="most-viewed">
			<h3 className="most-viewed__title">MOST VIEWED</h3>
			<ul className="most-viewed__list">
				{news.map((n, i) => {
					return (
						<li key={n.id} className="most-viewed__news">
							<span className="most-viewed__news-no">{i + 1}</span>
							<Link to="#">{n.content}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default MostViewed;
