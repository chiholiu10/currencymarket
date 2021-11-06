import { FC, memo, useCallback, useEffect, useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getHistory } from "../../Actions";
import { getExchangeHistory } from "../../Services/api";
import moment from "moment";

const ExchangeHistory: FC<ExchangeHistoryProps> = ({currentCurrency, storeHistory}) => {
  console.log(currentCurrency);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [dayValue, setDayValue] = useState<string>("");
  const [historyDays, setHistoryDays] = useState<number>(7);
  const [exchangeRate, setExchangeRate] = useState<any>([]);

  const days = moment(Date.now()).subtract(historyDays, 'd').format("YYYY-MM-DD")
  const today = moment(Date.now()).format("YYYY-MM-DD");
  
  const loadHistory = useCallback(async (currentCurrency?, today?, days?) => {
    setLoading(false);
    try {
      const recentHistory = await getExchangeHistory(currentCurrency, today, days);
      console.log(recentHistory)
      dispatch(getHistory(recentHistory));
    } catch(err) {
      console.error(err);
    }
  }, [dispatch, currentCurrency, loading]);

  useEffect(() => {
    loadHistory(currentCurrency, today, days);
  }, [loadHistory, currentCurrency, today, days]);

  const handleDurationChange = (e: any) => {
    setDayValue(e.target.value);
    setHistoryDays(e.target.value);
  };  
 
  const allRates: any = {};
  console.log(allRates)

  console.log();

  // Object.keys(storeHistory).reduce((key) => {
  //   setExchangeRate([...exchangeRate, storeHistory[key].rate]);
  // }) 

  const sumValues = storeHistory.reduce((accumulator: string, currentValue: {rate: string}) => {
    return Number(accumulator) + Number(currentValue.rate)
  }, 0)

  return (
    <div>
    <select
      value={dayValue}
      onChange={(e) => handleDurationChange(e)}
      >
      <option value="7">7 days</option>
      <option value="14">14 days</option>
      <option value="30">30 days</option>
    </select>

    <h2>Statics</h2>
    <p>Lowest{Math.min.apply(Math, storeHistory.map((item: {rate: string }) => item.rate))}</p>
    <p>Highest {Math.max.apply(Math, storeHistory.map((item: {rate: string }) => item.rate))}</p>
    <p>Average {sumValues / historyDays}</p>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  console.log(state)
  return {
    fromValue: state.reducer.fromValue,
    currency: state.reducer.rates,
    currentCurrency: state.reducer.currency || "EU",
    storeHistory: state.reducer.historyData || []
  };
};

const connector = connect(mapStateToProps);
type ExchangeHistoryProps = ConnectedProps<typeof connector>;
export default connector(memo(ExchangeHistory));
