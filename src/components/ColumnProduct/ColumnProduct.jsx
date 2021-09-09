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

	return { ...initColState };
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
		// Clear interval and timeout (if any)
		clearTimeout(timers.timeout);

		// Then set a timeout for 6s.
		const timeout = setTimeout(() => {
			clearInterval(timers.interval);
			// After 6s passed, set an interval to active for every 2s
			const interval = setInterval(() => {
				setColState({ type: MOVE_ALL });
			}, MOVE_TIME);
			timers.interval = interval;
		}, TIME_LIMIT + 1000);

		timers.timeout = timeout;
		// Save all of that timer to timers object
	};

	useEffect(() => {
		// Save current timestamp
		timers.startTime = Date.now();

		// Set an interval active for every 2s an save its timer in timers object
		const interTimer = setInterval(() => {
			setColState({ type: MOVE_ALL });
		}, MOVE_TIME);
		timers.interval = interTimer;

		return () => {
			// If timer change, for when CaroselProduct being unmounted, clear timer.
			clearInterval(timers.interval);
		};
	}, [timers, setColState]);

	// If any of above of bottom buttons are clicked, change product and then pause for 8s
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

	// Pause slider when cursor enter
	const mouseEnterHandler = () => {
		clearInterval(timers.interval);
		clearTimeout(timers.timeout);
	};

	const mouseLeaveHandler = () => {
		// Get the current timestamp and start timestamp
		const currentTime = Date.now();
		const { startTime } = timers;
		const activeTime = MOVE_TIME - ((currentTime - startTime) % 2000);

		// Clear timer in case user click move buttons
		clearTimeout(timers.timeout);

		// Set timeout to start slide in the next of the next interval.
		const timeout = setTimeout(() => {
			clearInterval(timers.interval);
			const interval = setInterval(() => {
				setColState({ type: MOVE_ALL });
			}, MOVE_TIME);
			timers.interval = interval;
		}, activeTime);
		timers.timeout = timeout;
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
