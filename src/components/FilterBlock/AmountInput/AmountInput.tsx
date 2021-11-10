import { FC } from "react";
import { InputBlock, Label } from "../../../Styles/General.styles";
import { Input } from "../../Converter/Converter.styles";

interface AmountInputProps {
  getNumber: any;
  amount: number;
  labelText: string;
}

export const AmountInput: FC<AmountInputProps> = ({ getNumber, amount, labelText }) => {
  return (
    <InputBlock>
      <Label>{labelText}</Label>
      <Input
        type="number"
        pattern="[0-9]*"
        value={amount}
        onChange={getNumber}
      />
    </InputBlock>
  );
};