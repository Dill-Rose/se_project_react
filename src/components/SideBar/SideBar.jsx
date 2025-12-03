import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatar} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Dillon Rose</p>
      </div>
    </div>
  );
}

export default SideBar;
