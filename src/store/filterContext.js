import React, { useState } from "react";

const filterContext = React.createContext({
	brands: {},
	price: {
		from: 0,
		to: 0,
	},
	rating: 0,
	updateBrands: (brand) => {},
	updatePrice: ({ from, to }) => {},
	updateRating: (uRating) => {},
	clearBrand: () => {},
});

export const FilterProvider = (props) => {
	const brands = [];
	const price = { from: "", to: "" };
	let rating = 0;
	let providerValue = {
		brands,
		price,
		rating: rating,
		updateBrands,
		updatePrice,
		updateRating,
		clearBrand,
	};

	const [filterState, setFilterState] = useState(providerValue);

	function updateBrands(brand) {
		setFilterState((filterState) => {
			const { brands } = filterState;
			const newBrands = [...brands];
			const existingBrandIndex = newBrands.findIndex(
				(existedBrand) => existedBrand === brand,
			);
			if (existingBrandIndex === -1) {
				newBrands.push(brand);
			} else newBrands.splice(existingBrandIndex, 1);
			return { ...filterState, brands: newBrands };
		});
	}

	function updatePrice({ from, to }) {
		price.from = from ?? price.from;
		price.to = to ?? price.to;
		console.log(from, to);
		setFilterState((filterState) => {
			return { ...filterState, price: { ...price } };
		});
	}

	function updateRating(uRating) {
		setFilterState((filterState) => {
			return { ...filterState, rating: uRating };
		});
	}

	function clearBrand() {
		setFilterState((filterState) => {
			return { ...filterState, brands: [] };
		});
	}

	return <filterContext.Provider value={filterState}>{props.children}</filterContext.Provider>;
};

export default filterContext;
