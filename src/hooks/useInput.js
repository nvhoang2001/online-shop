import { useCallback, useReducer } from "react";

const inputInitialize = {
	touched: false,
	value: "",
};

const SET_TOUCHED = "SET_TOUCHED";
const SET_VALUE = "SET_VALUE";
const CLEAR = "CLEAR";

const inputReducer = (prevState, action) => {
	switch (action.type) {
		case SET_TOUCHED:
			return {
				value: prevState.value,
				touched: action.payload,
			};

		case SET_VALUE:
			return {
				value: action.payload,
				touched: prevState.touched,
			};

		default:
			break;
	}

	return {
		touched: false,
		value: "",
	};
};

const useInput = (validator, isRequired) => {
	const [inputState, setInputState] = useReducer(inputReducer, inputInitialize);

	const isValid = isRequired ? validator(inputState.value) : true;
	const hasError = isRequired ? !isValid && inputState.touched : false;

	const setInputValue = useCallback(
		(value) => {
			setInputState({ type: SET_VALUE, payload: value });
		},
		[setInputState],
	);

	const inputChangeHandler = useCallback(
		(value) => {
			setInputState({ type: SET_VALUE, payload: value });
		},
		[setInputState],
	);

	const clear = useCallback(() => {
		setInputState({ type: CLEAR });
	}, [setInputState]);

	const touchedInputHandler = useCallback(
		(value) => {
			setInputState({ type: SET_TOUCHED, payload: value });
		},
		[setInputState],
	);

	return {
		value: inputState.value,
		isValid,
		hasError,
		inputChangeHandler,
		touchedInputHandler,
		setInputValue,
		clear,
	};
};

export default useInput;
