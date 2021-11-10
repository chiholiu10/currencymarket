import { ChangeEvent, FC, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { InputBlock, InputSelect, Label } from "../../../Styles/General.styles";
import { RateListProps } from "../../../Type/Type";

interface FirstCurrencyFilterTypes {
  setSelectOne: Function;
  labelText: string;
  selectOne: string;
  selectTwo: string;
}

type FirstCurrencyFilterProps = FirstCurrencyFilterTypes & FirstFilterProps;

export const FirstCurrencyFilter: FC<FirstCurrencyFilterProps> = ({
  listRates,
  labelText,
  setSelectOne,
  selectOne,
  selectTwo
}) => {
  const currencyOne = (value: ChangeEvent<HTMLSelectElement>) => {
    listRates.includes(value.target.value);
    setSelectOne(value.target.value);
  };

  return (
    <InputBlock>
      <Label>{labelText}</Label>
      <InputSelect
        onChange={currencyOne}
        value={selectOne}
      >
        {listRates?.filter((item: RateListProps) => item.currency !== selectTwo).map((item: { currency: string, rate: string, timestamp: string; }, index: number) => (
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
type FirstFilterProps = ConnectedProps<typeof connector>;
export default connector(memo(FirstCurrencyFilter));