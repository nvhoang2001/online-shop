import LastestNews from "../../components/News/LastestNews";
import NewsList from "../../components/News/NewsList";
import "./MainNews.scss";

const lastestNews = [
	{
		id: "news1",
		title: "UK product safety laws won’t prevent another Grenfell tragedy, report warns",
		imgUrl: "https://i.guim.co.uk/img/media/49de066474f3164ecce6580eeb156a540ca40ed8/0_78_2400_1441/master/2400.jpg?width=620&quality=85&auto=format&fit=max&s=62f5ff967ef034fc9ef036585a1ca66f",
		summaryContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolore aliquid laudantium animi culpa amet nesciunt velit ea ipsum! Vero optio beatae iste quas neque qui, dicta molestiae voluptas sed?",
		author: "hoangzzzsss",
		date: "30/09/2021",
		newsUrl: "#",
	},
	{
		id: "news2",
		title: "Do I need a brolly? Google uses AI to try to improve two-hour rain forecasts",
		imgUrl: "https://i.guim.co.uk/img/media/72ab92e9d377c8ea4e58488243ed9709d5896468/37_110_5301_3180/master/5301.jpg?width=620&quality=85&auto=format&fit=max&s=bc4440626374428455fc6df7c8d1e98c",
		summaryContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolore aliquid laudantium animi culpa amet nesciunt velit ea ipsum! Vero optio beatae iste quas neque qui, dicta molestiae voluptas sed?",
		author: "hoangzzzsss",
		date: "29/09/2021",
		newsUrl: "#",
	},
	{
		id: "news3",
		title: "Is Facebook leading us on a journey to the metaverse?",
		imgUrl: "https://i.guim.co.uk/img/media/6e00929abb684f4627adea450cba4e532cae7d5d/0_12_5948_3570/master/5948.jpg?width=1020&quality=85&auto=format&fit=max&s=dd6d3c1480efa481edee7033087a508d",
		summaryContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolore aliquid laudantium animi culpa amet nesciunt velit ea ipsum! Vero optio beatae iste quas neque qui, dicta molestiae voluptas sed?",
		author: "hoangzzzsss",
		date: "28/07/2021",
		newsUrl: "#",
	},
	{
		id: "news4",
		title: "China declares transactions involving cryptocurrencies illegal",
		imgUrl: "https://i.guim.co.uk/img/media/b3196e738e624ce2b5891abe673cfcb85e084af8/0_355_5329_3198/master/5329.jpg?width=620&quality=85&auto=format&fit=max&s=d53620cd7f4cb356357fdd4cf797fb3f",
		summaryContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolore aliquid laudantium animi culpa amet nesciunt velit ea ipsum! Vero optio beatae iste quas neque qui, dicta molestiae voluptas sed?",
		author: "hoangzzzsss",
		date: "24/09/2021",
		newsUrl: "#",
	},
	{
		id: "news5",
		title: "YouTube deletes RT’s German channels over Covid misinformation",
		imgUrl: "https://i.guim.co.uk/img/media/539690944c6daadd6c57886874ffcef02ab9d98b/0_0_3500_2101/master/3500.jpg?width=620&quality=85&auto=format&fit=max&s=928febecf6bda8132e0ed7cffc30f0e8",
		summaryContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolore aliquid laudantium animi culpa amet nesciunt velit ea ipsum! Vero optio beatae iste quas neque qui, dicta molestiae voluptas sed?",
		author: "hoangzzzsss",
		date: "23/09/2021",
		newsUrl: "#",
	},
	{
		id: "news6",
		title: "Undisclosed private companies analysing facial data from NHS app",
		imgUrl: "https://i.guim.co.uk/img/media/1ebaafb5b12d969b66f64b7060c4d4e770fea579/0_182_5497_3300/master/5497.jpg?width=620&quality=85&auto=format&fit=max&s=c9bf268de968dee3ff39aeb12f643e64",
		summaryContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolore aliquid laudantium animi culpa amet nesciunt velit ea ipsum! Vero optio beatae iste quas neque qui, dicta molestiae voluptas sed?",
		author: "hoangzzzsss",
		date: "23/09/2021",
		newsUrl: "#",
	},
];

const newsList = [...lastestNews, ...lastestNews, ...lastestNews, ...lastestNews];
const MainNews = () => {
	return (
		<main className="main-news">
			<LastestNews className="lastest-news" lastestNews={lastestNews} />
			<NewsList className="news-list" newsList={newsList} />
		</main>
	);
};
export default MainNews;
