import { useEffect, useState, useRef } from 'react'
import SingleCafeCard from './SingleCafeCard'
import './CafeGallery.css'
import { getAllCoffeeShops } from '../../apis/coffeeshop'

function CafeGallery() {
  const [coffeeShops, setCoffeeShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sliderRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

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

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeft.current = sliderRef.current.scrollLeft
  }
  const handleMouseLeave = () => {
    isDragging.current = false
  }
  const handleMouseUp = () => {
    isDragging.current = false
  }
  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5 // scroll speed
    sliderRef.current.scrollLeft = scrollLeft.current - walk
  }

  if (loading) return <div>Loading cafés...</div>
  if (error) return <div>Error loading cafés: {error.toString()}</div>

  return (
    <div className="cafe-slider-wrapper">
      <div
        className="cafe-slider scrollable"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
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
    </div>
  )
}

export default CafeGallery
