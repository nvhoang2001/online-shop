import { configureStore } from "@reduxjs/toolkit";
import checkoutSlice from "./checkout-slice";
import productSlice from "./product-slice";
import userSlice from "./user-slice";

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		products: productSlice.reducer,
		checkout: checkoutSlice.reducer,
	},
});

export default store;
