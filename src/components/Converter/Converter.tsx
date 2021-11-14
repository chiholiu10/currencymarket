import { nanoid } from "nanoid";
import { FC, useState, memo } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getConversionHistory, getCurrency, showCalculation } from "../../Actions";
import { InnerComponent, MainComponent } from "../../Styles/General.styles";
import { ConversationHistoryProps } from "../../Type/Type";
import { AmountInput } from "../FilterBlock/AmountInput/AmountInput";
import { ConverterButton } from "../FilterBlock/ConverterButton/ConverterButton";
import FirstCurrencyFilter from "../FilterBlock/FirstCurrencyFilter/FirstCurrencyFilter";
import SecondCurrencyFilter from "../FilterBlock/SecondCurrencyFilter/SecondCurrencyFilter";
import { SwapButtonComponent } from "../FilterBlock/SwapButton/SwapButton";
import { CalculatedResult, CalculationBlock, CalculationCapital, CalculationSmall, ConvertBigLetter, ConvertSpan, FilterBlock, Title } from "./Converter.styles";

const Converter: FC<ConverterProps> = ({ calculation }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);
  const [selectOne, setSelectOne] = useState<string>(localStorage.getItem('currency') || "EUR");
  const [selectTwo, setSelectTwo] = useState<string>("");
  const [currentCurrency, setCurrentCurrency] = useState<number>(0);
  const disabledSwap: boolean = selectOne.length === 0 || selectTwo.length === 0;

  const moneyAmount = (currentAmount: any) => {
    const value = currentAmount.target.value.replace(/^0+(\d)$/, '$1');
    setAmount(value);
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
    <MainComponent>
      <InnerComponent>
        <Title>I want to convert</Title>
        <FilterBlock>
          <AmountInput
            labelText="Amount"
            amount={amount}
            getNumber={moneyAmount}
          />

          <FirstCurrencyFilter
            labelText="from"
            selectOne={selectOne}
            selectTwo={selectTwo}
            setSelectOne={setSelectOne}
          />

          <SwapButtonComponent
            selectOne={selectOne}
            selectTwo={selectTwo}
            setSelectOne={setSelectOne}
            setSelectTwo={setSelectTwo}
          />

          <SecondCurrencyFilter
            labelText="to"
            selectOne={selectOne}
            selectTwo={selectTwo}
            setSelectTwo={setSelectTwo}
            setCurrentCurrency={setCurrentCurrency}
          />

          <ConverterButton
            clickFromChild={convert}
            disabledSwap={disabledSwap}
            amount={amount}
          />

        </FilterBlock>
        <CalculatedResult>

          {calculation.length !== 0 && (
            <CalculationBlock>
              <CalculationCapital>{calculation.firstCurrency} <ConvertSpan> = </ConvertSpan> <ConvertBigLetter>{calculation.secondCurrency}</ConvertBigLetter></CalculationCapital>
              <CalculationSmall>{calculation.valueFirstCurrency}</CalculationSmall>
              <CalculationSmall>{calculation.valueSecondCurrency}</CalculationSmall>
            </CalculationBlock>
          )}
        </CalculatedResult>
      </InnerComponent>
    </MainComponent>
  );
};

const mapStateToProps = (state: any) => ({
  calculation: state.reducer.calculationData || [],
});

const connector = connect(mapStateToProps);
type ConverterProps = ConnectedProps<typeof connector>;
export default connector(memo(Converter));
