import { NavLink } from "react-router-dom";
import { Nav } from "./Header.styles";

export const Header = () => (
  <Nav>
    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Currency Converter</NavLink>
    <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>View Conversion History</NavLink>
  </Nav>
);