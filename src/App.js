import { Redirect, Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import RegisterPage from "./pages/Register/RegisterPage";

import { signUpURL } from "./config";
import "./reset-css.scss";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
	const isSignIn = !!useSelector((store) => store.user.auth);

	return (
		<Switch>
			<Route path="/" exact>
				<Homepage />
			</Route>

			<Route path={signUpURL} exact>
				{!isSignIn && <RegisterPage />}
				{isSignIn && <Redirect to="/" />}
			</Route>
		</Switch>
	);
}

export default App;
