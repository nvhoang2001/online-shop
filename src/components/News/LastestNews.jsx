import News from "./News";

const LastestNews = ({ lastestNews, className }) => {
	return (
		<div className={`${className}`}>
			<h2 className={`${className}__title`}>Lastest News</h2>
			<ul className={`${className}__news-list`}>
				{lastestNews.map((news, i) => {
					if (i === 0) {
						return (
							<li
								className={`${className}__news-items ${className}__news-items--first`}
								key={news.id}
							>
								<News
									className={`${className}__news ${className}__first-news`}
									{...news}
									showContent={true}
								/>
							</li>
						);
					}

					if (i === 1) {
						return (
							<li
								className={`${className}__news-items ${className}__news-items--second`}
								key={news.id}
							>
								<News className={`${className}__news`} {...news} />
							</li>
						);
					}

					return (
						<li className={`${className}__news-items`} key={news.id}>
							<News className={`${className}__news`} {...news} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default LastestNews;
