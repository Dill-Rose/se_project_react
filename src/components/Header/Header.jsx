import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="avatar" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button className="header__button" type="button" onClick={handleAddClick}>
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Dillon Rose</p>
        <img src={avatar} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
