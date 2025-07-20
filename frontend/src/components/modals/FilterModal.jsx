import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/FilterModal.module.css';
import Icons from '../../assets/Icons.js';
import { getFilteredCoffeeShops } from '../../apis/coffeeshop.js';
import Button from '../Buttons.jsx';
import { useAllFilterOptions } from '../../hooks/useAllFilterOptions';
import useDisableScrolling from '../../hooks/useDisableScrolling';

function FilterModal({ onClose }) {
    const [selectedOffers, setSelectedOffers] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [selectedSustainability, setSelectedSustainability] = useState([]);
    const navigate = useNavigate();
    const [options, loading, error] = useAllFilterOptions();
    useDisableScrolling(true);
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
            navigate('/dashboard/discover', { state: { filteredShops: result, filters: filterParams } });
            onClose();
        } catch (err) {
            console.error('Filter fetch error:', err);
        }
    };

    // if (error) return <div className={styles.filterOverlay}><div className={styles.filterModal}><div>Error loading filter options: {error.toString()}</div></div></div>;

    return (
        <div className={styles.filterOverlay}>
            <div className={styles.filterModal}>
                <div className={styles.filterHeader}>
                    <h2>Filters</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <img src={Icons.cancel} alt="close" />
                    </button>
                </div>

                <div className={styles.filterSection}>
                    <h3>Offers</h3>
                    <div className={styles.filterOptions}>
                        {options.offers.map((offer) => (
                            <button
                                key={offer.value}
                                className={`${styles.filterOption} ${selectedOffers.includes(offer.value) ? styles.active : ''}`}
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

                <div className={styles.filterSection}>
                    <h3>Sustainability</h3>
                    <div className={styles.filterOptions}>
                        {options.sustainability.map((option) => (
                            <button
                                key={option.value}
                                className={`${styles.filterOption} ${selectedSustainability.includes(option.value) ? styles.active : ''}`}
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

                <div className={styles.filterSection}>
                    <h3>Coffee variants</h3>
                    <div className={styles.filterOptions}>
                        {options.coffeeVariants.map((variant) => (
                            <button
                                key={variant.value}
                                className={`${styles.filterOption} ${selectedVariants.includes(variant.value) ? styles.active : ''}`}
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

                <div className={styles.filterFooter}>
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