import { FC } from "react";
import { ConvertButton } from "../../Converter/Converter.styles";

interface ConverterButtonprops {
  clickFromChild: () => void;
  disabledSwap: boolean;
  amount: number;
}

export const ConverterButton: FC<ConverterButtonprops> = ({ clickFromChild, disabledSwap, amount }) => {
  return (
    <ConvertButton onClick={clickFromChild} disabled={disabledSwap || !(amount > 0)}>
      Convert
    </ConvertButton>
  );
};