import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBarModal from './SearchBarModal';
import { SearchContext } from '../../../contexts/SearchContext';
import './SearchBar.css';
import { getAllDistricts } from '../../../apis/coffeeshop';
import { getAllCoffeeShops } from '../../../apis/coffeeshop';
import searchIcon from '../../../assets/svg/searchFavorite.svg';

function SearchBar2() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchBarRef = useRef(null);
  const [searchBarRect, setSearchBarRect] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [cafes, setCafes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchFilter } = useContext(SearchContext);

  // When modal opens, measure the search bar position for fixed overlay
  useEffect(() => {
    if (modalOpen && searchBarRef.current) {
      const rect = searchBarRef.current.getBoundingClientRect();
      setSearchBarRect(rect);
    }
  }, [modalOpen]);

  useEffect(() => {
    const getDistricts = async () => {
      try {
        const response = await getAllDistricts();
        setDistricts(response.map(districtObj => ({ districtName: districtObj._id })));
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    }
    getDistricts();
  }, []);

  useEffect(() => {
    const getCafes = async () => {
      try {
        const response = await getAllCoffeeShops();
        setCafes(response.map(cafeObj => ({ cafeSlug: cafeObj.slug, cafeName: cafeObj.name, cafeDistrict: cafeObj.district })));
      } catch (error) {
        console.error('Error fetching cafes:', error);
      }
    }
    getCafes();
  }, []);

  // Handler for district selection
  const handleDistrictSelect = (districtName) => {
    setSearchFilter({ type: 'district', name: districtName });
    if (location.pathname !== '/dashboard/partners') {
      navigate('/dashboard/partners');
    }
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
          onClose={() => setModalOpen(false)}
          searchBarRect={searchBarRect}
          districts={districts}
          cafes={cafes}
          onDistrictSelect={handleDistrictSelect}
        />
      )}
    </div>
  );
}

export default SearchBar2;