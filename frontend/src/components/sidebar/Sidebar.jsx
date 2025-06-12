import React from "react";
import "./Sidebar.css";
import sidebarData from "./SidebarData";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        {sidebarData.map((val, key) => {
          return <li className="sidebarEntries" id={(location.pathname === val.link) && "active"} key={key} onClick={() => {navigate(val.link)}}>
            <img id="icon" src={val.icon} alt="" />
            <div id="title">{val.title}</div>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default Sidebar;