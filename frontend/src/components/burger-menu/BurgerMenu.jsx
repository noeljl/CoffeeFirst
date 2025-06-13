import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BurgerMenu.css";
import sidebarData from "../sidebar/SidebarData"; // reuse the same icons
import menuIcon from '../../assets/menu.svg';

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
  return (
    <div className="burger-menu">
      <ul>
        {sidebarData.map((item, index) => (
          <li key={index} onClick={() => { navigate(item.link); onClose(); }}>
            <img src={item.icon} alt={item.title} />
            <span>{item.title}</span>
          </li>
        ))}

        <li onClick={() => navigate("/account")}>
          <img src="/assets/menu/account.svg" alt="Account" />
          <span>Account settings</span>
        </li>

        <li onClick={() => navigate("/logout")}>
          <img src="/assets/menu/logout.svg" alt="Logout" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default BurgerMenuButton;