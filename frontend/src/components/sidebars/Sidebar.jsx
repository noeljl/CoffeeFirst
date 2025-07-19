import styles from "./../styles/Sidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { dashboardMenu, settingsMenu } from "./MenuData";
import { useSelector } from "react-redux";

export default function Sidebar({ type }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchFilter } = useContext(SearchContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.sidebarContainer}>
      {type === "dashboard" ? <DashboardSidebar navigate={navigate} location={location} setSearchFilter={setSearchFilter} /> : <SettingsSidebar navigate={navigate} location={location} />}
    </div>
  );
}

function DashboardSidebar({ navigate, location, setSearchFilter }) {
  const member = useSelector((state) => state.auth.member)
  // Checkout nur anzeigen, wenn ShopOwner
  const filteredMenu = member?.isShopOwner
    ? dashboardMenu
    : dashboardMenu.filter((item) => item.title !== 'Checkout')


  return (
    <>
      <h2 className={styles.sidebarTitle}>Dashboard</h2>
      <div className={styles.sidebarContent}>
        {filteredMenu.map((item) => (
          <div className={styles.sidebarEntry}
          id={location.pathname === item.link ? styles.active : ""}
          key={item.title}
          onClick={() => {
            if (item.link === "/dashboard/partners") {
              setSearchFilter(null);
            }
            navigate(item.link);
          }}>
            {item.icon}
            <div id="title">{item.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function SettingsSidebar({ navigate, location }) {
  return (
    <>
      <h2 className={styles.sidebarTitle}>Settings</h2>
      <div className={styles.sidebarContent}>
        {settingsMenu.map((item) => (
          <div className={styles.sidebarEntry} 
          id={location.pathname === item.link ? "active" : ""}
          onClick={() => navigate(item.link)}
          key={item.title}>
            {item.icon}
            <div id="title">{item.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}