import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  // colors
  colors: {
    white: "#fff",
    black: "#757575",
    grey: "#212121",
    blue: "#0096FF",
    red: "#FF0000"
  },
  // typography
  fontWeights: {
    regular: 300,
    normal: 400,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Roboto", sans-serif'
  },
  breakpoints: [200, 640, 768, 1024, 1440]
};

// alias for breakpoints
theme.breakpoints.xs = `${theme.breakpoints[0]}px`;
theme.breakpoints.sm = `${theme.breakpoints[1]}px`;
theme.breakpoints.md = `${theme.breakpoints[2]}px`;
theme.breakpoints.lg = `${theme.breakpoints[3]}px`;
theme.breakpoints.xl = `${theme.breakpoints[4]}px`;

export default theme;