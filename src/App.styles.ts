import styled from "styled-components";
import { breakpoint } from "./Styles/BreakPoint";

export const Wrapper = styled.div`
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  ${breakpoint.md`
    padding-top: 50px;
  `}
`;