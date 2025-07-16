// FilterResult.jsx
// This component displays a list of filtered cafés using the SingleCafeCard component.
// It receives the filtered cafés as a prop or from location.state, and shows a message if no cafés match the filters.
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SingleCafeCard from '../../cafes/SingleCafeCard'
import Button from '../buttons/Button'
import './Filter.css'

// FilterResult component
// Props:
// - cafes: Array of café objects to display (optional)
// - location: React Router location object (optional)
//
// If cafes prop is provided, it uses that array.
// If location.state.filteredShops exists, it uses that array.
// If neither is provided, it shows a message indicating no cafés match the filters.

function FilterResult({ cafes, filters }) {
    const [filtersAsText, setFiltersAsText] = useState("No filters applied")
    const [titleText, setTitleText] = useState("No cafés found matching your filters")
    const location = useLocation()
    const navigate = useNavigate()
    // Use cafes prop if provided, otherwise fallback to location.state
    const filteredCafes = cafes || (location.state && location.state.filteredShops) || []

    useEffect(() => {
        setTitleText(`${filteredCafes.length} matching cafés found`)
    }, [filteredCafes])

    useEffect(() => {
        const filterString = filters
            ? [
                ...(filters.offers || []),
                ...(filters.coffeeVariants || []),
                ...(filters.sustainability || [])
            ].join(", ") || "No filters applied"
            : "No filters applied";
        setFiltersAsText(filterString)
    }, [filters])

    return (
        <div className="filter-result-container">
            <div className="filter-result-header">
                <div className="text-container">
                    <div className="title">{titleText}</div>
                    <div className="filter-settings">Your filter settings are: {filtersAsText}</div>
                </div>
                <Button bg="white" fs="medium" radius="small" padding="small" fw="bold" onClick={() => {
                    navigate('/dashboard/partners', { state: { filters: null, filteredShops: null } })
                }}>
                    Clear filters
                </Button>
            </div>
            <div className="cafe-list">
                {filteredCafes.map((coffeeShop) => {
                    console.log(
                        'Coffee shop:',
                        coffeeShop.name,
                        'Images:',
                        coffeeShop.images
                    )
                    // Use environment variable for backend URL
                    const backendUrl = 'http://localhost:3001'
                    const imageUrl = coffeeShop.images?.[0]
                        ? `${backendUrl}${coffeeShop.images[0]}`
                        : ''
                    return (
                        <SingleCafeCard
                            key={coffeeShop._id}
                            imgSrc={imageUrl}
                            title={coffeeShop.name}
                            rate={coffeeShop.averageRating}
                            address={coffeeShop.address}
                            slug={coffeeShop.slug}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default FilterResult