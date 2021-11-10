import { ChangeEvent, FC, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { InputBlock, InputSelect, Label } from "../../../Styles/General.styles";
import { RateListProps } from "../../../Type/Type";

interface SecondCurrencyFilterTypes {
  setCurrentCurrency: Function;
  setSelectTwo: Function;
  labelText: string;
  selectOne: string;
  selectTwo: string;
}

type SecondCurrencyFilterProps = SecondCurrencyFilterTypes & SecondFilterProps;

export const SecondCurrencyFilter: FC<SecondCurrencyFilterProps> = ({
  listRates,
  setCurrentCurrency,
  labelText,
  selectOne,
  selectTwo,
  setSelectTwo
}) => {

  const currencyTwo = (value: ChangeEvent<HTMLSelectElement>) => {
    setSelectTwo(value.target.value);
    const current: any = listRates.filter((item: RateListProps) => item.currency === value.target.value);
    setCurrentCurrency(current[0].rate);
  };
  return (
    <InputBlock>
      <Label>{labelText}</Label>
      <InputSelect
        onChange={currencyTwo}
        value={selectTwo}
      >
        {listRates?.filter((item: RateListProps) => item.currency !== selectOne).map((item: { currency: string, rate: string, timestamp: string; }, index: number) => (
          <option key={index} value={item.currency}>{index === 0 ? "Please choose currency" : item.currency}</option>
        ))}
      </InputSelect>
    </InputBlock>
  );
};

const mapStateToProps = (state: any) => ({
  listRates: state.reducer.rateList,
});

const connector = connect(mapStateToProps);
type SecondFilterProps = ConnectedProps<typeof connector>;
export default connector(memo(SecondCurrencyFilter));