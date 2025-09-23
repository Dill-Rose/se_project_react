import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="WTWR logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      <button className="header__button" type="button" onClick={handleAddClick}>
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Dillon Rose</p>
        <img src={avatar} alt="gvatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
