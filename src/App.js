import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import RegisterPage from "./pages/Register/RegisterPage";

import { signUpURL } from "./config";
import "./reset-css.scss";
import "./App.css";

function App() {
	return (
		<Switch>
			<Route path="/" exact>
				<Homepage />
			</Route>
			<Route path={signUpURL} exact>
				<RegisterPage />
			</Route>
		</Switch>
	);
}

export default App;
