import { useEffect, useState } from 'react'
import SingleCafeCard from './SingleCafeCard'
import './CafeGallery.css'
import { getAllCoffeeShops } from '../../apis/coffeeshop'

function CafeGallery() {
  const [coffeeShops, setCoffeeShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllCoffeeShops()
      .then(data => {
        console.log('Coffee shops data:', data)
        setCoffeeShops(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching coffee shops:', err)
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading cafés...</div>
  if (error) return <div>Error loading cafés: {error.toString()}</div>

  return (
    <div className="coffee-gallery">
      {coffeeShops.map((coffeeShop) => {
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

export default CafeGallery
