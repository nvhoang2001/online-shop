import { TIME_THRESHOLD } from "../config";

const saveAuthInfo = (data) => {
	const expirationTime = new Date(new Date().getTime() + Number(data.expiresIn) * 1000);
	localStorage.setItem("auth", JSON.stringify(data));
	localStorage.setItem("expirationTime", String(expirationTime));
};

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();
	const remainingDuration = adjExpirationTime - currentTime;
	return remainingDuration;
};

const retrieveStoredAuthInfo = () => {
	const storedToken = localStorage.getItem("auth");
	const storedExpirationDate = localStorage.getItem("expirationTime");
	const remainingTime = calculateRemainingTime(storedExpirationDate);

	if (remainingTime <= TIME_THRESHOLD) {
		localStorage.removeItem("auth");
		localStorage.removeItem("expirationTime");
		return null;
	}

	return { auth: storedToken, duration: remainingTime };
};

export { saveAuthInfo, calculateRemainingTime, retrieveStoredAuthInfo };
