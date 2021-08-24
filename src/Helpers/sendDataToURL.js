const sendDataToURL = async (URL, data) => {
	const res = await fetch(URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const resData = await res.json();
	return resData;
};

export default sendDataToURL;
