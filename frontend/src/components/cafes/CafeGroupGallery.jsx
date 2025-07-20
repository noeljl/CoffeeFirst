
import React from "react";
import styles from '../styles/CafeGallery.module.css';
import CafeGallery from "./CafeGallery";
import { useAllCafesGroupedByDistricts } from "../../hooks/useAllCafesGroupedByDistricts";
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

// CafeGroupGallery component
// Displays all cafés grouped by district (from useAllCafesGroupedByDistricts hook)
// Props:
// - None
// Returns:
// - Array of district groups, each containing cafés (from CafeGallery component)
// - Loading state
// - Error state
// - A message if the districts are not found
function CafeGroupGallery() {
  const { groups, loading, error } = useAllCafesGroupedByDistricts();
  const navigate = useNavigate();

  const handleViewAll = (districtName) => {
    navigate(`/dashboard/discover?district=${encodeURIComponent(districtName)}`);
  };

  if (loading) return <div>Loading districts…</div>;
  if (error) return <div>Error loading districts: {error.toString()}</div>;

  return (
    <div className={styles.cafeGroupGalleryContainer}>
      {groups.map((districtGroup) => (
        <div
          key={districtGroup._id}
        >
          <div className={styles.cafeGalleryHeader}>
            <div className={styles.cafeGalleryTitleContainer} onClick={() => handleViewAll(districtGroup._id)}>
              <h2 className={styles.cafeGalleryTitle} style={{cursor: 'pointer'}}>
                {districtGroup._id}
              </h2>
              <FaChevronRight className={styles.cafeGalleryTitleIcon} style={{cursor: 'pointer'}}/>
            </div>
          </div>
          <CafeGallery coffeeShops={districtGroup.coffeeShops} layoutSwitchVisible={false} galleryType="gallery"/>
        </div>
      ))}
    </div>
  );
}

export default CafeGroupGallery;
