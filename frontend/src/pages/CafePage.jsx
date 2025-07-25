import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useCafeBySlug } from '../hooks/useCafeBySlug.js'

import CafeHeaderSection from '../components/cafe/CafeHeaderSection.jsx'
import VisitStatusCard from '../components/cafe/VisitStatusCard.jsx'

import AboutSection from '../components/cafe/AboutSection.jsx'
import SustainabilitySection from '../components/cafe/SustainabilitySection.jsx'
import CoffeeVariantsSection from '../components/cafe/CoffeeVariantsSection.jsx'
import CafeOffersSection from '../components/cafe/CafeOffersSection.jsx'
import MapEmbedSection from '../components/cafe/MapEmbedSection.jsx'
import ReviewSummaryContainer from '../components/cafe/ReviewSummaryContainer'

import './styles/CafePage.css'

function CafePage() {
  const { cafeSlug } = useParams()
  const { cafe, loading, error } = useCafeBySlug(cafeSlug)
  const [reviewSubmitted, setReviewSubmitted] = useState(false) // Track review submission

  // Callback to handle review submission
  const handleReviewSubmitted = () => {
    setReviewSubmitted((prev) => !prev) // Toggle to trigger refresh
  }

  if (loading) return <div style={{ padding: '2rem' }}>Loading café...</div>
  if (error)
    return (
      <div style={{ padding: '2rem' }}>
        Error loading café: {error.toString()}
      </div>
    )
  if (!cafe) return <div style={{ padding: '2rem' }}>Café not found.</div>

  return (
    <div className="cafe-container">
      <CafeHeaderSection cafe={cafe} />
      <VisitStatusCard
        cafe={cafe}
        onReviewSubmitted={handleReviewSubmitted} // Pass callback
      />
      <AboutSection title="Discover the Café" description={cafe.aboutCafe} />
      <AboutSection title="What’s Brewing?" description={cafe.aboutCoffee} />
      <SustainabilitySection list={cafe.sustainabilityFeatures} />
      <CoffeeVariantsSection list={cafe.coffeeTypes} />
      <CafeOffersSection list={cafe.amenities} />
      {console.log('CafePage: cafe._id =', cafe._id)} {/* Debug log */}
      <ReviewSummaryContainer
        coffeeShopId={cafe._id}
        refreshTrigger={reviewSubmitted} // Pass trigger to refresh
      />
      <MapEmbedSection coords={cafe.coords} />
    </div>
  )
}

export default CafePage
