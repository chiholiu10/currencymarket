export const types = {
  GET_DATA: "GET_DATA",
  GET_RATES: "GET_RATES",
  SWAP_CURRENCY: "SWAP_CURRENCY",
  TO_VALUE: "TO_VALUE",
  FROM_VALUE: "FROM_VALUE"
};

export const getData = (data: Array<string | number>) => ({
  type: types.GET_DATA,
  data
});

type RateProps = {
  currency: string;
  rate: string;
  timestamp: string;
}

export const getRates = (rates: RateProps) => ({
  type: types.GET_RATES,
  rates
});

export const swapCurrency = () => ({
  type: types.SWAP_CURRENCY
});

export const selectOneValue = () => ({
  type: types.TO_VALUE, 
});

export const selectTwoValue = (currentValue: string) => {
  return {
    type: types.FROM_VALUE, 
  }
}