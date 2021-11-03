import styled from "styled-components";
import { breakpoint } from "./BreakPoint";
import theme from "./Theme";

export const Input = styled.input`  
  width: 180px;
  border: none;
  border-radius: 10px;
  height: 30px;
  padding: 0 10px;
  border: 1px solid ${theme.colors.grey};
  ${breakpoint.md`
      width: 200px;
  `}
  &:focus {
    outline: none;
    border: 1px solid ${theme.colors.blue};
  }
`;

export const Error = styled.div`
  padding: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  height: 20px;
  position: absolute;
  color: ${theme.colors.red};
  ${breakpoint.sm`
    position: relative;
    padding: 0 0 0 20px;
    align-items: center;
    justify-content: center;
  `}
`;

export const FieldBlock = styled.div`
  display: block;
  padding: 10px 0 30px 0;
  ${breakpoint.sm`
    padding: 10px 0;
    display: inline-flex;
  `}
`;
