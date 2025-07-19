  import PropTypes from 'prop-types'
  import CafeCard from './CafeCard'
  import './CafeGallery.css'
  import CafeListItemWithVisit from './CafeListItemWithVisit'
  import { FaList, FaBorderAll } from 'react-icons/fa'
  import React, { useState } from 'react'
  import { useLastVisits } from '../../hooks/useLastVisits'
  import { useVisitStatsForShops } from '../../hooks/useVisitStats.js'

  // Enhanced CafeGallery component with visit information
  export default function CafeGalleryWithVisits({
    coffeeShops = [],
    titleText,
    loading,
    error,
    galleryType = 'list',
    layoutSwitchVisible = true,
    showVisitInfo = false, // Only show visit info for visited coffee shops
  }) {
    const [layout, setLayout] = useState(galleryType)

    // Fetch last visits and stats - hooks must always be called
    const { lastVisits, loading: visitsLoading } = useLastVisits(
      showVisitInfo ? coffeeShops : []
    )
    const { visitStats, loading: statsLoading } = useVisitStatsForShops(
      showVisitInfo ? coffeeShops : []
    )

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
                  style={{
                    height: '20px',
                    width: '20px',
                    cursor: 'pointer',
                    color: layout === 'list' ? '#000' : '#aaa',
                  }}
                  onClick={() => setLayout('list')}
                  title="List view"
                />
                <FaBorderAll
                  style={{
                    height: '20px',
                    width: '20px',
                    cursor: 'pointer',
                    color: layout === 'gallery' ? '#000' : '#aaa',
                  }}
                  onClick={() => setLayout('gallery')}
                  title="Gallery view"
                />
              </>
            )}
          </div>
        </div>
        <div className="cafe-gallery-content">
          {layout === 'gallery' ? (
            <GalleryStyle coffeeShops={coffeeShops} />
          ) : (
            <ListStyleWithVisits
              coffeeShops={coffeeShops}
              lastVisits={lastVisits}
              visitStats={visitStats}
              loading={loading || visitsLoading || statsLoading}
              error={error}
              showVisitInfo={showVisitInfo}
            />
          )}
        </div>
      </div>
    )
  }

  // It's just an security check to make sure the coffeeShops is an array of objects
  CafeGalleryWithVisits.propTypes = {
    coffeeShops: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  function GalleryStyle({ coffeeShops = [], loading, error }) {
    return (
      <div
        className="cafe-gallery-style"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}
      >
        {coffeeShops.length > 0 ? (
          coffeeShops.map((coffeeShop) => (
            <CafeCard
              key={coffeeShop._id}
              imgSrc={coffeeShop.images?.[0]}
              title={coffeeShop.name}
              rate={coffeeShop.averageRating}
              address={coffeeShop.address}
              slug={coffeeShop.slug}
            />
          ))
        ) : (
          <p>No coffee shops found</p>
        )}
      </div>
    )
  }

  function ListStyleWithVisits({
    coffeeShops = [],
    lastVisits = {},
    visitStats = {},
    loading,
    error,
    showVisitInfo = false,
  }) {
    return (
      <div
        className="cafe-gallery-style"
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        {coffeeShops.length > 0 ? (
          coffeeShops.map((coffeeShop) => {
            const lastVisit = showVisitInfo ? lastVisits[coffeeShop._id] : null
            const stats = showVisitInfo ? visitStats[coffeeShop._id] : null

            return (
              <CafeListItemWithVisit
                key={coffeeShop._id}
                cafe={{
                  imgSrc: coffeeShop.images?.[0],
                  title: coffeeShop.name,
                  rate: coffeeShop.averageRating,
                  address: coffeeShop.address,
                  slug: coffeeShop.slug,
                  coords: coffeeShop.coords,
                  _id: coffeeShop._id,
                }}
                lastVisit={lastVisit}
                visitStats={stats}
              />
            )
          })
        ) : (
          <p>No coffee shops found</p>
        )}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    )
  }
