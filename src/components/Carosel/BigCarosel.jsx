import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MOVE_TIME, TIME_LIMIT } from "../../config";
import "./BigCarosel.scss";

let moveTimer, pauseTimer;

const BigCarosel = ({ topProds, className = "" }) => {
	const maxImg = topProds.length - 1,
		minImg = 0,
		initImg = 0;
	const [activeImg, setActiveImg] = useState(initImg);
	const [loadedResources, setLoadedResources] = useState({});

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
	const pauseSlide = () => {
		moveTimer && clearTimeout(moveTimer);
		clearInterval(moveTimer);
		moveTimer = null;
		clearTimeout(pauseTimer);
		pauseTimer = null;
	};
	const continueSlide = () => {
		pauseTimer && clearTimeout(pauseTimer);
		pauseTimer = setTimeout(() => {
			moveTimer && clearTimeout(moveTimer);
			moveTimer = setInterval(() => {
				setActiveImg((curImg) => {
					if (curImg === maxImg) {
						return minImg;
					}

					return curImg + 1;
				});
			}, MOVE_TIME);
		}, TIME_LIMIT);
	};
	const prevBtnClickHandler = () => {
		moveToImg(prevImg());
	};
	const nextBtnClickHandler = () => {
		moveToImg(nextImg());
	};
	const dotClickHandler = (e) => {
		const curEl = e.target;
		if (!curEl.classList.contains("carosel__dot")) {
			return;
		}
		pauseSlide();
		const clickImgIndex = Number(curEl.dataset.img);
		if (clickImgIndex === nextImg() || clickImgIndex === prevImg()) {
			moveToImg(clickImgIndex);
			return;
		}
		let currentImg = activeImg;
		(function moveImg() {
			if (clickImgIndex === currentImg) {
				return;
			} else if (clickImgIndex < currentImg) {
				moveToImg(--currentImg);
			} else {
				moveToImg(++currentImg);
			}
			setTimeout(moveImg, 1000);
		})();
	};
	const caroselMouseEnterHandler = () => {
		pauseSlide();
	};
	const caroselMouseOutHandler = () => {
		continueSlide();
	};
	const loadImgHandler = (e) => {
		const prodID = e.target.closest(".carosel__img").dataset.id;
		setLoadedResources({ ...loadedResources, [prodID]: true });
	};

	useEffect(() => {
		(function initCarosel() {
			setActiveImg((actImg) => {
				if (actImg === maxImg) {
					return minImg;
				}

				return actImg + 1;
			});
			moveTimer = setTimeout(initCarosel, MOVE_TIME);
		})();

		return () => {
			moveTimer && clearTimeout(moveTimer);
		};
	}, []);

	return (
		<div
			className={`carosel ${className}`}
			onMouseEnter={caroselMouseEnterHandler}
			onMouseLeave={caroselMouseOutHandler}
		>
			<div className="carosel__slider">
				{topProds.map(({ id, imgLink }, i) => {
					let imgClass = "carosel__item ";

					switch (i) {
						case activeImg:
							imgClass += "carosel__item--active";
							break;
						case prevImg():
							imgClass += "carosel__item--prev";
							break;
						case nextImg():
							imgClass += "carosel__item--next";
							break;
						default:
							break;
					}

					return (
						<div className={imgClass} key={id}>
							<Link
								className={`carosel__img ${
									loadedResources[id] ? "carosel__img--loaded" : ""
								}`}
								to={`/product/${id}`}
								style={{
									backgroundImage: `${
										loadedResources[id] ? `url(${imgLink})` : ""
									}`,
								}}
								data-id={id}
							>
								<img src={imgLink} alt="" onLoad={loadImgHandler} />
							</Link>
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
