import { FC, memo, useCallback, useEffect, useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getHistory } from "../../Actions";
import { getExchangeHistory } from "../../Services/api";
import moment from "moment";

const ExchangeHistory: FC<ExchangeHistoryProps> = ({currentCurrency, storeHistory}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [dayValue, setDayValue] = useState<string>("");
  const [historyDays, setHistoryDays] = useState<number>(7);

  const days = moment(Date.now()).subtract(historyDays, 'd').format("YYYY-MM-DD")
  const today = moment(Date.now()).format("YYYY-MM-DD");
  
  const loadHistory = useCallback(async (currentCurrency?, today?, days?) => {
    setLoading(false);
    try {
      const recentHistory = await getExchangeHistory(currentCurrency, today, days);
      dispatch(getHistory(recentHistory));
    } catch(err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    loadHistory(currentCurrency, today, days);
  }, [loadHistory, currentCurrency, today, days]);

  const handleDurationChange = (e: any) => {
    setDayValue(e.target.value);
    setHistoryDays(e.target.value);
  };  

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
    
    {storeHistory.length && (
      <div>
        <div>
          {storeHistory.map((item: any, index: number) => (
            <div key={index}>
              {moment(item.timestamp).format("DD/MM/YYYY")}
              {Number(item.rate).toFixed(6)}
            </div>
          ))}
        </div>

        <h2>Statics</h2>
        <p>Lowest {Math.min.apply(Math, storeHistory.map((item: {rate: string }) => item.rate)).toFixed(7)}</p>
        <p>Highest {Math.max.apply(Math, storeHistory.map((item: {rate: string }) => item.rate)).toFixed(7)}</p>
        <p>Average {(sumValues / historyDays).toFixed(7)}</p>
      </div>
    )}

    </div>
  )
}

const mapStateToProps = (state: any) => {
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
