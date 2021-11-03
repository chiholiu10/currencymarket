import { types } from "../Actions";

export const initialState = {
	loaded: false,
	swap: false,
	toValue: 0,
	fromValue: 0,
	rates: [],
	data: []
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

		case types.GET_RATES: {
			return {
				...state,
				rates: action.rates
			};
		}

		case types.SWAP_CURRENCY: {
			return {
				...state,
				swap: !state.swap
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

		default:
			return state;
	}
};

export default reducer;