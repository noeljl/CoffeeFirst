import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CafeGallery from '../components/cafes/CafeGallery';
import CafeGroupGallery from '../components/cafes/CafeGroupGallery';
import { useAllCafesGroupedByDistricts } from '../hooks/useAllCafesGroupedByDistricts';
import styles from './styles/DiscoverViews.module.css'
import Button from '../components/Buttons.jsx'

export default function DiscoverView() {
  // Default: show all districts grouped
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedDistrict = params.get('district');
  const { groups, loading, error } = useAllCafesGroupedByDistricts();

  // if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  if (selectedDistrict) {
    const group = groups.find(g => g._id === selectedDistrict);
    if (!group) return <div>No cafes found for {selectedDistrict}</div>;
    return (
      <div style={{ width: '100%'}}>
        <CafeGallery coffeeShops={group.coffeeShops} titleText={selectedDistrict} backButtonVisible={true} />
      </div>
    );
  }
  return <CafeGroupGallery />;
}

/* ============================== */
/* Filtered Cafes View */
/* ============================== */
// Displays a list of cafés that match the filters

export function FilteredCafesView({ cafes, filters }) {
    const [filtersAsText, setFiltersAsText] = useState("No filters applied")
    const [titleText, setTitleText] = useState("No cafés found matching your filters")
    const location = useLocation()
    const navigate = useNavigate()
    // Use cafes prop if provided, otherwise fallback to location.state
    const filteredCafes = cafes || (location.state && location.state.filteredShops) || []

    useEffect(() => {
        setTitleText(`${filteredCafes.length} matching cafés found`)
    }, [filteredCafes])

    useEffect(() => {
        const filterString = filters
            ? [
                ...(filters.offers || []),
                ...(filters.coffeeVariants || []),
                ...(filters.sustainability || [])
            ].join(", ") || "No filters applied"
            : "No filters applied";
        setFiltersAsText(filterString)
    }, [filters])

    return (
        <div className={styles.filterResultContainer}>
            <div className={styles.filterResultHeader}>
                <div className={styles.textContainer}>
                    <div className={styles.title}>{titleText}</div>
                    <div className={styles.filterSettings}>Your filter settings are: {filtersAsText}</div>
                </div>
                <Button bg="white" fs="medium" radius="small" padding="small" fw="bold" onClick={() => {
                    navigate('/dashboard/discover', { state: { filters: null, filteredShops: null } })
                }}>
                    Clear filters
                </Button>
            </div>
            {/* Use CafeGallery to display the filtered cafes */}
            <CafeGallery coffeeShops={filteredCafes} titleText={null} />
        </div>
    )
}
