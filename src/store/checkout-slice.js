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
			const { product, quantity } = action.payload;
			const existingItem = state.cartItems.find((item) => item.id === product.id);
			if (existingItem) {
				existingItem.amount += quantity;
				existingItem.totalPrice = +(
					existingItem.totalPrice +
					quantity * product.price
				).toFixed(2);
			} else {
				state.cartItems.push({
					...product,
					amount: quantity,
					totalPrice: +(product.price * quantity).toFixed(2),
				});
			}

			state.totalAmount += quantity;
			state.totalPrice = Number((state.totalPrice + product.price * quantity).toFixed(2));
		},

		updateUserInfo(state, action) {
			const { name, value } = action.payload;
			state[name] = value;
		},

		updateItem(state, action) {
			const { itemID, amount } = action.payload;
			const itemIndex = state.cartItems.findIndex((item) => item.id === itemID);
			state.cartItems[itemIndex].amount = amount;
			state.cartItems[itemIndex].totalPrice = +(
				state.cartItems[itemIndex].price * amount
			).toFixed(2);
			state.totalAmount = state.cartItems.reduce(
				(totalAmount, item) => totalAmount + item.amount,
				0,
			);
			state.totalPrice = Number(
				state.cartItems
					.reduce((totalPrice, item) => totalPrice + item.amount * item.price, 0)
					.toFixed(2),
			);
		},

		removeItem(state, action) {
			const { itemID } = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== itemID);
			state.totalAmount = state.cartItems.reduce(
				(totalAmount, item) => totalAmount + item.amount,
				0,
			);
			state.totalPrice = Number(
				state.cartItems
					.reduce((totalPrice, item) => totalPrice + item.amount * item.price, 0)
					.toFixed(2),
			);
		},
	},
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;
