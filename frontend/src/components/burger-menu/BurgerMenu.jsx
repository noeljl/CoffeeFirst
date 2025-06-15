import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BurgerMenu.css";
import menuData, { accountData } from "../sidebar/MenuData"; // reuse the same icons
import menuIcon from '../../assets/menu.svg';
import settingsIcon from '../../assets/setting.svg';
import logoutIcon from '../../assets/logout.svg';

/* The burger menu icon as a button. It triggers the open/close movement of the actual menu */
function BurgerMenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img src={menuIcon} alt="Menu" />
      </button>
      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
};

/* The menu which gets triggered by the button */
function Menu({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="burger-menu">
      <ul>
        <div className="border">
          {menuData.map((val, key) => (
            <li key={key} className="entries" id={(location.pathname === val.link) && "active"} onClick={() => { navigate(val.link); onClose(); }}>
              <div id="icon">
                <img src={val.icon} alt={val.title} />
              </div>
              <div id="title">
                <span>{val.title}</span>
              </div>
            </li>
          ))}
        </div>
        <li className="entries" id={(location.pathname === "/account-settings") && "active"} onClick={() => { navigate("/account-settings"); onClose(); }}>
          <div id="icon">
            <img src={settingsIcon} alt="Account" />
          </div>
          <div id="title">
            <span>Account settings</span>
          </div>
        </li>

        <li className="entries" id={(location.pathname === "/logout") && "active"} onClick={() => { navigate("/logout"); onClose(); }}>
          <div id="icon">
            <img src={logoutIcon} alt="Logout" />
          </div>
          <div id="title">
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default BurgerMenuButton;