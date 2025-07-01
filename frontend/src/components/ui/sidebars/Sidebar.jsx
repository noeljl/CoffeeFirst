import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ menu }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <ul className="sidebarList">
        {menu.map((val, key) => (
          <li
            className="sidebarEntries"
            id={location.pathname === val.link ? "active" : ""}
            key={key}
            onClick={() => navigate(val.link)}
          >
            <img id="icon" src={val.icon} alt={val.title} />
            <div id="title">{val.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;