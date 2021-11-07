import { types } from "../Actions";

export const initialState = {
	loaded: false,
	toValue: 0,
	fromValue: 0,
	data: [],
	currency: "",
	historyData: [],
	calculationData: [],
	currentConversionHistory: [],
	rateList: []
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
			};
		}

		case types.SHOW_CALCULATION: {
			return {
				...state,
				calculationData: action.calculationData
			};
		}

		case types.CONVERSION_HISTORY: {
			return {
				...state,
				currentConversionHistory: action.currentConversionHistory
			};
		}

		case types.ALL_RATES: {
			return {
				...state,
				rateList: action.rateList
			};
		}

		default:
			return state;
	}
};

export default reducer;