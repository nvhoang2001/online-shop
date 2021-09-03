const RatingFilter = () => {
	return (
		<div className="filter-product--filter filter-section filter-rating">
			<div className="filter-section-header">
				<h3>Rating:</h3>
			</div>
			<div className="filter-section-body filter-rating__body">
				<button className="filter-rating__btn">
					{" "}
					<div className="start-angle" /> 1.0 {"&"} up
				</button>
				<button className="filter-rating__btn">
					<div className="start-angle" />
					<div className="start-angle" />
					2.0 {"&"} up
				</button>
				<button className="filter-rating__btn">
					<div className="start-angle" />
					<div className="start-angle" />
					<div className="start-angle" />
					3.0 {"&"} up
				</button>
				<button className="filter-rating__btn">
					<div className="start-angle" />
					<div className="start-angle" />
					<div className="start-angle" />
					<div className="start-angle" />
					4.0 {"&"} up
				</button>
				<button className="filter-rating__btn">
					<div className="start-angle" />
					<div className="start-angle" />
					<div className="start-angle" />
					<div className="start-angle" />
					<div className="start-angle" />
					5.0
				</button>
			</div>
		</div>
	);
};

export default RatingFilter;
