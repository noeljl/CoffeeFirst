import React, { useState, useEffect, useRef } from 'react'
import Button from '../Buttons'
import styles from '../styles/SearchbarModal.module.css'
import { FiX, FiSearch } from 'react-icons/fi'
import handleGetDirection from '../../functions/handleGetDirection';
import { FaDirections, FaCoffee } from 'react-icons/fa';
import { useAllDistricts } from '../../hooks/useAllDistricts.js';
import { useAllCafes } from '../../hooks/useAllCafes.js';
import { useNavigate } from 'react-router-dom';

import { FaMapPin } from "react-icons/fa";

export default function SearchBarModal({
  onClose,
  onDistrictSelect,
  onCafeSelect,
  placeholder = 'Search for a café',
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [districts, districtsLoading, districtsError] = useAllDistricts();
  const [cafes, cafesLoading, cafesError] = useAllCafes();
  const navigate = useNavigate();

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

  // Filter logic
  const query = searchQuery.trim().toLowerCase();
  const filteredDistricts = query
    ? districts.filter(d => d.districtName.toLowerCase().includes(query))
    : districts;
  const filteredCafes = query
    ? cafes.filter(c => c.name.toLowerCase().includes(query) || c.district.toLowerCase().includes(query))
    : [];

  useEffect(() => {
    setIsSearching(!!query);
  }, [query]);

  // Handlers
  const handleDistrictClick = (districtName) => {
    navigate(`/dashboard/discover?district=${districtName}`);
    if (onDistrictSelect) onDistrictSelect(districtName);
    setSearchQuery(districtName);
    onClose();
  };
  const handleCafeClick = (cafeSlug) => {
    navigate(`/dashboard/discover/${cafeSlug}`);
    if (onCafeSelect) onCafeSelect(cafeSlug);
    setSearchQuery('');
    onClose();
  };

  return (
    <div className={styles.searchbarModalOverlay}>
      <div className={styles.searchbarModalContainer}>
        <div className={styles.searchbarModalHeader}>
          <h2 className={styles.searchbarModalTitle}>Find your next café</h2>
          <Button bg="black" fs="small" radius="full" padding="medium" icon={<FiX size={20} color="#fff" />} width="circle" onClick={onClose} />
        </div>
        <div className={styles.searchbarModalInputContainer}>
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className={styles.searchbarModalInput}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <FiSearch size={25} color="#222" />
        </div>
        <div className={styles.searchbarModalResults}>
          {!isSearching && (
            <p className={styles.searchbarModalResultsHeader}>
              Suggested Munich districts
            </p>
          )}
          <div className={styles.searchbarModalResultsList}>
            {/* Always show filtered districts */}
            {filteredDistricts.map((d, idx) => (
              <div
                className={styles.searchbarModalResultsEntry}
                key={d.districtName}
                onClick={() => handleDistrictClick(d.districtName)}
                style={{ cursor: 'pointer' }}
              >
                <FaMapPin size={30} color="#222" />
                <div className={styles.searchbarModalResultsName}>{d.districtName}</div>
              </div>
            ))}
            {/* Only show cafés if searching */}
            {isSearching && filteredCafes.map((c, idx) => (
              <div
                className={styles.searchbarModalResultsEntry}
                key={c._id}
                onClick={() => handleCafeClick(c.slug)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.searchbarModalResultsColLeft}>
                  <FaCoffee size={30} color="#222" />
                  <div className={styles.searchbarModalResultsText}>
                    <div className={styles.searchbarModalResultsName}>{c.name}</div>
                    <div className={styles.searchbarModalResultsDesc}>{c.district}</div>
                  </div>
                </div>

                <FaDirections size={30} color="#222" onClick={e => { e.stopPropagation(); handleGetDirection(c.coords); }} />

              </div>
            ))}
            {/* Show empty state only if searching and no results */}
            {isSearching && filteredDistricts.length === 0 && filteredCafes.length === 0 && (
              <li className={styles.searchbarModalResultsEmpty}>No partner café found.</li>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}