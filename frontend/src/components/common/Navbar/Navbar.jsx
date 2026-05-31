import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="brand">CeylonCoco</div>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/shop">Shop</NavLink>
      </div>
      {token ? (
        <button className="cta-button" type="button" onClick={logout}>
          Logout
        </button>
      ) : (
        <NavLink className="cta-button" to="/login">
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
