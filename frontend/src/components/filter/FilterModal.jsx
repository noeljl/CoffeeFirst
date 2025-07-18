import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Filter.css';
import Icons from '../../assets/Icons.js';
import { getFilteredCoffeeShops } from '../../apis/coffeeshop.js';
import Button from '../buttons/Button.jsx';
import { useAllFilterOptions } from '../../hooks/useAllFilterOptions';

function FilterModal({ onClose }) {
    const [selectedOffers, setSelectedOffers] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [selectedSustainability, setSelectedSustainability] = useState([]);
    const navigate = useNavigate();
    const [options, loading, error] = useAllFilterOptions();

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
        // Use the value directly for filter submission
        const filterParams = {
            offers: selectedOffers,
            coffeeVariants: selectedVariants,
            sustainability: selectedSustainability,
        };

        // If no filters are selected, just close the modal
        if (
            filterParams.offers.length === 0 &&
            filterParams.coffeeVariants.length === 0 &&
            filterParams.sustainability.length === 0
        ) {
            onClose();
            return;
        }

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

    if (loading) return <div className="filter-overlay"><div className="filter-modal"><div>Loading filter options…</div></div></div>;
    if (error) return <div className="filter-overlay"><div className="filter-modal"><div>Error loading filter options: {error.toString()}</div></div></div>;

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
                        {options.offers.map((offer) => (
                            <button
                                key={offer.value}
                                className={`filter-option ${selectedOffers.includes(offer.value) ? 'active' : ''}`}
                                onClick={() =>
                                    toggleSelection(
                                        offer.value,
                                        selectedOffers,
                                        setSelectedOffers
                                    )
                                }
                            >
                                <img src={Icons[offer.icon]} alt={offer.label} /> {offer.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-section">
                    <h3>Sustainability</h3>
                    <div className="filter-options">
                        {options.sustainability.map((option) => (
                            <button
                                key={option.value}
                                className={`filter-option ${selectedSustainability.includes(option.value) ? 'active' : ''}`}
                                onClick={() =>
                                    toggleSelection(
                                        option.value,
                                        selectedSustainability,
                                        setSelectedSustainability
                                    )
                                }
                            >
                                <img src={Icons[option.icon]} alt={option.label} /> {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-section">
                    <h3>Coffee variants</h3>
                    <div className="filter-options">
                        {options.coffeeVariants.map((variant) => (
                            <button
                                key={variant.value}
                                className={`filter-option ${selectedVariants.includes(variant.value) ? 'active' : ''}`}
                                onClick={() =>
                                    toggleSelection(
                                        variant.value,
                                        selectedVariants,
                                        setSelectedVariants
                                    )
                                }
                            >
                                <img src={Icons[variant.icon]} alt={variant.label} /> {variant.label}
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