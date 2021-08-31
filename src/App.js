import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user-slice";

import Modal from "./components/UI/Modal/Modal";
import Homepage from "./pages/Homepage/Homepage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProductPage from "./pages/ProductsPage/ProductPage";
import ErrorNotification from "./components/Layout/ErrorNotification";

import { PROD_DIR, signUpURL } from "./config";
import "./reset-css.scss";
import "./App.css";

function App() {
	const userInfo = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const isSignIn = !!userInfo.auth;
	const { hasError } = userInfo;

	const hideError = () => {
		dispatch(userActions.logOut());
	};

	return (
		<Fragment>
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
				<Route path={`${PROD_DIR}/:typeName`} exact>
					<ProductPage />
				</Route>
			</Switch>
		</Fragment>
	);
}

export default App;
