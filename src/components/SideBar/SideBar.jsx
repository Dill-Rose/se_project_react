import avatar from "../../assets/avatar.png";
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onSignOut, openEditProfileModal }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <div className="sidebar__user-info">
          <img
            src={currentUser.avatar}
            alt="User avatar"
            className="sidebar__avatar"
          />
          <p className="sidebar__username">{currentUser.name}</p>
        </div>
        <button
          className="sidebar__edit-profile"
          onClick={openEditProfileModal}
        >
          Change profile data
        </button>
        <button className="sidebar__log-out" onClick={onSignOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
