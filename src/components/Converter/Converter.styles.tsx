import styled from "styled-components";
import theme from "../../Styles/Theme";
import { breakpoint } from "../../Styles/BreakPoint";

export const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
`;

export const FilterBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${breakpoint.md`
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const Input = styled.input`
  [type=number] {
    padding: 10px;
  } 
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  padding: 10px 0;
  outline: none;
  border: none;
  border-bottom: 2px solid ${theme.colors.lightgrey};
`;

export const ConvertButton = styled.button`
  background-color: ${theme.colors.green};
  color:${theme.colors.white};
  font-weight: bold;
  border: none;
  width: 100px;
  border-radius: 5px;
  height: 40px;
  :disabled {
    opacity: 0.5;
  }
`;

export const ConvertBigLetter = styled.span`
  color: ${theme.colors.lightGreen};
  font-weight: ${theme.fontWeights.bold};
`;

export const CalculationCapital = styled.div`
  font-size: 34px;
`;

export const CalculationSmall = styled.div`
  font-size: 18px;
`;

export const SwapButton = styled.button`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.black};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CalculatedResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CalculationBlock = styled.div``;