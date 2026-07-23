import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentuserContext";

function Header({
  handleAddClick,
  weatherData,
  openRegistrationModal,
  openLoginModal,
  handleLogout,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={headerLogo} alt="WTWR logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      {isLoggedIn ? (
        <button
          className="header__button"
          type="button"
          onClick={handleAddClick}
        >
          + Add Clothes
        </button>
      ) : null}
      {isLoggedIn ? (
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">Dillon Rose</p>
            <img src={avatar} alt="User avatar" className="header__avatar" />
          </div>
        </NavLink>
      ) : null}
      {!isLoggedIn ? (
        <button
          className="header__button"
          type="button"
          onClick={openRegistrationModal}
        >
          Sign Up
        </button>
      ) : null}
      {!isLoggedIn ? (
        <button
          className="header__button"
          type="button"
          onClick={openLoginModal}
        >
          Log In
        </button>
      ) : null}
    </header>
  );
}

export default Header;
