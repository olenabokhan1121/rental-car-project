
import { NavLink } from "react-router-dom";
import css from "./Header.module.css";


const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        
    <NavLink to="/">
Rental<span className={css.span}>Car</span>
    </NavLink> </div>

        
          <nav className={css.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          Home
        </NavLink>

        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;