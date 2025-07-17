
import React from "react";
import '../../styles/CafeGallery.css';
import CafeGallery from "./CafeGallery";
import { useAllCafesGroupedByDistricts } from "../../hooks/useAllCafesGroupedByDistricts";
import { useNavigate } from 'react-router-dom';

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
    navigate(`/dashboard/partners?district=${encodeURIComponent(districtName)}`);
  };

  if (loading) return <div>Loading districts…</div>;
  if (error) return <div>Error loading districts: {error.toString()}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {groups.map((districtGroup) => (
        <div
          key={districtGroup._id}
          style={{
            marginBottom: 48,
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}
        >
          <div className="group-header">
            <h2 style={{ fontSize: 20, fontWeight: "bold" }}>
              {districtGroup._id}
            </h2>
            <button className="view-all-btn" onClick={() => handleViewAll(districtGroup._id)}>
              View all
            </button>
          </div>
          <CafeGallery coffeeShops={districtGroup.coffeeShops} layoutSwitchVisible={false} galleryType="gallery"/>
        </div>
      ))}
    </div>
  );
}

export default CafeGroupGallery;
