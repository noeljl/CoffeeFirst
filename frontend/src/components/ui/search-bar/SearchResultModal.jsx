import React from 'react';
import { useNavigate } from 'react-router-dom';
import placeIcon from '../../../assets/svg/place.svg';
import cafeIcon from '../../../assets/svg/coffeeShop.svg';
import './SearchBar.css';

function SearchResultModal({ searchQuery, districts, cafes, onDistrictSelect, onCafeSelect }) {
    const navigate = useNavigate();
    // districts: [{ districtName: 'Altstadt' }, ...]
    // cafes: [{ cafeName, cafeSlug, cafeDistrict }]
    const filteredDistricts = districts.filter(d =>
        (d.districtName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCafes = cafes.filter(c =>
        (c.cafeName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCafeClick = (slug) => {
        navigate(`/dashboard/partners/${slug}`);
        if (onCafeSelect) onCafeSelect();
    };

    const isSearching = searchQuery.trim().length > 0;

    return (
        <div className="search-result-modal">
            {!isSearching && (
                <div className="search-result-header">
                    Suggested Munich districts
                </div>
            )}
            <ul className="search-result-list">
                {/* Always show filtered districts */}
                {filteredDistricts.map((d, idx) => (
                    <li
                        className="search-result-item"
                        key={d.districtName}
                        onClick={() => onDistrictSelect && onDistrictSelect(d.districtName)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={placeIcon}
                            className="search-result-icon"
                            alt="District"
                        />
                        <div className="search-result-name">{d.districtName}</div>
                    </li>
                ))}
                
                {/* Only show cafés if searching */}
                {isSearching && filteredCafes.map((c, idx) => (
                    <li
                        className="search-result-item"
                        key={c.cafeSlug}
                        onClick={() => handleCafeClick(c.cafeSlug)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={cafeIcon}
                            className="search-result-icon"
                            alt="Cafe"
                        />
                        <div className="search-result-text">
                            <div className="search-result-name">{c.cafeName}</div>
                            <div className="search-result-desc">{c.cafeDistrict}</div>
                        </div>
                    </li>
                ))}
                {/* Show empty state only if searching and no results */}
                {isSearching && filteredDistricts.length === 0 && filteredCafes.length === 0 && (
                    <li className="search-result-empty">No partner café found.</li>
                )}
            </ul>
        </div>
    );
}

export default SearchResultModal;