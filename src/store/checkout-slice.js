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
		totalAmount: 0,
		totalPrice: 0,
	},
	reducers: {
		reset(state) {
			state.userInfor = null;
			state.country = "";
			state.city = "";
			state.zipCode = "";
			state.paymentMethod = "";
			state.cartItems = [];
			state.totalAmount = 0;
			state.totalPrice = 0;
		},

		addItemToCart(state, action) {
			const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
			if (existingItem) {
				existingItem.amount++;
			} else {
				state.cartItems.push({ ...action.payload, amount: 1 });
			}

			state.totalAmount++;
			state.totalPrice += action.payload.price;
		},
	},
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;
