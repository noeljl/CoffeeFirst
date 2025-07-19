import React from 'react';
import { useLocation } from 'react-router-dom';
import CafeGallery from '../components/cafes/CafeGallery';
import CafeGroupGallery from '../components/cafes/CafeGroupGallery';
import { useAllCafesGroupedByDistricts } from '../hooks/useAllCafesGroupedByDistricts';

export default function Partners() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedDistrict = params.get('district');
  const { groups, loading, error } = useAllCafesGroupedByDistricts();

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  if (selectedDistrict) {
    const group = groups.find(g => g._id === selectedDistrict);
    if (!group) return <div>No cafes found for {selectedDistrict}</div>;
    return (
      <div>
        <CafeGallery coffeeShops={group.coffeeShops} titleText={selectedDistrict} />
      </div>
    );
  }

  // Default: show all districts grouped
  return <CafeGroupGallery />;
}