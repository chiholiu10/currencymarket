import { Link } from "react-router-dom";
import { Nav } from "./Header.styles";

export const Header = () => {
  return (
    <Nav>
      <Link to="/">Currency Converter</Link>
      <Link to="/history">View Conversion History</Link>
    </Nav>
  );
};