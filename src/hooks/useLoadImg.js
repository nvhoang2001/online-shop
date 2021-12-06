import { useEffect, useState } from "react";

const useLoadImg = (imgLink) => {
	const [showImg, setShowImg] = useState(false);
	const [imgSrc, setImgSrc] = useState("");

	const loadedImgHandler = () => {
		setImgSrc(`url(${imgLink})`);
	};

	useEffect(() => {
		setShowImg(true);
	}, []);

	return {
		showImg,
		imgSrc,
		loadedImgHandler,
	};
};

export default useLoadImg;
