import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		auth: null,
		name: "",
		address: "",
		gender: true,
		email: "",
		phone: "",
	},
	reducers: {
		logIn(state, action) {},
		logOut(state, action) {},
		changePassword(state, action) {},
	},
});

export const userActions = userSlice.actions;
export default userSlice;
