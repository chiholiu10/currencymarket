export const types = {
  GET_DATA: "GET_DATA",
  SWAP_CURRENCY: "SWAP_CURRENCY",
  TO_VALUE: "TO_VALUE",
  FROM_VALUE: "FROM_VALUE",
  SAVE_HISTORY: "SAVE_HISTORY",
  GET_CURRENCY: "GET_CURRENCY",
  SHOW_CALCULATION: "SHOW_CALCULATION",
  CONVERSION_HISTORY: "CONVERSION_HISTORY",
  ALL_RATES: "ALL_RATES"
};

export const getData = (data: Array<string | number>) => ({
  type: types.GET_DATA,
  data
});

type HistoryDataProps = {
  timestamp: string;
  rate: string;
};

export const getHistory = (historyData: HistoryDataProps) => ({
  type: types.SAVE_HISTORY,
  historyData
});

export const selectOneValue = () => ({
  type: types.TO_VALUE,
});

export const selectTwoValue = () => ({
  type: types.FROM_VALUE
});

export const getCurrency = (currency: string) => ({
  type: types.GET_CURRENCY,
  currency
});

export const showCalculation = (calculationData: any) => ({
  type: types.SHOW_CALCULATION,
  calculationData
});

export const conversionHistory = (currentConversionHistory: any) => ({
  type: types.CONVERSION_HISTORY,
  currentConversionHistory
});

export const setListRates = (rateList: any) => ({
  type: types.ALL_RATES,
  rateList
});
