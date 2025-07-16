import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBarModal from './SearchBarModal';
import { SearchContext } from '../../../contexts/SearchContext';
import './SearchBar.css';
import searchIcon from '../../../assets/svg/searchFavorite.svg';
import { useAllDistricts } from '../../../hooks/useAllDistricts';
import { useAllCafes } from '../../../hooks/useAllCafes';

function SearchBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchBarRef = useRef(null);
  const [searchBarRect, setSearchBarRect] = useState(null);
  const [districts, districtsLoading, districtsError] = useAllDistricts();
  const [cafes, cafesLoading, cafesError] = useAllCafes();
  const navigate = useNavigate();
  const { setSearchFilter } = useContext(SearchContext);

  // When modal opens, measure the search bar position for fixed overlay
  useEffect(() => {
    if (modalOpen && searchBarRef.current) {
      const rect = searchBarRef.current.getBoundingClientRect();
      setSearchBarRect(rect);
    }
  }, [modalOpen]);

  // Handler for district selection
  const handleDistrictSelect = (districtName) => {
    setSearchFilter({ type: 'district', name: districtName });
    navigate('/dashboard/partners?district=' + encodeURIComponent(districtName));
    setModalOpen(false);
  };

  const handleCafeSelect = (cafeSlug) => {
    setSearchFilter({ type: 'cafe', name: cafeSlug });
    navigate('/dashboard/partners?cafe=' + encodeURIComponent(cafeSlug));
    setModalOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: 310 }} ref={searchBarRef}>
      <div
        className="search-bar2-container"
        onClick={() => setModalOpen(true)}
        style={{ display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="gap-searchbar-text">
            <label className="search-bar2-label">Where</label>
            <input
              className="search-bar2-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for partner café"
              onFocus={() => setModalOpen(true)}
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <button
          className="search-bar2-search-btn"
          tabIndex={-1}
          style={{ marginLeft: 8 }}
        >
          <img src={searchIcon} alt="Search" style={{ width: 25, height: 25 }} />
        </button>
      </div>
      {modalOpen && searchBarRect && (
        <SearchBarModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => {
            setModalOpen(false);
            setSearchQuery(''); // Reset input when modal closes
          }}
          searchBarRect={searchBarRect}
          districts={districts}
          cafes={cafes}
          onDistrictSelect={handleDistrictSelect}
          onCafeSelect={handleCafeSelect}
        />
      )}
    </div>
  );
}

export default SearchBar;