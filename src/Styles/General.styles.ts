import styled from "styled-components";
import { breakpoint } from "./BreakPoint";
import theme from "./Theme";

export const Table = styled.table`
  border: 1px solid black;
  width: 100%;
`;

export const Tr = styled.tr`
  padding: 0;
`;

export const Th = styled.th`
  border-bottom: 1px solid ${theme.colors.black};
  padding: 10px;
  width: 200px;
  text-align: left;
`;

export const Td = styled.td`
  border-bottom: 1px solid ${theme.colors.black};
  padding: 10px;
  height: 50px;
`;

export const TableColumns = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint.md`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const Theader = styled.thead``;
export const Tbody = styled.tbody``;

export const TableBlock = styled.div`
  width: 100%;
  ${breakpoint.md`
    width: 50%;
  `}
`;

export const Label = styled.label`
  font-size: 14px;
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;
export const InputSelect = styled.select`
   -o-appearance: none;
   -ms-appearance: none;
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
  padding: 10px 0;
  outline: none;
  border: none;
  min-width: 200px;
  border-bottom: 2px solid ${theme.colors.lightgrey};
  margin-bottom: 50px;
`;