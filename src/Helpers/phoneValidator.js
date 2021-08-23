// For 1-10 letter word for extension and 1-6 digit extension
const phoneRegex =
	/\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/;

function phoneValidator(phone) {
	return phoneRegex.test(phone);
}

export default phoneValidator;
