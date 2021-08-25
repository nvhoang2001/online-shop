import { createSlice } from "@reduxjs/toolkit";
import { API_KEY, DB_URL } from "../config";
import sendDataToURL from "../Helpers/sendDataToURL";
import { saveAuthInfo } from "../Helpers/storeAndRetrieveAuthInfo";

const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

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
	},
});

export const signupAuth = (userInfo) => {
	return async (dispatch) => {
		const { email, password } = userInfo;
		const signUpData = { email, password, returnSecureToken: true };
		const authData = await sendDataToURL(`${SIGN_UP_URL}${API_KEY}`, signUpData);
		const userData = { auth: authData, ...userInfo };
		saveAuthInfo(authData);
		dispatch(userSlice.actions.register(userData));
		delete userInfo["confirm-password"];
		delete userInfo["password"];
		sendDataToURL(`${DB_URL}/users/${authData.localId}.json`, userInfo);
	};
};

export const signInAuth = (signInInfo) => {
	return async (dispatch) => {
		const signIpData = { ...signInInfo, returnSecureToken: true };
		const authData = await sendDataToURL(`${SIGN_IN_URL}${API_KEY}`, signIpData);
		saveAuthInfo(authData);
		const resData = await fetch(`${DB_URL}/users/${authData.localId}.json`);
		const userDataID = await resData.json();
		const [userID] = Object.keys(userDataID);
		const { ...userData } = userDataID[userID];
		const userInfo = { auth: authData, ...userData };
		dispatch(userSlice.actions.logIn(userInfo));
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
	};
};

export const userActions = userSlice.actions;
export default userSlice;
