import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { userActions } from "./store/user-slice";
import { retrieveStoredAuth } from "./store/user-slice";
import { initProductSlice } from "./store/product-slice";

import Header from "./sections/Header/Header";
import Footer from "./sections/Footer/Footer";
import Modal from "./components/UI/Modal/Modal";
import Homepage from "./pages/Homepage/Homepage";
import UserPage from "./pages/UserPage/UserPage";
import Loader from "./components/UI/Loader/Loader";
import RefundPage from "./pages/RefundPage/RefundPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProductPage from "./pages/ProductsPage/ProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import PrivateUserPage from "./pages/PrivateUserPage/PrivateUserPage";
import ErrorNotification from "./components/Layout/ErrorNotification";
import ProductDetailPage from "./pages/ProductPage/ProductDetailPage";

import { retrieveStoredAuthInfo } from "./Helpers/storeAndRetrieveAuthInfo";
import {
	checkoutPage,
	PRIVATE_PROFILE_DIR,
	PROD_DIR,
	PUBLIC_USR,
	signUpURL,
	REFUND_DIR,
	CONTACT_DIR,
} from "./config";

import "./reset-css.scss";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const userInfo = useSelector((store) => store.user);
	const items = useSelector((store) => store.checkout.cartItems);
	const hasInitedProducts = useSelector((store) => store.products.inited);
	const failRefreshToken = useSelector((store) => store.user.failRefreshToken);
	const isSignIn = !!userInfo.auth;

	const hideError = () => {
		dispatch(userActions.logOut());
	};

	useEffect(() => {
		if (!hasInitedProducts) {
			dispatch(initProductSlice());
			return;
		}
		setIsLoading(false);
	}, [hasInitedProducts]);

	useEffect(() => {
		if (isSignIn) {
			return;
		}

		const retrievedAuth = retrieveStoredAuthInfo();
		if (!retrievedAuth) {
			return;
		}

		dispatch(retrieveStoredAuth(retrievedAuth));
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Fragment>
			<Header />
			{failRefreshToken && (
				<Modal onHide={hideError}>
					<ErrorNotification
						onHide={hideError}
						btnContent="Send a report and re-sign in!"
					>
						Something went wrong! Please sign in again!
					</ErrorNotification>
				</Modal>
			)}
			<Switch>
				<Route path="/" exact>
					<Homepage />
				</Route>

				<Route path={signUpURL} exact>
					{!isSignIn && <RegisterPage />}
					{isSignIn && <Redirect to="/" />}
				</Route>

				<Route path={PROD_DIR}>
					<ProductPage />
				</Route>

				<Route path="/product/:productId">
					<ProductDetailPage />
				</Route>

				{items.length !== 0 && (
					<Route path={checkoutPage}>
						<CheckoutPage />
					</Route>
				)}

				<Route path={`${PUBLIC_USR}/:userId`}>
					<UserPage />
				</Route>

				{isSignIn && (
					<Route path={`${PRIVATE_PROFILE_DIR}`}>
						<PrivateUserPage />
					</Route>
				)}

				<Route path={REFUND_DIR}>
					<RefundPage />
				</Route>

				<Route path={CONTACT_DIR}>
					<ContactPage />
				</Route>

				<Route path="*">
					<NotFoundPage />
				</Route>
			</Switch>
			<Footer />
		</Fragment>
	);
}

export default App;
