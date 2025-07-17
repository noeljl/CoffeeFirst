import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../assets/Icons.js';
import './SearchBar.css';

function SearchResultModal({ searchQuery, districts, cafes, onDistrictSelect, onCafeSelect }) {
    const navigate = useNavigate();
    // districts: [{ districtName: 'Altstadt' }, ...]
    // cafes: [{ ...cafeObject }]
    const filteredDistricts = districts.filter(d =>
        (d.districtName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Updated: filter cafes by name, slug, or district
    const filteredCafes = cafes.filter(c =>
        (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.slug || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.district || '').toLowerCase().includes(searchQuery.toLowerCase())
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
                            src={Icons.place}
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
                        key={c._id}
                        onClick={() => handleCafeClick(c.slug)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={Icons.coffeeShop}
                            className="search-result-icon"
                            alt="Cafe"
                        />
                        <div className="search-result-text">
                            <div className="search-result-name">{c.name}</div>
                            <div className="search-result-desc">{c.district}</div>
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