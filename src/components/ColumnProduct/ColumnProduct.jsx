import { useReducer, useEffect } from "react";

import BottomProduct from "./BottomProduct";
import PrimaryProduct from "./PrimaryProduct";

import { MOVE_TIME, TIME_LIMIT } from "../../config";
import "./ColumnProduct.scss";

const NEXT_PRIMARY = "NEXT_PRIMARY",
	PREV_PRIMARY = "NEXT_PRIMARY",
	NEXT_BOTTOM = "NEXT_BOTTOM",
	PREV_BOTTOM = "PREV_BOTTOM",
	MOVE_ALL = "MOVE_ALL";

const MAX_PROD = 1,
	MIN_PROD = 0;

const initColState = {
	primary: 0,
	bottom: 0,
};

const colReducer = (state, action) => {
	switch (action.type) {
		case NEXT_PRIMARY: {
			let { primary, bottom } = state;
			primary = primary === MAX_PROD ? MIN_PROD : MAX_PROD;
			return { primary, bottom };
		}

		case PREV_PRIMARY: {
			let { primary, bottom } = state;
			primary = primary === MIN_PROD ? MAX_PROD : MIN_PROD;
			return { primary, bottom };
		}

		case NEXT_BOTTOM: {
			let { primary, bottom } = state;
			bottom = bottom === MAX_PROD ? MIN_PROD : MAX_PROD;
			return { primary, bottom };
		}

		case PREV_BOTTOM: {
			let { primary, bottom } = state;
			bottom = bottom === MIN_PROD ? MAX_PROD : MIN_PROD;
			return { primary, bottom };
		}

		case MOVE_ALL: {
			let { primary, bottom } = state;
			primary = primary === MAX_PROD ? MIN_PROD : MAX_PROD;
			bottom = bottom === MAX_PROD ? MIN_PROD : MAX_PROD;
			return { primary, bottom };
		}

		default:
			break;
	}

	return initColState;
};

const ColumnProduct = (props) => {
	const timers = props.timer[props.index];
	const [colState, setColState] = useReducer(colReducer, initColState);

	const { products, className } = props;

	const classes = className || "";
	const [firstProduct, secondProduct] = products;
	const productsRow1 = products.slice(2, 4),
		productsRow2 = products.slice(4, 6);

	const pauseInterval = () => {
		clearInterval(timers.interval);
		clearTimeout(timers.timeout);
		const timeout = setTimeout(() => {
			const interval = setInterval(() => {
				setColState({ type: MOVE_ALL });
			}, MOVE_TIME);
			timers.interval = interval;
		}, TIME_LIMIT);
		timers.timeout = timeout;
	};

	useEffect(() => {
		const interTimer = setInterval(() => {
			setColState({ type: MOVE_ALL });
		}, MOVE_TIME);
		timers.interval = interTimer;
		return () => {
			clearInterval(timers.interval);
		};
	}, [timers]);

	const nextPrimaryBtnClickHandler = () => {
		setColState({ type: NEXT_PRIMARY });
		pauseInterval();
	};
	const nextBottomBtnClickHandler = () => {
		setColState({ type: NEXT_BOTTOM });
		pauseInterval();
	};
	const prevBottomBtnClickHandler = () => {
		setColState({ type: PREV_BOTTOM });
		pauseInterval();
	};
	const prevPrimaryBtnClickHandler = () => {
		setColState({ type: PREV_PRIMARY });
		pauseInterval();
	};
	const mouseEnterHandler = () => {
		clearInterval(timers.interval);
	};
	const mouseLeaveHandler = () => {
		const interval = setInterval(() => {
			setColState({ type: MOVE_ALL });
		}, MOVE_TIME);
		timers.interval = interval;
	};

	return (
		<div
			className={`column-product ${classes}`}
			onMouseEnter={mouseEnterHandler}
			onMouseLeave={mouseLeaveHandler}
		>
			<div className="column-product__primary">
				<PrimaryProduct
					product={firstProduct}
					className={`${
						colState.primary === 0
							? "column-product__primary--active"
							: "column-product__primary--inactive"
					}`}
				/>
				<PrimaryProduct
					product={secondProduct}
					className={`${
						colState.primary === 1
							? "column-product__primary--active"
							: "column-product__primary--inactive"
					}`}
				/>

				<button
					className="column-product__btn column-product__btn--left column-product__btn--primary"
					onClick={prevPrimaryBtnClickHandler}
				>
					&lt;
				</button>
				<button
					className="column-product__btn column-product__btn--right column-product__btn--primary"
					onClick={nextPrimaryBtnClickHandler}
				>
					&gt;
				</button>
			</div>
			<div className="column-product__bottom-container">
				<div className="column-product__bottom">
					<BottomProduct
						product={productsRow1[0]}
						className={`${
							colState.bottom === 0
								? "column-product__bottom--active"
								: "column-product__bottom--inactive"
						}`}
					/>
					<BottomProduct
						product={productsRow1[1]}
						className={`${
							colState.bottom === 1
								? "column-product__bottom--active"
								: "column-product__bottom--inactive"
						}`}
					/>
				</div>
				<div className="column-product__bottom">
					<BottomProduct
						product={productsRow2[0]}
						className={`${
							colState.bottom === 0
								? "column-product__bottom--active"
								: "column-product__bottom--inactive"
						}`}
					/>
					<BottomProduct
						product={productsRow2[1]}
						className={`${
							colState.bottom === 1
								? "column-product__bottom--active"
								: "column-product__bottom--inactive"
						}`}
					/>
				</div>
				<button
					className="column-product__btn column-product__btn--left column-product__btn--bottom"
					onClick={prevBottomBtnClickHandler}
				>
					&lt;
				</button>
				<button
					className="column-product__btn column-product__btn--right column-product__btn--bottom"
					onClick={nextBottomBtnClickHandler}
				>
					&gt;
				</button>
			</div>
		</div>
	);
};

export default ColumnProduct;
