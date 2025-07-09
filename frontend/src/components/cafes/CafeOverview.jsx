import React from 'react';
import SingleCafeCard from './SingleCafeCard';

function CafeOverview({ cafes }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', flexDirection: 'row' }}>
            {cafes.map((coffeeShop) => {
                console.log('Coffee shop:', coffeeShop.name, 'Images:', coffeeShop.images)
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
    )
}

export default CafeOverview;