import { useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import MarketBox from "./MarketBox";
import SortingBox from "./SortingBox";
import ProductGrid from "./ProductGrid";
import PaginationBox from "./PaginationBox";
import filterContext from "../../store/filterContext";

import getNthFloorProperties from "../../Helpers/getNthFloorProperties";
import {
	SORTING_ALPHAASC,
	SORTING_ALPHADESC,
	SORTING_AVGCUSTOMERREVIEW,
	SORTING_BESTSELLING,
	SORTING_NEWEST,
	SORTING_PRICEASC,
	SORTING_PRICEDESC,
} from "../../config";

import "./ProductListing.scss";

const PRODUCT_FLOOR = 4;

const ProductListing = () => {
	const location = useLocation();
	const locas = location.pathname.split("/");
	locas.at(0) === "" && locas.shift();
	locas.at(-1) === "" && locas.pop();

	const filterCtx = useContext(filterContext);
	const { brands: filteredBrands, price: filteredPrice, rating: filteredRating } = filterCtx;

	const catedProds = useSelector((store) => store.products.catedItems);

	let cates = catedProds;
	if (locas.length <= 4) {
		if (locas.length !== 1) {
			for (let i = 1; i < locas.length; i++) {
				cates = cates[locas[i]];
			}
		}
	}

	const prodArray = [];
	for (const key in cates) {
		prodArray.push(getNthFloorProperties(cates[key], PRODUCT_FLOOR - locas.length - 1));
	}

	let products = [];
	if (locas.length === 4) {
		products = [...prodArray];
	} else if (locas.length < 4) {
		for (const arr of prodArray) {
			products.push(...arr);
		}
	}

	products = products.filter((prod) => {
		const checkBrand = filteredBrands.length !== 0 ? filteredBrands.includes(prod.brand) : true;
		const checkPrice =
			filteredPrice.to !== "" || filteredPrice.from !== ""
				? filteredPrice.from !== ""
					? filteredPrice.to !== ""
						? prod.price >= filteredPrice.from && prod.price <= filteredPrice.to
						: prod.price >= filteredPrice.from
					: prod.price <= filteredPrice.to
				: true;
		const checkRating = prod.rating >= filteredRating;

		return checkBrand && checkPrice && checkRating;
	});

	const searchParams = new URLSearchParams(location.search);

	const sortParams = searchParams.get("sort");
	switch (sortParams) {
		case null:
		case SORTING_NEWEST:
			products.sort((prod1, prod2) => prod1.releaseDate - prod2.releaseDate);
			break;
		case SORTING_ALPHAASC:
			products.sort((prod1, prod2) => {
				if (prod1.name > prod2.name) {
					return 1;
				}
				if (prod1.name === prod2.name) {
					return 0;
				}

				return -1;
			});
			break;
		case SORTING_ALPHADESC:
			products.sort((prod1, prod2) => {
				if (prod1.name > prod2.name) {
					return -1;
				}
				if (prod1.name === prod2.name) {
					return 0;
				}

				return 1;
			});
			break;
		case SORTING_AVGCUSTOMERREVIEW:
			products.sort((prod1, prod2) => prod2.rating - prod1.rating);
			break;
		case SORTING_BESTSELLING:
			products.sort((prod1, prod2) => prod2.sold - prod1.sold);
			break;
		case SORTING_PRICEASC:
			products.sort((prod1, prod2) => prod1.price - prod2.price);
			break;
		case SORTING_PRICEDESC:
			products.sort((prod1, prod2) => prod2.price - prod1.price);
			break;
		default:
			break;
	}

	const searchKeyword = searchParams.get("search");
	if (searchKeyword) {
		products = products.filter((product) =>
			product.name.toLowerCase().includes(searchKeyword.toLowerCase()),
		);
	}

	const pageParams = searchParams.get("page") ?? 1;

	return (
		<div className="product-listing">
			<MarketBox location={location.pathname} />
			<SortingBox />
			<ProductGrid products={products} location={location} pageParams={pageParams} />
			<PaginationBox products={products} location={location} />
		</div>
	);
};

export default ProductListing;
