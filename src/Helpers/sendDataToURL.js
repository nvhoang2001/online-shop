const sendDataToURL = async (URL, data) => {
	const res = await fetch(URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const resData = await res.json();
	if (!res.ok) throw new Error(resData.error.message);
	return resData;
};

export default sendDataToURL;
