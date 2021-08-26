import { createSlice } from "@reduxjs/toolkit";
import { API_KEY, DB_URL, TIME_THRESHOLD } from "../config";
import sendDataToURL from "../Helpers/sendDataToURL";
import { calculateRemainingTime, saveAuthInfo } from "../Helpers/storeAndRetrieveAuthInfo";

const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const REFRESH_URL = "https://securetoken.googleapis.com/v1/token?key=";

let timeout, timeout2;

const userSlice = createSlice({
	name: "user",
	initialState: {
		auth: null,
		name: "",
		address: "",
		gender: true,
		email: "",
		phone: "",
		age: 0,
		city: "",
		country: "",
		zipcode: "",
	},
	reducers: {
		logIn(_, action) {
			return action.payload;
		},

		logOut() {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			if (timeout2) {
				clearTimeout(timeout2);
				timeout2 = null;
			}

			localStorage.removeItem("auth");
			localStorage.removeItem("expirationTime");

			return {
				auth: null,
				username: "",
				address: "",
				gender: true,
				email: "",
				phone: "",
				age: 0,
				city: "",
				country: "",
				zipcode: "",
			};
		},

		changePassword(state, action) {},
		register(state, action) {
			state.auth = action.payload.auth;

			// Required field
			state.username = action.payload.username;
			state.email = action.payload.email;

			// Not required field
			action.payload.address && (state.address = action.payload.address);
			action.payload.age && (state.age = +action.payload.age);
			action.payload.gender && (state.gender = action.payload.gender);
			action.payload.phone && (state.phone = action.payload.phone);
			action.payload.city && (state.city = action.payload.city);
			action.payload.country && (state.country = action.payload.country);
			action.payload.zipcode && (state.zipcode = action.payload.zipcode);
		},

		refreshAuthInfo(state, action) {
			state.auth.expiresIn = action.payload.expires_in;
			state.auth.refreshToken = action.payload.refresh_token;
			state.auth.idToken = action.payload.id_token;
			saveAuthInfo(state.auth);
		},
	},
});

export const signupAuth = (userInfo, successHandler, errorHandler) => {
	return async (dispatch) => {
		const { email, password } = userInfo;
		const signUpData = { email, password, returnSecureToken: true };
		try {
			const authData = await sendDataToURL(`${SIGN_UP_URL}${API_KEY}`, signUpData);
			const userData = { auth: authData, ...userInfo };
			saveAuthInfo(authData);
			dispatch(userSlice.actions.register(userData));
			delete userInfo["confirm-password"];
			delete userInfo["password"];
			sendDataToURL(`${DB_URL}/users/${authData.localId}.json`, userInfo);
			refreshSignInSession(authData, dispatch);
		} catch (error) {
			console.log(error.message);
			if (error.message === "EMAIL_EXISTS") {
				errorHandler(1);
			} else {
				errorHandler(2);
			}
		}
	};
};

export const signInAuth = (signInInfo, successHandler, errorHandler) => {
	return async (dispatch) => {
		const signInData = { ...signInInfo, returnSecureToken: true };
		try {
			const authData = await sendDataToURL(`${SIGN_IN_URL}${API_KEY}`, signInData);
			saveAuthInfo(authData);
			const resData = await fetch(`${DB_URL}/users/${authData.localId}.json`);
			const userDataID = await resData.json();
			const [userID] = Object.keys(userDataID);
			const { ...userData } = userDataID[userID];
			const userInfo = { auth: authData, ...userData };
			dispatch(userSlice.actions.logIn(userInfo));
			refreshSignInSession(authData, dispatch);
			successHandler();
		} catch (err) {
			errorHandler(0);
		}
	};
};

export const retrieveStoredAuth = (authData) => {
	return async (dispatch) => {
		const auth = JSON.parse(authData.auth);
		const resData = await fetch(`${DB_URL}/users/${auth.localId}.json`);
		const userDataID = await resData.json();
		const [userID] = Object.keys(userDataID);
		const { ...userData } = userDataID[userID];
		const userInfo = { auth, ...userData };
		dispatch(userSlice.actions.logIn(userInfo));
		refreshSignInSession(auth, dispatch);
	};
};

function refreshSignInSession(auth, dispatch) {
	const storedExpirationDate = localStorage.getItem("expirationTime");
	const remainingTime = calculateRemainingTime(storedExpirationDate);
	const { refreshToken } = auth;
	const requestBody = {
		grant_type: "refresh_token",
		refresh_token: refreshToken,
	};

	timeout = setTimeout(() => {
		// Send refresh token
		fetch(`${REFRESH_URL}${API_KEY}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		})
			.then((res) => res.json())
			.then((resData) => {
				dispatch(userSlice.actions.refreshAuthInfo(resData));
				timeout2 = setTimeout(
					refreshSignInSession,
					resData.expires_in * 1000 - TIME_THRESHOLD,
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, remainingTime);
}

export const userActions = userSlice.actions;
export default userSlice;
