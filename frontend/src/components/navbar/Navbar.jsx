import React from "react";
import "./Navbar.css";
import logo from '../../assets/Logo.svg';
import searchIcon from '../../assets/search-favorite.svg';
import filterIcon from '../../assets/setting-4.svg';
import checkInIcon from '../../assets/scan-barcode.svg';
import menuIcon from '../../assets/menu.svg';
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";



function NavbarSignedOut() {
    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <img src={logo} alt="CoffeeFirst Logo" className="logo" onClick={() => {navigate("/")}}/>
            <div className="button-group">
                <Button bg="white" fs="medium" radius="small" padding="small">Sign-In</Button>
                <Button bg="red" fs="medium" radius="small" padding="small" onClick={() => {navigate("/signup/regform");}}>Sign-Up</Button>
            </div>
        </div>
    );
};

function NavbarSignedIn() {
    const navigate = useNavigate();
    return (
        <div className="navbar-container signed-in">
            <img src={logo} alt="CoffeeFirst Logo" className="logo" onClick={() => {navigate("/")}}/>
            <div className="navbar-search-section">
                <div className="search-box">
                    <div className="search-info">
                        <strong>Where</strong>
                        <input type="text" placeholder="Search partner store" />
                    </div>
                    <button className="search-icon">
                        <img src={searchIcon} alt="Search" />
                    </button>
                </div>
                <Button bg="white" fs="small" radius="full" icon={filterIcon} padding="medium" fw="bold">Filter</Button>
            </div>
            <div className="navbar-right-section">
                <Button bg="red" fs="small" radius="full" icon={checkInIcon} padding="medium" fw="bold">Check-in</Button>
                <img className="user-avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <button className="menu-button">
                    <img src={menuIcon} alt="Menu" />
                </button>
            </div>
        </div>
    );
};

export default NavbarSignedOut;
export { NavbarSignedIn };