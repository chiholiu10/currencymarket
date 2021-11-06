export const types = {
  GET_DATA: "GET_DATA",
  SWAP_CURRENCY: "SWAP_CURRENCY",
  TO_VALUE: "TO_VALUE",
  FROM_VALUE: "FROM_VALUE",
  SAVE_HISTORY: "SAVE_HISTORY",
  GET_CURRENCY: "GET_CURRENCY"
};

export const getData = (data: Array<string | number>) => ({
  type: types.GET_DATA,
  data
});

type HistoryDataProps = {
  timestamp: string;
  rate: string;
}

export const getHistory = (historyData: HistoryDataProps) => ({
  type: types.SAVE_HISTORY,
  historyData
});

export const selectOneValue = () => ({
  type: types.TO_VALUE, 
});

export const selectTwoValue = (currentValue: string) => ({
  type: types.FROM_VALUE,
});

export const getCurrency = (currency: string) => {
  console.log(currency)
  return {
    type: types.GET_CURRENCY,
    currency
  }

}

export type HistoryProps = {
  id: string,
  date: number,
  amount: string,
  from: string,
  to: string
}
