import { Route, Switch } from "react-router";

import NotFound from "../../sections/NotFound/NotFound";
import AsideBar from "../../sections/User__AsideBar/AsideBar";
import Following from "../../sections/User__Following/Following";
import PurchasedProducts from "../../sections/User__Purchase/PurchasedProducts";
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
				<Route path={`${PRIVATE_PROFILE_DIR}/follow`} exact>
					<Following />
				</Route>
				<Route path={`${PRIVATE_PROFILE_DIR}/purchase`} exact>
					<PurchasedProducts />
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
};

export default PrivateUserPage;
