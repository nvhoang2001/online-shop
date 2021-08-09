import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";

import "./reset-css.scss";
import "./App.css";

function App() {
	return (
		<Switch>
			<Route to="/" exact>
				<Homepage />
			</Route>
		</Switch>
	);
}

export default App;
