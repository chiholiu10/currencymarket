import { nanoid } from "nanoid";
import { FC, useState, memo, ChangeEvent } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getConversionHistory, getCurrency, showCalculation } from "../../Actions";
import { InputBlock, InputSelect, Label } from "../../Styles/General.styles";
import { ConversationHistoryProps, RateListProps } from "../../Type/Type";
import { CalculatedResult, CalculationBlock, CalculationCapital, CalculationSmall, ConvertBigLetter, ConvertButton, FilterBlock, Input, SwapButton, Title } from "./Converter.styles";

const Converter: FC<ConverterProps> = ({ calculation, listRates }) => {
  console.log(listRates);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);
  const [selectOne, setSelectOne] = useState<string>(localStorage.getItem('currency') || "EUR");
  const [selectTwo, setSelectTwo] = useState<string>("");
  const [currentCurrency, setCurrentCurrency] = useState<number>(0);
  const disabledSwap: boolean = selectOne.length === 0 || selectTwo.length === 0;

  const moneyAmount = (currentAmount: any) => {
    const value = currentAmount.target.value.replace(/^0+(\d)/, '$1');
    setAmount(value);
  };

  const swapMoney = () => {
    setSelectOne(selectTwo);
    setSelectTwo(selectOne);
  };

  const currencyOne = (value: ChangeEvent<HTMLSelectElement>) => {
    listRates.includes(value.target.value);
    setSelectOne(value.target.value);
  };

  const currencyTwo = (value: ChangeEvent<HTMLSelectElement>) => {
    setSelectTwo(value.target.value);
    const current: any = listRates.filter((item: RateListProps) => item.currency === value.target.value);
    setCurrentCurrency(current[0].rate);
  };

  const converterResult = () => {
    const data = {
      firstCurrency: amount + " " + selectOne,
      secondCurrency: String((amount / currentCurrency).toFixed(3)) + " " + selectTwo,
      valueFirstCurrency: 1 + " " + selectOne + " = " + Number(currentCurrency).toFixed(6) + " " + selectTwo,
      valueSecondCurrency: 1 + " " + selectTwo + " = " + String((1 / currentCurrency).toFixed(6)) + " " + selectOne
    };
    dispatch(showCalculation(data));
  };

  let data = localStorage.getItem("history");
  let historyArray: Array<any> = data ? JSON.parse(data) : [];

  const storeData = (data: ConversationHistoryProps) => {
    historyArray.push(data);
    localStorage.setItem(
      'history',
      JSON.stringify(historyArray),
    );
    dispatch(getConversionHistory(JSON.parse(localStorage.getItem("history",) || '{}')));
  };

  const storeCurrency = (recentCurrency: string) => {
    localStorage.setItem(
      'currency',
      recentCurrency
    );
  };

  const convert = () => {
    dispatch(getCurrency(selectOne));
    const history = {
      id: Number(nanoid()),
      date: Date.now(),
      amount: amount,
      from: selectOne,
      to: selectTwo
    };

    storeData(history);
    storeCurrency(selectOne);
    converterResult();
  };

  return (
    <div>
      <Title>I want to convert</Title>
      <FilterBlock>
        <InputBlock>
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={moneyAmount}
          />
        </InputBlock>

        <InputBlock>
          <Label>From</Label>
          <InputSelect
            onChange={currencyOne}
            value={selectOne}
          >
            {listRates?.filter((item: RateListProps) => item.currency !== selectTwo).map((item: { currency: string, rate: string, timestamp: string; }, index: number) => (
              <option key={index} value={item.currency}>{index === 0 ? "Please choose currency" : item.currency}</option>
            ))}
          </InputSelect>
        </InputBlock>

        <SwapButton disabled={disabledSwap} onClick={swapMoney}>Swap</SwapButton>

        <InputBlock>
          <Label>To</Label>
          <InputSelect
            onChange={currencyTwo}
            value={selectTwo}
          >
            {listRates?.filter((item: RateListProps) => item.currency !== selectOne).map((item: { currency: string, rate: string, timestamp: string; }, index: number) => (
              <option key={index} value={item.currency}>{index === 0 ? "Please choose currency" : item.currency}</option>
            ))}
          </InputSelect>
        </InputBlock>

        <ConvertButton onClick={convert} disabled={disabledSwap || !(amount > 0)}>Convert</ConvertButton>
      </FilterBlock>
      <CalculatedResult>

        {calculation.length !== 0 && (
          <CalculationBlock>
            <CalculationCapital>{calculation.firstCurrency} <span> = </span> <ConvertBigLetter>{calculation.secondCurrency}</ConvertBigLetter></CalculationCapital>
            <CalculationSmall>{calculation.valueFirstCurrency}</CalculationSmall>
            <CalculationSmall>{calculation.valueSecondCurrency}</CalculationSmall>
          </CalculationBlock>
        )}
      </CalculatedResult>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  listRates: state.reducer.rateList,
  calculation: state.reducer.calculationData || [],
});

const connector = connect(mapStateToProps);
type ConverterProps = ConnectedProps<typeof connector>;
export default connector(memo(Converter));