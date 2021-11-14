import styled from "styled-components";
import theme from "../../Styles/Theme";
import { breakpoint } from "../../Styles/BreakPoint";

export const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
  ${breakpoint.md`
    font-size: 40px;
  `}
`;

export const FilterBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${breakpoint.md`
    padding: 50px 0 0;
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
  padding: 5px 0 2px;
  outline: none;
  border: none;
  font-size: 14px;
  opacity: 0.6;
  border-bottom: 2px solid ${theme.colors.grey};
  font-weight: ${theme.fontWeights.normal};
  background-color: ${theme.colors.transparent};
`;

export const ConvertSpan = styled.span``;

export const ConvertButton = styled.button`
  font-weight: bold;
  border: none;
  width: 100px;
  border-radius: 5px;
  height: 40px;
  text-align: center;
  margin-top: auto;
  background-color: ${theme.colors.green};
  color:${theme.colors.white};
  :disabled {
    opacity: 0.5;
  }
`;

export const ConvertBigLetter = styled.span`
  color: ${theme.colors.lightGreen};
  font-weight: ${theme.fontWeights.bold};
`;

export const CalculationCapital = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.4;
  padding: 50px 0 20px;
  ${breakpoint.md`
    font-size: 40px;
    line-height: 2.4;
  `}
`;

export const CalculationSmall = styled.div`
  font-size: 14px;
`;

export const SwapButton = styled.button`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.black};
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CalculatedResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CalculationBlock = styled.div`
  text-align: center;
`;