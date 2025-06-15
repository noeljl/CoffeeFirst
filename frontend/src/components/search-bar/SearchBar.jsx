import { useState } from "react";
import "./SearchBar.css";
import Icons from "../../assets/Icons";

function SearchBar() {
    const [isSearchBarOpen, setSearchBarOpen] = useState(false);
    return (
        <div className="search-box">
            <div className="search-info">
                <strong>Where</strong>
                <input type="text" placeholder="Search partner store" />
            </div>
            <button className="search-icon">
                <img src={Icons.searchFavorite} alt="Search" />
            </button>
        </div>

    );
};

export default SearchBar;