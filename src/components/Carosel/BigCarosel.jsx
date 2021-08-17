import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./BigCarosel.scss";

const TIME_LIMIT = 5000,
	MOVE_TIME = 2000;

let moveTimer, pauseTimer;

const BigCarosel = (props) => {
	const { topProds } = props;

	const maxImg = topProds.length - 1,
		minImg = 0,
		initImg = 0;
	const [activeImg, setActiveImg] = useState(initImg);

	const moveToImg = (index) => {
		if (index === activeImg) {
			return;
		}
		setActiveImg(index);
	};
	const prevImg = () => {
		if (activeImg === minImg) {
			return maxImg;
		}

		return activeImg - 1;
	};
	const nextImg = () => {
		if (activeImg === maxImg) {
			return minImg;
		}

		return activeImg + 1;
	};

	const pauseInterval = () => {
		clearInterval(moveTimer);
		clearTimeout(pauseTimer);
		pauseTimer = setTimeout(() => {
			console.log(activeImg);
			moveTimer = setInterval(() => {
				setActiveImg((actImg) => {
					if (actImg === maxImg) {
						return minImg;
					}

					return actImg + 1;
				});
			}, MOVE_TIME);
		}, TIME_LIMIT);
	};

	const prevBtnClickHandler = () => {
		pauseInterval();

		moveToImg(prevImg());
	};
	const nextBtnClickHandler = () => {
		pauseInterval();
		moveToImg(nextImg());
	};
	const dotClickHandler = (e) => {
		const curEl = e.target;
		if (!curEl.classList.contains("carosel__dot")) {
			return;
		}
		pauseInterval();
		const imgIndex = Number(curEl.dataset.img);
		moveToImg(imgIndex);
	};

	useEffect(() => {
		moveTimer = setInterval(() => {
			setActiveImg((actImg) => {
				if (actImg === maxImg) {
					return minImg;
				}

				return actImg + 1;
			});
		}, MOVE_TIME);

		return () => {
			clearInterval(moveTimer);
		};
	}, []);

	return (
		<div className={`carosel ${props.className ?? ""}`}>
			<div className="carosel__slider">
				{topProds.map((prod, i) => {
					let imgClass = "carosel__item ";

					if (i === activeImg) {
						imgClass += "carosel__item--active";
					}

					let translateX = !imgClass.includes("-") ? `${(i - activeImg) * 100}%` : "0";

					return (
						<div
							className={imgClass}
							key={prod.id}
							style={{
								left: translateX,
							}}
						>
							<Link
								className="carosel__img"
								to={prod.link || "#"}
								style={{
									backgroundImage: `url(${prod.imgLink})`,
								}}
							/>
						</div>
					);
				})}
			</div>
			<div className="carosel__dots" onClick={dotClickHandler}>
				{topProds.map((_, i) => {
					return (
						<button
							key={i}
							className={`carosel__dot ${
								i === activeImg ? "carosel__dot--active" : ""
							}`}
							data-img={i}
						/>
					);
				})}
			</div>
			<div className="carosel__move-btns">
				<button className="carosel__btn carosel__btn--prev" onClick={prevBtnClickHandler}>
					&lt;
				</button>
				<button className="carosel__btn carosel__btn--next" onClick={nextBtnClickHandler}>
					&gt;
				</button>
			</div>
		</div>
	);
};

export default BigCarosel;
