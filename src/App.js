import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { userActions } from "./store/user-slice";
import { retrieveStoredAuth } from "./store/user-slice";

import Header from "./sections/Header/Header";
import Footer from "./sections/Footer/Footer";
import Modal from "./components/UI/Modal/Modal";
import Homepage from "./pages/Homepage/Homepage";
import UserPage from "./pages/UserPage/UserPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProductPage from "./pages/ProductsPage/ProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.jsx";
import ErrorNotification from "./components/Layout/ErrorNotification";
import ProductDetailPage from "./pages/ProductPage/ProductDetailPage";

import { checkoutPage, PROD_DIR, PUBLIC_USR, signUpURL } from "./config";
import { retrieveStoredAuthInfo } from "./Helpers/storeAndRetrieveAuthInfo";

import "./reset-css.scss";
import "./App.css";

function App() {
	const userInfo = useSelector((store) => store.user);
	const items = useSelector((store) => store.checkout.cartItems);
	const dispatch = useDispatch();
	const isSignIn = !!userInfo.auth;
	const { hasError } = userInfo;

	const hideError = () => {
		dispatch(userActions.logOut());
	};

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

	return (
		<Fragment>
			<Header />
			{hasError && (
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

				<Route path="*">
					<NotFoundPage />
				</Route>
			</Switch>
			<Footer />
		</Fragment>
	);
}

export default App;
