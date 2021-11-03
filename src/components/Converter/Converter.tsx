import { FC, useEffect, useState, memo, ChangeEvent } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getRates, swapCurrency } from "../../Actions";
import { fetchData } from "../../Services/api";

const Converter: FC<ConverterProps> = ({ swapStatus, currency }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<any>(0);
  const [selectOne, setSelectOne] = useState<any>();
  const [selectTwo, setSelectTwo] = useState<any>();

  const loadRates = async () => {
    setLoading(false);
    try {
      const allRates = await fetchData();
      console.log(loading)
      dispatch(getRates(allRates));
    } catch(err) {
      console.error(err);
    }
  }

  const moneyAmount = (currentAmount: any) => setAmount(currentAmount);
  
  const swapMoney = () => {
    dispatch(swapCurrency());
    const localFrom = selectOne;
    const localTo = selectTwo;

    setSelectOne(localTo);
    setSelectTwo(localFrom);
    console.log(selectTwo, selectOne)
  }

  useEffect(() => {
    loadRates();
  }, []);

  const currencyOne = (value: ChangeEvent<HTMLSelectElement>) => {
    setSelectOne(value.target.value)
  }

  const currencyTwo = (value: ChangeEvent<HTMLSelectElement>) => {
    setSelectTwo(value.target.value)
  }
  return (
  <div>
    Converter
    <div>
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={moneyAmount}
      />
    </div>
  
  <div>
    <label>From</label>
    <select onChange={(e) => currencyOne(e)}>
      {currency.filter((item: any) => item.currency !== selectTwo).map((item: {currency: string, rate: string, timestamp: string}, index: number) => (
        <option key={index} value={item.currency}>{index === 0 ? "Please choose currency" : item.currency}</option>
      ))}
    </select>
  </div>

  <button onClick={swapMoney}>Swap</button>

  <div>
    <label>To</label>
    <select onChange={(e) => currencyTwo(e)}>
      {currency.filter((item: any) => item.currency !== selectOne).map((item: {currency: string, rate: string, timestamp: string}, index: number) => (
        <option key={index} value={item.currency}>{index === 0 ? "Please choose currency" : item.currency}</option>
      ))}
    </select>
  </div>
  </div>)
}

const mapStateToProps = (state: any) => {
  return {
    swapStatus: state.reducer.swap,
    fromValue: state.reducer.fromValue,
    currency: state.reducer.rates
  };
};

const connector = connect(mapStateToProps);
type ConverterProps = ConnectedProps<typeof connector>;
export default connector(memo(Converter));