export type StateProps = {
  loaded: boolean;
  toValue: number;
  fromValue: number;
  data: Array<number | string>;
  currency: string;
  historyData: any;
  calculationData: Array<number | string>;
  currentConversionHistory: Array<number | string>;
  rateList: Array<number | string>;
};

export type ConversationHistoryProps = {
  amount: string | number;
  date: string | number;
  from: string;
  id: number;
  to: string;
};

export type RateListProps = {
  currency: string;
  rate: string;
  timestamp: string;
};

export type CalculationDataProps = {
  firstCurrency: string;
  secondCurrency: string;
  valueFirstCurrency: string;
  valueSecondCurrency: string;
};

export type HistoryDataProps = {
  timestamp: string;
  rate: string;
};
