import AgeInput from "../../components/UI/AgeInput/AgeInput";
import CustomInput from "../../components/UI/CustomInput/CustomInput.component";
import GenderInput from "../../components/UI/GenderInput/GenderInput";

const UpdateForm = ({ className, userData, baseClass }) => {
	const { username, gender, phone, country, city, address, zipcode, age } = userData;

	return (
		<div className={className}>
			<CustomInput
				className={`${baseClass}__input`}
				input={{
					id: "username",
					name: "username",
					label: "Fullname",
					type: "text",
					placeholder: "Your name",
					defaultValue: username ?? "",
				}}
				sendInputValidity={() => {}}
				sendInputValue={() => {}}
			/>

			<CustomInput
				className={`${baseClass}__input`}
				input={{
					id: "phone",
					name: "phone",
					label: "Phone Number",
					type: "text",
					placeholder: "Your phone number",
					defaultValue: phone ?? "",
				}}
				sendInputValidity={() => {}}
				sendInputValue={() => {}}
			/>
			<GenderInput
				baseClass={baseClass}
				sendInputValue={() => {}}
				className="w-wide"
				defaultValue={gender}
			/>
			<AgeInput baseClass={baseClass} sendInputValue={() => {}} defaultValue={age} />

			<CustomInput
				className={`${baseClass}__input`}
				input={{
					id: "country",
					name: "country",
					label: "Country",
					type: "text",
					placeholder: "Your country",
					defaultValue: country ?? "",
				}}
				sendInputValidity={() => {}}
				sendInputValue={() => {}}
			/>
			<CustomInput
				className={`${baseClass}__input`}
				input={{
					id: "city",
					name: "city",
					label: "Province/ City",
					type: "text",
					placeholder: "Your city",
					defaultValue: city ?? "",
				}}
				sendInputValidity={() => {}}
				sendInputValue={() => {}}
			/>
			<CustomInput
				className={`${baseClass}__input`}
				input={{
					id: "address",
					name: "address",
					label: "Address",
					type: "text",
					placeholder: "Your Address",
					defaultValue: address ?? "",
				}}
				sendInputValidity={() => {}}
				sendInputValue={() => {}}
			/>
			<CustomInput
				className={`${baseClass}__input`}
				input={{
					id: "zipcode",
					name: "zipcode",
					label: "Zip/Postcode",
					type: "text",
					placeholder: "Zipcode",
					defaultValue: zipcode ?? "",
				}}
				sendInputValidity={() => {}}
				sendInputValue={() => {}}
			/>
		</div>
	);
};
export default UpdateForm;
