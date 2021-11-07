import { nanoid } from "nanoid";
import { FC, useState, memo, ChangeEvent } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getCurrency, showCalculation } from "../../Actions";
import { PageProps } from "../Page";

type ConvertAllProps = ConverterProps & PageProps;

const Converter: FC<ConvertAllProps> = ({ calculation, listRates }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<any>(0);
  const [selectOne, setSelectOne] = useState<string>( localStorage.getItem('currency') || "EUR");
  const [selectTwo, setSelectTwo] = useState<string>("");
  const [currentCurrency, setCurrentCurrency] = useState<number>(0);
  let historyArray: Array<any> = [];
  console.log(historyArray)
  const moneyAmount = (currentAmount: any) => setAmount(currentAmount.target.value);
  
  const swapMoney = () => {
    setSelectOne(selectTwo);
    setSelectTwo(selectOne);
  }

  const currencyOne = (value: ChangeEvent<HTMLSelectElement>) => {
    listRates.includes(value.target.value);
    setSelectOne(value.target.value);
  }

  const currencyTwo = (value: ChangeEvent<HTMLSelectElement>) => {
    setSelectTwo(value.target.value);
    const current: any = listRates.filter((element: any) => element.currency === value.target.value);
    setCurrentCurrency(current[0].rate);
  }

  const converterResult = ( ) => {
    const data = {
      firstCurrency: amount + " " + selectOne,
      secondCurrency: String((amount / currentCurrency).toFixed(3)) + " " +  selectTwo,
      valueFirstCurrency: 1 + " " + selectOne + " = " + Number(currentCurrency).toFixed(6) + " " + selectTwo,
      valueSecondCurrency: 1 + " " + selectTwo + " = " + String((1 / currentCurrency).toFixed(6)) + " " + selectOne
    }
    dispatch(showCalculation(data));
  }

  const convert = () => {
    dispatch(getCurrency(selectOne));
    const history = {
      id: nanoid(),
      date: Date.now(),
      amount: amount,
      from: selectOne,
      to: selectTwo
    }

    historyArray.push(history);
    console.log(historyArray)
    localStorage.setItem(
      'history',
        JSON.stringify(historyArray),
    );

    localStorage.setItem(
      'currency',
        selectOne
    );
    converterResult();
  }

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
  
  <div>
    {calculation.length !== 0 && (
      <>
        <div>{calculation.firstCurrency} <span> = </span> {calculation.secondCurrency}</div>
        <div>{calculation.valueFirstCurrency}</div>
        <div>{calculation.valueSecondCurrency}</div>
      </>
    )}

  </div>
  </div>)
}

const mapStateToProps = (state: any) => {
  console.log(state.reducer.calculationData)
  return {
    fromValue: state.reducer.fromValue,
    storeHistory: state.reducer.historyData,
    calculation: state.reducer.calculationData
  };
};

const connector = connect(mapStateToProps);
type ConverterProps = ConnectedProps<typeof connector>;
export default connector(memo(Converter));