import { useEffect } from "react";
import RegisterForm from "../../sections/RegisterForm/RegisterForm";

const RegisterPage = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<>
			<RegisterForm />
		</>
	);
};

export default RegisterPage;
