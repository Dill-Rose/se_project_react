import avatar from "../../assets/avatar.png";
import "./Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatar} alt="avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Dillon Rose</p>
      </div>
    </div>
  );
}

export default SideBar;
