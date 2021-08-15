import randomGenerateString from "../Helpers/randomGenerateString";

const USER_ID_LENGTH = 33;
function uidGenerator() {
	return randomGenerateString(USER_ID_LENGTH);
}

function createFeedback(name, rating, time, content = "", uid = uidGenerator()) {
	let feedbackObj = {};
	feedbackObj.userId = uid;
	feedbackObj.username = name;
	feedbackObj.rating = rating;
	// feedbackObj.feedbackTime = new Date(time);
	feedbackObj.feedbackTime = time;
	feedbackObj.content = content;
	return feedbackObj;
}

export default createFeedback;
