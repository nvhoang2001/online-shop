import { useEffect } from "react";
import NotFound from "../../sections/NotFound/NotFound";

const NotFoundPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<NotFound />
		</>
	);
};

export default NotFoundPage;
