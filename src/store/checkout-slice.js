import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
	name: "checkout",
	initialState: {
		username: "",
		phone: "",
		country: "",
		city: "",
		zipCode: "",
		address: "",
		note: "",
		shipFee: 20,
		discount: 0,
		cartItems: [],
		totalAmount: 0,
		totalPrice: 0,
	},
	reducers: {
		reset(state) {
			state.country = "";
			state.city = "";
			state.zipCode = "";
			state.address = "";
			state.note = "";
			state.phone = "";
			state.username = "";
			state.shipFee = 20;
			state.discount = 0;
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

		updateUserInfo(state, action) {
			const { name, value } = action.payload;
			state[name] = value;
		},
	},
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;
