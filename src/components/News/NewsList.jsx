import News from "./News";
import CustomButton from "../UI/CustomButton/CustomButton.component";
import { useState } from "react";

const NEWS_LIMIT = 5;

const NewsList = ({ newsList, className }) => {
	const [page, setPage] = useState(1);

	const loadMorePageHandler = () => {
		setPage((page) => page + 1);
	};

	return (
		<div className={`${className}`}>
			<ul className={`${className}__list`}>
				{newsList.map((news, i) => {
					if (i >= NEWS_LIMIT * page) {
						return null;
					}

					return (
						<li className={`${className}__news-items`} key={news.id + i}>
							<News className={`${className}__news`} {...news} showContent={true} />
						</li>
					);
				})}

				<CustomButton className={`${className}__btn--load`} onClick={loadMorePageHandler}>
					Load more &#x025BE;
				</CustomButton>
			</ul>
		</div>
	);
};

export default NewsList;
