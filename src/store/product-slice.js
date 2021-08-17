import { createSlice } from "@reduxjs/toolkit";

import createProduct from "../classes/Product";
import products from "./product-info";

const getBrands = () => {
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

export const prodBrands = getBrands();
export const categories = getCategories(prodBrands);
export const types = getTypes(prodBrands);
export const productItems = products.map((prod) => {
	const { id, brand, category, description, feedbacks, name, preview, type } = prod;
	return createProduct(id, name, brand, type, category, feedbacks, description, preview);
});

const productSlice = createSlice({
	name: "products",
	initialState: {
		items: productItems,
		brands: prodBrands,
		topItems: [],
	},
	reducers: {
		setTopViewItems(state, action) {
			const itemsSortByView = [...state.items].sort((prevIem, nextItem) => {
				return prevIem.viewInMonth - nextItem.viewInMonth;
			});

			itemsSortByView.length = action.payload;

			state.topItems = itemsSortByView;
		},
	},
});

export const productActions = productSlice.actions;
export default productSlice;
