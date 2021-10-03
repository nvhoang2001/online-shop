import { Link } from "react-router-dom";

const HotTopic = ({ hotTopics }) => {
	return (
		<div className="hot-topic">
			<h3 className="hot-topic__title">HOT TOPIC</h3>
			<ul className="hot-topic__list">
				{hotTopics.map((topic) => {
					return (
						<li key={topic.id} className="hot-topic__topic">
							<Link to="#">{topic.content}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default HotTopic;
