import { createSlice } from "@reduxjs/toolkit";

import { DB_URL } from "../config";
import { FEEDBACKING, FEEDBACK_ERROR, FEEDBACK_SUCCESS, userActions } from "./user-slice";

const getBrands = (products) => {
	const brands = [];
	products.forEach((prod) => {
		const isExisted = brands.find((brand) => prod.brand === brand.brand);
		if (isExisted) {
			return;
		}

		brands.push({
			brand: prod.brand,
			category: prod.category,
			type: prod.type,
		});
	});

	return brands;
};

const getCategories = (brands) => {
	let cates = [];
	brands.forEach((brand) => {
		const { category, brand: brandName } = brand;
		const includedBrandIndex = cates.findIndex((cat) => cat.category === category);

		if (includedBrandIndex !== -1) {
			cates[includedBrandIndex].brands.push(brandName);
			return;
		}

		cates.push({
			category,
			brands: [brandName],
		});
	});

	return cates;
};

const getTypes = (brands) => {
	let type = [];
	brands.forEach((brand) => {
		const includedTypeIndex = type.findIndex((type) => type === brand.type);

		if (includedTypeIndex !== -1) {
			return;
		}

		type.push(brand.type);
	});

	return type;
};

const categoryProducts = (productItems) => {
	const category = {};
	productItems.forEach((prod) => {
		const { type, category: prodCate, brand } = prod;
		if (!category[type]) {
			category[type] = {};
		}

		if (!category[type][prodCate]) {
			category[type][prodCate] = {};
		}

		if (!category[type][prodCate][brand]) {
			category[type][prodCate][brand] = [];
		}

		category[type][prodCate][brand].push(prod);
	});
	return category;
};

const productSlice = createSlice({
	name: "products",
	initialState: {
		types: null,
		items: null,
		brands: null,
		catedItems: null,
		inited: false,
	},
	reducers: {
		start(state, action) {
			state.items = action.payload;
			state.catedItems = categoryProducts(action.payload);
			state.brands = getBrands(action.payload);
			state.types = getTypes(state.brands);
			state.inited = true;
		},
		addFeedback(state, action) {
			const { productId, feedback } = action.payload;
			const item = state.items.find((product) => product.id === productId);

			item.ratingNum = item.feedbacks.unshift(feedback);
			item.rating =
				Number(
					(item.feedbacks.reduce((s, i) => s + i.rating, 0) / item.ratingNum).toFixed(1),
				) || 0;
		},
	},
});

export const initProductSlice = () => {
	const destructuringProductData = (product) => {
		return Object.values(product)[0];
	};

	return async (dispatch) => {
		try {
			const response = await fetch(`${DB_URL}/products.json`);
			const resData = await response.json();
			const productDatum = Object.values(resData).map((prod) =>
				destructuringProductData(prod),
			);

			dispatch(productSlice.actions.start(productDatum));
		} catch (error) {
			throw error;
		}
	};
};

export const addFeedbackToProduct = (productId, feedbackObj, feedbackURL) => {
	return async (dispatch) => {
		try {
			dispatch(userActions.changeFeedbackState({ type: FEEDBACKING }));
			const response = await fetch(feedbackURL, {
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(feedbackObj),
				method: "POST",
			});
			if (!response.ok) {
				throw Error("Can't connect to server");
			}
			const resData = await response.json();
			dispatch(
				productSlice.actions.addFeedback({
					productId,
					feedback: feedbackObj,
				}),
			);
			dispatch(userActions.changeFeedbackState({ type: FEEDBACK_SUCCESS }));
		} catch (error) {
			dispatch(userActions.changeFeedbackState({ type: FEEDBACK_ERROR }));
		}
	};
};

export const productActions = productSlice.actions;
export default productSlice;
