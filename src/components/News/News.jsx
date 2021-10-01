import { Link } from "react-router-dom";
import { ReactComponent as CalendarSVG } from "../../Assets/calendar-alt.min.svg";
import { ReactComponent as UserSVG } from "../../Assets/user.svg";

import "./News.scss";

const News = ({
	title,
	className,
	imgUrl,
	summaryContent,
	author,
	date,
	newsUrl,
	showContent = false,
}) => {
	const classes = `news ${className || ""}`;

	return (
		<figure className={classes}>
			<Link to={newsUrl} className="news__container">
				<img className="news__img" src={imgUrl} />
				<figcaption className="news__caption">
					<h3 className="news__title">{title}</h3>
					{showContent && (
						<div>
							<p className="news__content">{summaryContent}</p>
							<p className="news__info">
								<span className="news__info-author">
									<UserSVG /> {author}
								</span>
								<span className="news__info-date">
									<CalendarSVG /> {date}
								</span>
							</p>
						</div>
					)}
				</figcaption>
			</Link>
		</figure>
	);
};

export default News;
