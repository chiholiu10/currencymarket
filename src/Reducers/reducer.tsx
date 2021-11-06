import { types } from "../Actions";

export const initialState = {
	loaded: false,
	toValue: 0,
	fromValue: 0,
	data: [],
	currency: "",
	historyData: []
};

export const reducer = (state = initialState, action: any) => {
	switch (action.type) {
		case types.GET_DATA: {
			return {
				...state,
				data: action.data,
				loaded: true,
			};
		}

		case types.TO_VALUE: {
			console.log(action.toValue)
			return {
				...state,
				toValue: action.toValue
			};
		}

		case types.FROM_VALUE: {
			return {
				...state,
				fromValue: action.fromValue
			};
		}

		case types.GET_CURRENCY: {
			return {
				...state,
				currency: action.currency
			};
		}


		case types.SAVE_HISTORY: {
			return {
				...state,
				historyData: action.historyData
			}
		}

		default:
			return state;
	}
};

export default reducer;