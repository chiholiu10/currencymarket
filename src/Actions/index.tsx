export const types = {
  GET_DATA: "GET_DATA",
  SAVE_HISTORY: "SAVE_HISTORY",
  GET_CURRENCY: "GET_CURRENCY",
  SHOW_CALCULATION: "SHOW_CALCULATION",
  GET_CONVERSION_HISTORY: "GET_CONVERSION_HISTORY",
  SET_LIST_RATES: "SET_LIST_RATES"
};

export const getData = (data: Array<string | number>) => ({
  type: types.GET_DATA,
  data
});

type HistoryDataProps = {
  timestamp: string;
  rate: string;
};

export const saveHistory = (historyData: HistoryDataProps) => ({
  type: types.SAVE_HISTORY,
  historyData
});

export const getCurrency = (currency: string) => ({
  type: types.GET_CURRENCY,
  currency
});

export const showCalculation = (calculationData: any) => ({
  type: types.SHOW_CALCULATION,
  calculationData
});

export const getConversionHistory = (currentConversionHistory: any) => ({
  type: types.GET_CONVERSION_HISTORY,
  currentConversionHistory
});

export const setListRates = (rateList: any) => ({
  type: types.SET_LIST_RATES,
  rateList
});
