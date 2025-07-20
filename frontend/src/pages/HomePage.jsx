import React from 'react'
import Hero from '../components/Hero'
import CoffeeGallery from '../components/cafes/CafeGallery'
import Footer from '../components/Footer.jsx'
import PricingTable from '../components/pricing-table/PricingTable'
import NavBar from '../components/navbar/Navbar'
import './styles/HomePage.css'
import CTA from '../components/CTA'
import FAQAccordion from '../components/FAQAccordion'
import faqs from '../data/FAQData.js'
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
          <h2 className="homepage-section-title">Some of our partners</h2>
          <CoffeeGallery coffeeShops={limitedCafes} loading={cafesLoading} error={cafesError} />
        </div>
      </div>
      <div className="homepage-section sustainability-section">
        <img
          src="/images/home-sustainability.png"
          draggable={false}
          alt="Sustainability"
        />
        <div className="sustainability-section-text">
          <h2>Coffee meets sustainability</h2>
          <p>
            At CoffeeFirst, we believe every cup can make a difference. We
            partner exclusively with cafés that prioritize ethically sourced
            beans, eco-friendly packaging, and sustainable production. Our
            goal is to support local businesses that care for both people and
            the planet—one coffee at a time.
          </p>
        </div>
      </div>
      <div className="homepage-section">
        <h2 className="homepage-section-title">Pricing</h2>
        <PricingTable onSelectPlan={null} onSessionCreated={null} page="home" />
      </div>
      <div className="homepage-section">
        <CTA />
      </div>
      <div className="homepage-section">
        <h2 className="homepage-section-title">Questions? Answers.</h2>
        <FAQAccordion faqs={faqs} />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage


