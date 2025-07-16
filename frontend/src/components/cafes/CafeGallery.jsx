import PropTypes from 'prop-types';
import CafeCard from './CafeCard';
import '../../styles/CafeGallery.css';

// CafeGallery component
// Displays a list of cafés
// Props:
// - coffeeShops: Array of café objects (from CafeGroupGallery component)
// Returns:
// - Array of café cards by using CafeCard component
function CafeGallery({ coffeeShops, titleText }) {
  return (
    <div className="cafe-gallery">
      {titleText && <h2>{`${titleText}`}</h2>}
      <div
        className="cafe-gallery-list"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}
      >
        {coffeeShops.map((coffeeShop) => (
          <CafeCard
            key={coffeeShop._id}
            imgSrc={coffeeShop.images?.[0]}
            title={coffeeShop.name}
            rate={coffeeShop.averageRating}
            address={coffeeShop.address}
            slug={coffeeShop.slug}
          />
        ))}
      </div>
    </div>
  );
}

// It's just an security check to make sure the coffeeShops is an array of objects
CafeGallery.propTypes = {
  coffeeShops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CafeGallery;
