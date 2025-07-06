/* import { useState } from "react";
import "./SearchBar.css";
import Icons from "../../../assets/Icons";

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

export default SearchBar; */
import React, { useState, useMemo, useEffect } from 'react'
import { getAllCoffeeShops } from '../../../apis/coffeeshop'
import searchIcon from '../../../assets/svg/searchFavorite.svg'
import placeIcon from '../../../assets/svg/place.svg'
import cafeIcon from '../../../assets/svg/coffeeShop.svg'
import './SearchBar.css'

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [coffeeShops, setCoffeeShops] = useState([])

  useEffect(() => {
    getAllCoffeeShops()
      .then(data => setCoffeeShops(data))
      .catch(err => {
        console.error('Error fetching coffee shops:', err)
        setCoffeeShops([])
      })
  }, [])

  // memoized filter
  const suggestions = useMemo(() => {
    if (!query) return []
    return coffeeShops.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, coffeeShops])

  // handler for both click-on-icon and selecting an item
  const handleSelect = (item) => {
    onSelect?.(item)
    setQuery(item.name)
    setOpen(false)
  }

  return (
    <div className="search-box">
      <div className="search-info">
        <strong>Search partner store</strong>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(!!e.target.value)
          }}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
        />
      </div>

      <button
        className="search-icon"
        onMouseDown={() => handleSelect({ name: query })}
      >
        <img src={searchIcon} alt="Search" />
      </button>

      {open && suggestions.length > 0 && (
        <ul className="search-dropdown">
          {suggestions.map((item) => (
            <li key={item._id} onMouseDown={() => handleSelect(item)}>
              <img
                src={cafeIcon}
                className="item-icon"
                alt="Cafe"
              />
              <div className="item-text">
                <span className="name">{item.name}</span>
                <span className="type">Café</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
