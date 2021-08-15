import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
	name: "checkout",
	initialState: {
		userInfor: null,
		country: "",
		city: "",
		zipCode: "",
		paymentMethod: "",
		cartItems: [],
	},
	reducers: {
		reset(state, action) {
			state.userInfor = null;
			state.country = "";
			state.city = "";
			state.zipCode = "";
			state.paymentMethod = "";
			state.cartItems = [];
		},
	},
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;
