import PropTypes from 'prop-types';
import CafeCard from './CafeCard';
import '../../styles/CafeGallery.css';
import CafeListItem from './CafeListItem';
import { FaList, FaBorderAll } from 'react-icons/fa';
import React, { useState } from 'react';

// CafeGallery component
// Displays a list of cafés
// Props:
// - coffeeShops: Array of café objects (from CafeGroupGallery component)
// Returns:
// - Array of café cards by using CafeCard component
export default function CafeGallery({ coffeeShops = [], titleText, loading, error, galleryType = 'list', layoutSwitchVisible = true }) {
  const [layout, setLayout] = useState(galleryType); // 'gallery' or 'list'

  console.log('All coffeeShops / coords', coffeeShops)
  return (
    <div className="cafe-gallery-container">
      <div className="cafe-gallery-header">
        <div className="cafe-gallery-header-col-left">
          {titleText && <h2>{`${titleText}`}</h2>}
        </div>
        <div className="cafe-gallery-header-col-right">
          {console.log('layoutSwitchVisible', layoutSwitchVisible)}
          {layoutSwitchVisible && (
            <>
              <FaList
                style={{ height: '20px', width: '20px', cursor: 'pointer', color: layout === 'list' ? '#000' : '#aaa' }}
                onClick={() => setLayout('list')}
                title="List view"
              />
              <FaBorderAll
                style={{ height: '20px', width: '20px', cursor: 'pointer', color: layout === 'gallery' ? '#000' : '#aaa' }}
                onClick={() => setLayout('gallery')}
                title="Gallery view"
              />
            </>
          )}
        </div>
      </div>
      <div className="cafe-gallery-content">
        {layout === 'gallery'
          ? <GalleryStyle coffeeShops={coffeeShops} />
          : <ListStyle coffeeShops={coffeeShops} />}
      </div>
    </div>
  );
}

// It's just an security check to make sure the coffeeShops is an array of objects
CafeGallery.propTypes = {
  coffeeShops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function GalleryStyle({ coffeeShops = [], loading, error }) {
  return (
    <div className="cafe-gallery-style"
      style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}
    >
      {coffeeShops.length > 0 ? coffeeShops.map((coffeeShop) => (
        <CafeCard
          key={coffeeShop._id}
          imgSrc={coffeeShop.images?.[0]}
          title={coffeeShop.name}
          rate={coffeeShop.averageRating}
          address={coffeeShop.address}
          slug={coffeeShop.slug}
        />
      )) : <p>No coffee shops found</p>}
    </div>
  )
}

function ListStyle({ coffeeShops = [], loading, error }) {
  return (
    <div className="cafe-gallery-style"
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {coffeeShops.length > 0 ? coffeeShops.map((coffeeShop) => (
        <CafeListItem
          key={coffeeShop._id}
          imgSrc={coffeeShop.images?.[0]}
          title={coffeeShop.name}
          rate={coffeeShop.averageRating}
          address={coffeeShop.address}
          slug={coffeeShop.slug}
          coords={coffeeShop.coords}
        />
      )) : <p>No coffee shops found</p>}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
