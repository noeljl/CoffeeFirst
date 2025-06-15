import { useState } from "react";
import "./SearchBar.css";
import searchIcon from '../../assets/search-favorite.svg';

function SearchBar() {
    const [isSearchBarOpen, setSearchBarOpen] = useState(false);
    return (
        <div className="search-box">
            <div className="search-info">
                <strong>Where</strong>
                <input type="text" placeholder="Search partner store" />
            </div>
            <button className="search-icon">
                <img src={searchIcon} alt="Search" />
            </button>
        </div>

    );
};

export default SearchBar;