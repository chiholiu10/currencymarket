import styled from "styled-components";
import { breakpoint } from "../../Styles/BreakPoint";
import theme from "../../Styles/Theme";

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
    padding: 10px;
    font-size: 12px;
    ${breakpoint.md`
      font-size: 16px;
    `}
    &.active {
      border-bottom: 2px solid ${theme.colors.green};
    }
  }
`;