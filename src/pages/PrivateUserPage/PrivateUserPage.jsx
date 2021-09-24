import { Route, Switch } from "react-router";

import AsideBar from "../../sections/User__AsideBar/AsideBar";
import ChangePassword from "../../sections/User__ChangePassword/ChangePassword";
import PrivateDashboard from "../../sections/User__PrivateDashboard/PrivateDashboard";

import { PRIVATE_PROFILE_DIR } from "../../config";

const PrivateUserPage = () => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "flex-start",
				padding: "3%",
			}}
		>
			<AsideBar />
			<Switch>
				<Route path={`${PRIVATE_PROFILE_DIR}`} exact>
					<PrivateDashboard />
				</Route>
				<Route path={`${PRIVATE_PROFILE_DIR}/change-password`} exact>
					<ChangePassword />
				</Route>
			</Switch>
		</div>
	);
};

export default PrivateUserPage;
