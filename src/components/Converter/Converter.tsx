import { nanoid } from "nanoid";
import { FC, useState, memo, ChangeEvent, useEffect } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getCurrency } from "../../Actions";
import { PageProps } from "../Page";

type ConvertAllProps = ConverterProps & PageProps;

const Converter: FC<ConvertAllProps> = ({ listRates }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<any>(0);
  const [selectOne, setSelectOne] = useState<string>("EUR");
  const [selectTwo, setSelectTwo] = useState<string>("US");
  const [firstCurrency, setFirstCurrency] = useState<number>(1);
  // const [secondCurrency, setSecondCurrency] = useState<number>(1);
  let historyArray: Array<any> = [];

  useEffect(() => {

  }, [selectOne, selectTwo])

  const moneyAmount = (currentAmount: any) => {
    setAmount(currentAmount.target.value); 
    console.log(currentAmount * firstCurrency); 
  }
  
  const swapMoney = () => {
    setSelectOne(selectTwo);
    setSelectTwo(selectOne);
  }

  const currencyOne = (value: ChangeEvent<HTMLSelectElement>) => {
    dispatch(getCurrency(value.target.value));
    listRates.includes(value.target.value);
    const current = listRates.filter((element: any) => element.currency === value.target.value);
    setSelectOne(value.target.value);
  }

  const currencyTwo = (value: ChangeEvent<HTMLSelectElement>) => {
    setSelectTwo(value.target.value);
    const current = listRates.filter((element: any) => element.currency === value.target.value);
    console.log(current)
  }

  const convert = () => {
    const history = {
      id: nanoid(),
      date: Date.now(),
      amount: amount,
      from: selectOne,
      to: selectTwo
    }

    historyArray.push(history);
    localStorage.setItem(
      'history',
        JSON.stringify(historyArray)
    );
  }

  console.log(selectOne.length > 0 )

  return (
  <div>
    Converter
    <div>
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => moneyAmount(e)}
      />
    </div>
  
  <div>
    <label>From</label>
    <select 
      onChange={(e) => currencyOne(e)}
      value={selectOne}
    >
      {listRates?.filter((item: any) => item.currency !== selectTwo).map((item: {currency: string, rate: string, timestamp: string}, index: number) => (
        <option key={index} value={item.currency}>{index === 0 ? "Please choose currency" : item.currency}</option>
      ))}
    </select>
  </div>

  <button disabled={selectOne.length === 0 && selectTwo.length === 0} onClick={swapMoney}>Swap</button>

  <div>
    <label>To</label>
    <select 
      onChange={(e) => currencyTwo(e)}
      value={selectTwo}
    >
      {listRates?.filter((item: any) => item.currency !== selectOne).map((item: {currency: string, rate: string, timestamp: string}, index: number) => (
        <option key={index} value={item.currency}>{index === 0 ? "Please choose currency" : item.currency}</option>
      ))}
    </select>
  </div>

  <button onClick={convert}>Convert</button>

  {amount}
  </div>)
}

const mapStateToProps = (state: any) => {
  return {
    fromValue: state.reducer.fromValue,
    storeHistory: state.reducer.historyData
  };
};

const connector = connect(mapStateToProps);
type ConverterProps = ConnectedProps<typeof connector>;
export default connector(memo(Converter));