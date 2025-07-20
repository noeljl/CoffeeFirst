import React from 'react'
import Hero from '../components/hero/Hero'
import CoffeeGallery from '../components/cafes/CafeGallery'
import Footer from '../components/footer/Footer'
import PricingTable from '../components/pricing-table/PricingTable'
import NavBar from '../components/navbar/Navbar'
import './styles/HomePage.css'
import CTA from '../components/cta/CTA'
import FAQAccordion from '../components/faq/FAQAccordion'
import faqs from '../components/faq/DummyFAQ'
import { useAllCafes } from '../hooks/useAllCafes'

function HomePage() {
  // Get all cafes for the partners section
  const [cafes, cafesLoading, cafesError] = useAllCafes()
  
  // Limit to first 12 cafes for the home page partners section
  const limitedCafes = cafes ? cafes.slice(0, 12) : []

  return (
    <div>
      <NavBar minimal />
      <Hero />
      <div className="homepage-body">
        <div className="homepage-section">
          <h2 className="section-title">Some of our partners</h2>
          <CoffeeGallery 
            coffeeShops={limitedCafes} 
            loading={cafesLoading} 
            error={cafesError}
          />
        </div>
        <div className="homepage-section">
          <h2 className="section-title">Sustainability</h2>
          <div className="sustainability-content">
            <p>
              We are committed to promoting sustainable coffee practices. Our partner cafes prioritize:
            </p>
            <ul>
              <li>Ethical sourcing of coffee beans</li>
              <li>Supporting local coffee farmers</li>
              <li>Reducing environmental impact</li>
              <li>Promoting fair trade practices</li>
            </ul>
          </div>
        </div>
        <PricingTable />
        <FAQAccordion faqs={faqs} />
        <CTA />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
