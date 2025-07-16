import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Filter.css';
import Icons from '../../../assets/Icons.js';
import { getFilteredCoffeeShops } from '../../../apis/coffeeshop.js';
import { CoffeeTypeMap, OfferMap, SustainabilityFeatureMap } from '../../../constants/filterMappings.js';
import Button from '../buttons/Button';

const sustainabilityOptions = [
    { label: 'Small-Batch Roasting', icon: Icons.tree },
    { label: 'Eco-Friendly Packaging', icon: Icons.tree },
    { label: 'Ethical Sourcing', icon: Icons.tree },
    { label: '100% Arabica Only', icon: Icons.tree },
];

const offers = [
    { label: 'Indoor Sitting', icon: Icons.couch },
    { label: 'Outdoor Sitting', icon: Icons.sun },
    { label: 'Wifi', icon: Icons.wifi },
    { label: 'Free Water', icon: Icons.water },
    { label: 'Free Charging', icon: Icons.charging },
    { label: 'Pet Friendly', icon: Icons.pet },
    { label: 'Wheelchair Friendly', icon: Icons.wheelchair },
];

const coffeeVariants = [
    { label: 'Espresso', icon: Icons.coffeeBean },
    { label: 'Flat White', icon: Icons.coffeeBean },
    { label: 'Latte Macchiato', icon: Icons.coffeeBean },
    { label: 'Cappuccino', icon: Icons.coffeeBean },
    { label: 'Americano', icon: Icons.coffeeBean },
];

function FilterModal({ onClose }) {
    const [selectedOffers, setSelectedOffers] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [selectedSustainability, setSelectedSustainability] = useState([]);
    const navigate = useNavigate();

    const toggleSelection = (value, list, setList) => {
        setList(
            list.includes(value)
                ? list.filter((item) => item !== value)
                : [...list, value]
        );
    };

    const clearFilters = () => {
        setSelectedOffers([]);
        setSelectedVariants([]);
        setSelectedSustainability([]);
    };

    const handleSave = async () => {
        // Map selected labels to backend enum values
        const mappedOffers = selectedOffers.map(label => OfferMap[label]).filter(Boolean);
        const mappedVariants = selectedVariants.map(label => CoffeeTypeMap[label]).filter(Boolean);
        const mappedSustainability = selectedSustainability.map(label => SustainabilityFeatureMap[label]).filter(Boolean);

        // If no filters are selected, just close the modal
        if (
            mappedOffers.length === 0 &&
            mappedVariants.length === 0 &&
            mappedSustainability.length === 0
        ) {
            onClose();
            return;
        }

        const filterParams = {
            offers: mappedOffers,
            coffeeVariants: mappedVariants,
            sustainability: mappedSustainability,
        };

        console.log('Submitting filter params:', filterParams);
        try {
            const result = await getFilteredCoffeeShops(filterParams);
            console.log('Filter API result:', result);
            navigate('/dashboard/partners', { state: { filteredShops: result, filters: filterParams } });
            onClose();
        } catch (err) {
            console.error('Filter fetch error:', err);
        }
    };

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
                                className={`filter-option ${selectedOffers.includes(offer.label) ? 'active' : ''
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
                    <h3>Sustainability</h3>
                    <div className="filter-options">
                        {sustainabilityOptions.map((option) => (
                            <button
                                key={option.label}
                                className={`filter-option ${selectedSustainability.includes(option.label) ? 'active' : ''
                                    }`}
                                onClick={() =>
                                    toggleSelection(
                                        option.label,
                                        selectedSustainability,
                                        setSelectedSustainability
                                    )
                                }
                            >
                                <img src={option.icon} alt={option.label} /> {option.label}
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
                                className={`filter-option ${selectedVariants.includes(variant.label) ? 'active' : ''
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
                    <Button bg="white" fs="medium" radius="small" padding="small" fw="bold" onClick={clearFilters}>Clear filters</Button>
                    <Button bg="black" fs="medium" radius="small" padding="small" fw="bold" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FilterModal;