import { Link, useHistory } from "react-router-dom";

import CustomButton from "../UI/CustomButton/CustomButton.component";

import { MAX_PRODUCT_IN_PAGE } from "../../config";

const PAGE_RANGE_DISPLAY = 3,
	MARGIN_PAGES_DISPLAYED = 2,
	BREAK_LABEL = "...";

const PaginationBox = (props) => {
	const history = useHistory();
	const { products, location } = props;

	const searchParams = new URLSearchParams(location.search);
	if (!searchParams.has("page")) {
		searchParams.append("page", 1);
	}
	const selectedPage = +searchParams.get("page");
	const pageCount = Math.ceil(products.length / MAX_PRODUCT_IN_PAGE);
	const isFirstPage = selectedPage === 1,
		isLastPage = selectedPage === pageCount;

	const prevBtnClasses = `pagination-box__btn ${isFirstPage ? "pagination-box__btn--hide" : ""}`;
	const nextBtnClasses = `pagination-box__btn ${isLastPage ? "pagination-box__btn--hide" : ""}`;

	const prevBtnClickHandler = () => {
		if (isFirstPage) {
			return;
		}

		let params = searchParams
			.toString()
			.replace(`page=${selectedPage}`, `page=${selectedPage - 1}`);

		history.push(`${location.pathname}?${params}`);
	};

	const nextBtnClickHandler = () => {
		if (isLastPage) {
			return;
		}
		let params;
		if (!searchParams.has("page")) {
			searchParams.append("page", selectedPage + 1);
			params = searchParams.toString();
		} else
			params = searchParams
				.toString()
				.replace(`page=${selectedPage}`, `page=${selectedPage + 1}`);

		history.push(`${location.pathname}?${params}`);
	};

	let links = [];

	console.log(pageCount);
	console.log(PAGE_RANGE_DISPLAY);
	if (pageCount > PAGE_RANGE_DISPLAY) {
		let leftSide = PAGE_RANGE_DISPLAY / 2 + 1;
		let rightSide = PAGE_RANGE_DISPLAY - leftSide;

		if (selectedPage > pageCount - PAGE_RANGE_DISPLAY / 2) {
			rightSide = pageCount - selectedPage;
			leftSide = PAGE_RANGE_DISPLAY - rightSide;
		} else if (selectedPage < PAGE_RANGE_DISPLAY / 2) {
			leftSide = selectedPage;
			rightSide = PAGE_RANGE_DISPLAY - leftSide;
		}

		let page;
		let breakView;
		for (let index = 0; index < pageCount; index++) {
			page = index + 1;

			if (page === selectedPage) {
				links.push({
					isActive: true,
					link: "",
					content: selectedPage,
				});
				continue;
			}

			if (page <= MARGIN_PAGES_DISPLAYED) {
				links.push({
					isActive: false,
					link: `${location.pathname}?${searchParams
						.toString()
						.replace(`page=${selectedPage}`, `page=${page}`)}`,
					content: page,
				});
				continue;
			}

			if (page > pageCount - MARGIN_PAGES_DISPLAYED) {
				links.push({
					isActive: false,
					link: `${location.pathname}?${searchParams
						.toString()
						.replace(`page=${selectedPage}`, `page=${page}`)}`,
					content: page,
				});
				continue;
			}

			if (index >= selectedPage - leftSide && index <= selectedPage + rightSide) {
				links.push({
					isActive: false,
					link: `${location.pathname}?${searchParams
						.toString()
						.replace(`page=${selectedPage}`, `page=${page}`)}`,
					content: page,
				});
				continue;
			}

			if (BREAK_LABEL && links[links.length - 1] !== breakView) {
				breakView = {
					isBreak: true,
					content: BREAK_LABEL,
				};
				links.push(breakView);
			}
		}
	} else {
		for (let i = 0; i < pageCount; i++) {
			if (i === selectedPage - 1) {
				links[i] = { isActive: true, link: "", content: selectedPage };
				continue;
			}
			links[i] = {
				isActive: false,
				link: `${location.pathname}?${searchParams
					.toString()
					.replace(`page=${selectedPage}`, `page=${i + 1}`)}`,
				content: i + 1,
			};
		}
	}

	console.log(links);
	return (
		<>
			{pageCount !== 1 && (
				<div className="pagination-box">
					<div className="pagination-box__control">
						<CustomButton className={prevBtnClasses} onClick={prevBtnClickHandler}>
							&lt;
						</CustomButton>
						<ul className="pagination-box__page-list">
							{links.map((link, i) => {
								if (link.isBreak) {
									return (
										<li key={i}>
											<span className="pagination-box__page-list-item">
												{link.content}
											</span>
										</li>
									);
								}
								if (link.isActive) {
									return (
										<li key={i}>
											<span className="pagination-box__page-list-item pagination-box__page-list-item--active">
												{link.content}
											</span>
										</li>
									);
								}

								return (
									<li key={i}>
										<Link
											to={link.link}
											className="pagination-box__page-list-item"
										>
											{link.content}
										</Link>
									</li>
								);
							})}
						</ul>
						<CustomButton className={nextBtnClasses} onClick={nextBtnClickHandler}>
							&gt;
						</CustomButton>
					</div>
				</div>
			)}
		</>
	);
};

export default PaginationBox;
