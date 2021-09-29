import ContactForm from "../../sections/Contact__ContactForm/ContactForm";

const ContactPage = () => {
	return (
		<>
			<h1
				className="page-title"
				style={{
					margin: "2rem 0",
				}}
			>
				Contact Us
			</h1>
			<ContactForm />
		</>
	);
};

export default ContactPage;
