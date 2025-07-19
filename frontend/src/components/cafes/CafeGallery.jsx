import PropTypes from 'prop-types';
import CafeCard from './CafeCard';
import styles from '../styles/CafeGallery.module.css';
import CafeListItem from './CafeListItem';
import { FaList, FaBorderAll, FaChevronLeft } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CafeGallery component
// Displays a list of cafés
// Props:
// - coffeeShops: Array of café objects (from CafeGroupGallery component)
// Returns:
// - Array of café cards by using CafeCard component
export default function CafeGallery({ coffeeShops = [], titleText, loading, error, galleryType = 'list', layoutSwitchVisible = true, backButtonVisible = false }) {
  const [layout, setLayout] = useState(galleryType); // 'gallery' or 'list'
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/dashboard/partners`);
  };


  return (
    <div className={styles.cafeGalleryContainer}>
      <div className={styles.cafeGalleryHeader}>
        {titleText && (
          <>
            <div className={styles.cafeGalleryTitleContainer} onClick={backButtonVisible ? handleBack : undefined}>
              {backButtonVisible && (
                <FaChevronLeft
                  className={styles.cafeGalleryTitleIcon}
                  style={{ cursor: 'pointer' }}
                />
              )}
              <h2 className={styles.cafeGalleryTitle} style={{ cursor: backButtonVisible ? 'pointer' : 'default' }}>{`${titleText}`}</h2>
            </div>
            <div className={styles.cafeGalleryHeaderIcons}>
              {console.log('layoutSwitchVisible', layoutSwitchVisible)}
              {layoutSwitchVisible && (
                <>
                  <FaList
                    size={25}
                    style={{ cursor: 'pointer', color: layout === 'list' ? '#DA0A00' : '#222' }}
                    onClick={() => setLayout('list')}
                    title="List view"
                  />
                  <FaBorderAll
                    size={25}
                    style={{ cursor: 'pointer', color: layout === 'gallery' ? '#DA0A00' : '#222' }}
                    onClick={() => setLayout('gallery')}
                    title="Gallery view"
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className={styles.cafeGalleryContent}>
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
    <div className={styles.cafeGalleryStyle}>
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
    <div className={styles.cafeGalleryStyle}>
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
