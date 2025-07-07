// Filter.jsx
import { useState } from 'react'
import './Filter.css'
import Button from '../buttons/Button'
import Icons from '../../../assets/Icons'
import { getFilteredCoffeeShops } from '../../../apis/filter.js' 

const offers = [
  { label: 'Indoor Sitting', icon: Icons.couch },
  { label: 'Outdoor Sitting', icon: Icons.sun },
  { label: 'Free Wifi', icon: Icons.wifi },
  { label: 'Free Water', icon: Icons.water },
  { label: 'Free Charging', icon: Icons.charging },
  { label: 'Pet Friendly', icon: Icons.pet },
  { label: 'Wheelchair Friendly', icon: Icons.wheelchair },
]

const coffeeVariants = [
  { label: 'Espresso', icon: Icons.coffeeBean },
  { label: 'Flat White', icon: Icons.coffeeBean },
  { label: 'Cold Brew', icon: Icons.coffeeBean },
  { label: 'Cappuccino', icon: Icons.coffeeBean },
]

function FilterButton() {
  const [isFilterOpen, setFilterOpen] = useState(false)
  return (
    <div>
      <Button
        bg="white"
        fs="small"
        radius="full"
        icon={Icons.filter}
        padding="medium"
        fw="bold"
        onClick={() => setFilterOpen(true)}
      >
        Filter
      </Button>
      {isFilterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
    </div>
  )
}

function FilterModal({ onClose }) {
  const [selectedOffers, setSelectedOffers] = useState([])
  const [selectedVariants, setSelectedVariants] = useState([])
     const handleSave = async () => {
    try {
      const result = await getFilteredCoffeeShops({
        offers: selectedOffers,
        coffeeVariants: selectedVariants,
      })
      // 🔔 TODO: Send `result` to parent/shop list view
      console.log('Filtered shops:', result)

      onClose()
    } catch (err) {
      console.error('Filter fetch error:', err)
    }
  }

  return (
    <div className="filter-overlay">
      <div className="filter-modal">
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="close-btn" onClick={onClose}>
            <img src={Icons.cancel} alt="close" />
          </button>
        </div>
        <div className="filter-section">
          <h3>Offers</h3>
          <div className="filter-options">
            {offers.map((offer) => (
              <button
                key={offer.label}
                className={`filter-option ${
                  selectedOffers.includes(offer.label) ? 'active' : ''
                }`}
                onClick={() =>
                  toggleSelection(
                    offer.label,
                    selectedOffers,
                    setSelectedOffers
                  )
                }
              >
                <img src={offer.icon} alt={offer.label} /> {offer.label}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h3>Coffee variants</h3>
          <div className="filter-options">
            {coffeeVariants.map((variant) => (
              <button
                key={variant.label}
                className={`filter-option ${
                  selectedVariants.includes(variant.label) ? 'active' : ''
                }`}
                onClick={() =>
                  toggleSelection(
                    variant.label,
                    selectedVariants,
                    setSelectedVariants
                  )
                }
              >
                <img src={variant.icon} alt={variant.label} /> {variant.label}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-footer">
          <button className="save-button" onClick={onClose}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterButton
