export const GET_CLEAR_FNS = "GET_CLEAR_FNS";
export const GET_VALUES = "GET_VALUES";
export const GET_VALIDITY = "GET_VALIDITY";

export const initFormState = {
	validity: {},
	values: {},
};

const formReducer = (prevState, action) => {
	switch (action.type) {
		case GET_VALIDITY: {
			const clonedState = { ...prevState };
			clonedState.validity[action.id] = action.payload;
			return clonedState;
		}
		case GET_VALUES: {
			const clonedState = { ...prevState };
			clonedState.values[action.name] = action.payload;
			return clonedState;
		}

		default:
			break;
	}

	return {
		validity: {},
		values: {},
	};
};

export default formReducer;
