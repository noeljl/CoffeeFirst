import { useState } from "react";
import "./Navbar.css";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import BurgerMenuButton from "../burger-menu/BurgerMenu";
import Avatar from "../avatar/Avatar";
import FilterButton from "../filter/Filter";
import SearchBar from "../search-bar/SearchBar";
import CheckInButton from "../check-in/CheckIn";

import Icons from "../../assets/Icons";

// Handles both navbar types: logged in and out.
function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (<div>
        {isLoggedIn ? <SignedIn /> : <SignedOut />}
    </div>
    );
};

// Logged out navbar.
function SignedOut() {
    const navigate = useNavigate();
    return (
        <div className="navbar-container">
            <img src={Icons.logo} alt="CoffeeFirst Logo" className="logo" onClick={() => { navigate("/") }} />
            <div className="gap">
                <Button bg="white" fs="medium" radius="small" padding="small">Sign-In</Button>
                <Button bg="red" fs="medium" radius="small" padding="small" onClick={() => { navigate("/signup/regform"); }}>Sign-Up</Button>
            </div>
        </div>
    );
};

// Logged in navbar
function SignedIn() {
    const navigate = useNavigate();
    const menuState = useState(false);
    return (
        <div className="navbar-container">
            <img src={Icons.logo} alt="CoffeeFirst Logo" className="logo" onClick={() => { navigate("/") }} />

            <div className="gap">
                <SearchBar />
                <FilterButton />
            </div>
            <div className="gap">
                <CheckInButton />
                <Avatar />
                <BurgerMenuButton />
            </div>
        </div>
    );
};

export default NavBar;