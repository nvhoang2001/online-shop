import { driveViewLink } from "../config";

const randomGenerator = (min, max) => {
	return min + Math.random() * (max + 1);
};

function getRatingNum(feedbackObj) {
	return feedbackObj.feedbacks.length;
}

function getRating(feedbackObj) {
	return (
		feedbackObj.feedbacks.reduce((s, i) => s + i.rating, 0) / feedbackObj.ratingNum
	).toFixed(1);
}
let count = 0;

function createProduct(
	driveId,
	name,
	brand,
	type,
	category,
	feedbacks,
	description,
	preview,
	isSaling = false,
	sale = 0,
) {
	const feedbackObj = {};

	feedbackObj.id = `prod${++count}`;
	feedbackObj.name = name;
	feedbackObj.brand = brand;
	feedbackObj.imgLink = `${driveViewLink}${driveId}`;
	feedbackObj.viewInMonth = Math.floor(randomGenerator(10, 10000));
	feedbackObj.viewInWeek = Math.floor(randomGenerator(10, 1000));
	feedbackObj.sold = Math.floor(randomGenerator(0, 5000));
	feedbackObj.type = type;
	feedbackObj.category = category;
	feedbackObj.feedbacks = feedbacks;
	feedbackObj.ratingNum = getRatingNum(feedbackObj);
	feedbackObj.rating = getRating(feedbackObj);
	feedbackObj.isSaling = isSaling;
	feedbackObj.sale = isSaling ? sale : 0;
	feedbackObj.description = description;
	feedbackObj.preview = preview;
	feedbackObj.price = randomGenerator(10, 1000).toFixed(2);
	return feedbackObj;
}

export default createProduct;
