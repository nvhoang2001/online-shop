const phoneRegex =
	/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{2,3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

function phoneValidator(phone) {
	return phoneRegex.test(phone);
}

export default phoneValidator;
