import { Link } from "react-router-dom";

const SubCate = (props) => {
	const { items } = props;
	return (
		<ul className="nav__sub-cate">
			{items.map((item) => {
				const { products } = item;
				const linkItem = `category/${item.path}`;
				return (
					<li key={item.id} className="nav__cate-item">
						<Link to={linkItem} className="title">
							{item.content}
						</Link>
						<ul>
							{products.map((prod) => {
								return (
									<li key={prod.id} className="nav__cate-link">
										<Link to={`${linkItem}/${prod.path}`}>{prod.content}</Link>
									</li>
								);
							})}
						</ul>
					</li>
				);
			})}
		</ul>
	);
};

export default SubCate;
