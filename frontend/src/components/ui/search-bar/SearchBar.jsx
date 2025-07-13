
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { getAllCoffeeShops } from '../../../apis/coffeeshop'
import searchIcon from '../../../assets/svg/searchFavorite.svg'
import placeIcon from '../../../assets/svg/place.svg'
import cafeIcon from '../../../assets/svg/coffeeShop.svg'
import './SearchBar.css'

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [coffeeShops, setCoffeeShops] = useState([])
  // Track which item is selected with keyboard navigation
  const [selectedIndex, setSelectedIndex] = useState(-1)
  // Ref for the dropdown container to enable scrolling
  const dropdownRef = useRef(null)

  useEffect(() => {
    getAllCoffeeShops()
      .then(data => setCoffeeShops(data))
      .catch(err => {
        console.error('Error fetching coffee shops:', err)
        setCoffeeShops([])
      })
  }, [])

  // Filter cafes based on search query
  const suggestions = useMemo(() => {
    if (!query) return []
    return coffeeShops.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, coffeeShops])

  // Get unique districts from coffee shops
  const uniqueDistricts = useMemo(() => {
    const districts = coffeeShops.map(shop => shop.district).filter(Boolean);
    return [...new Set(districts)];
  }, [coffeeShops]);

  // Filter districts based on search query
  const matchingDistricts = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return uniqueDistricts.filter(district =>
      district.toLowerCase().includes(lowerQuery)
    );
  }, [query, uniqueDistricts]);

  // Combine districts and cafes for keyboard navigation
  const allItems = useMemo(() => {
    const districts = matchingDistricts.map(district => ({ type: 'district', name: district }));
    const cafes = suggestions.map(item => ({ type: 'cafe', name: item.name }));
    return [...districts, ...cafes];
  }, [matchingDistricts, suggestions]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  // Auto-scroll to selected item when using arrow keys
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  // Handle item selection (click or keyboard)
  const handleSelect = (item) => {
    onSelect?.(item)
    setQuery(item.name)
    setOpen(false)
    setSelectedIndex(-1) // Reset selection
  }

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!open || allItems.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Move down, wrap to top if at bottom
        setSelectedIndex(prev => 
          prev < allItems.length - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        // Move up, wrap to bottom if at top
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : allItems.length - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < allItems.length) {
          // Select highlighted item
          handleSelect(allItems[selectedIndex]);
        } else if (query.trim()) {
          // Search with current query if no item selected
          handleSelect({ name: query });
        }
        break;
      
      case 'Escape':
        // Close dropdown
        setOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="search-box">
      <div className="search-info">
        <strong>Search partner store</strong>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(!!e.target.value) // Show dropdown if there's text
          }}
          onKeyDown={handleKeyDown} // Handle keyboard navigation
          onBlur={() => setTimeout(() => setOpen(false), 100)}
        />
      </div>

      <button
        className="search-icon"
        onMouseDown={() => handleSelect({ name: query })}
      >
        <img src={searchIcon} alt="Search" />
      </button>

      {/* Show dropdown with suggestions */}
      {open && (matchingDistricts.length > 0 || suggestions.length > 0) && (
        <ul className="search-dropdown" ref={dropdownRef}>
          {/* District suggestions */}
          {matchingDistricts.map((district, index) => (
            <li 
              key={district} 
              onMouseDown={() => handleSelect({ type: 'district', name: district})}
              className={selectedIndex === index ? 'selected' : ''} // Highlight if selected
            >
              <img src={placeIcon} className="item-icon" alt="District" />
              <div className="item-text">
                <span className="name">{district}</span>
                <span className="type">District</span>
              </div>
            </li>
          ))}
          {/* Cafe suggestions */}
          {suggestions.map((item, index) => (
            <li 
              key={item._id} 
              onMouseDown={() => handleSelect({ type: 'cafe', name: item.name })}
              className={selectedIndex === (matchingDistricts.length + index) ? 'selected' : ''} // Adjust index for cafes
            >
              <img src={cafeIcon} className="item-icon" alt="Cafe" />
              <div className="item-text">
                <span className="name">{item.name}</span>
                <span className="type">{item.district || "Café"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
