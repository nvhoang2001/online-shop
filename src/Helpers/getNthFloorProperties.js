const mergeObject = (obj1, obj2) => {
	const mergedObj = { ...obj2 };
	for (const key in obj1) {
		if (key in obj2) {
			if (Array.isArray(mergedObj[key])) {
				mergedObj[key] = [...obj1[key], ...obj2[key]];
			} else mergedObj[key] = { ...obj1[key], ...obj2[key] };
			continue;
		}
		mergedObj[key] = obj1[key];
	}

	return mergedObj;
};

const getNthFloorProperties = (obj, depth = 1, output = {}) => {
	if (depth === 0) {
		output = mergeObject(output, obj);
		return output;
	}

	let resObj;
	for (const key in obj) {
		if (Object.values(obj[key]).length > 0) {
			resObj = mergeObject(resObj, getNthFloorProperties(obj[key], depth - 1, output));
		} else continue;
	}

	return resObj;
};

export default getNthFloorProperties;
