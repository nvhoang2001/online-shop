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
const categoryProducts = () => {
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

const categoriedProducts = categoryProducts();

const productSlice = createSlice({
	name: "products",
	initialState: {
		items: productItems,
		brands: prodBrands,
		catedItems: categoriedProducts,
	},
	reducers: {},
});

export const productActions = productSlice.actions;
export default productSlice;
