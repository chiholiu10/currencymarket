import { FC } from "react";
import { SwapButton } from "../../Converter/Converter.styles";

interface SwapButtonprops {
  setSelectOne: Function;
  setSelectTwo: Function;
  selectTwo: string;
  selectOne: string;
}

export const SwapButtonComponent: FC<SwapButtonprops> = ({ setSelectOne, setSelectTwo, selectTwo, selectOne }) => {
  const swapMoney = () => {
    setSelectOne(selectTwo);
    setSelectTwo(selectOne);
  };

  return (
    <SwapButton onClick={swapMoney}>
      Swap
    </SwapButton>
  );
};