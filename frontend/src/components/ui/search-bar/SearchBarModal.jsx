import React, { useRef, useEffect } from 'react';
import SearchResultModal from './SearchResultModal';
import './SearchBar.css';
import searchIcon from '../../../assets/svg/searchFavorite.svg';

function SearchBarModal({ searchQuery, setSearchQuery, onClose, searchBarRect, districts, cafes, onDistrictSelect }) {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Autofocus input when modal opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handler for district selection
  const handleDistrictSelect = (districtName) => {
    if (onDistrictSelect) onDistrictSelect(districtName);
    onClose();
  };

  return (
    <>
      {/* Black transparent overlay */}
      <div
        className="searchbar-modal-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1999,
        }}
        onClick={onClose}
      />
      {/* Foreground search bar and result modal */}
      <div
        className="searchbar-modal-wrapper"
        style={{
          position: 'fixed',
          top: searchBarRect.top,
          left: searchBarRect.left,
          width: searchBarRect.width,
          zIndex: 2000,
        }}
        ref={wrapperRef}
      >
        <div className="search-bar2-container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label className="search-bar2-label">Where</label>
            <input
              className="search-bar2-input"
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for partner café"
              style={{ width: '100%' }}
            />
          </div>
          <button
            className="search-bar2-search-btn"
            tabIndex={-1}
            style={{ marginLeft: 8 }}
          >
            <img src={searchIcon} alt="Search" style={{ width: 25, height: 25 }} />
          </button>
        </div>
        <SearchResultModal
          searchQuery={searchQuery}
          districts={districts}
          onDistrictSelect={handleDistrictSelect}
          cafes={cafes}
          onCafeSelect={onClose}
        />
      </div>
    </>
  );
}

export default SearchBarModal;