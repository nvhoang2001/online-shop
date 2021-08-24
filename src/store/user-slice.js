import { createSlice } from "@reduxjs/toolkit";
import { API_KEY, DB_URL } from "../config";
import sendDataToURL from "../Helpers/sendDataToURL";

const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

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
		logIn(state, action) {},
		logOut(state, action) {},
		changePassword(state, action) {},
		register(state, action) {
			state.auth = action.payload.auth;

			// Required field
			state.name = action.payload.username;
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
		const userData = { auth: signUpData, ...userInfo };

		dispatch(userSlice.actions.register(userData));

		delete userInfo["confirm-password"];
		delete userInfo["password"];

		sendDataToURL(`${DB_URL}/users/${authData.localId}.json`, userInfo);
	};
};

export const userActions = userSlice.actions;
export default userSlice;
