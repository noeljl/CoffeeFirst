import React from 'react'
import Hero from '../components/hero/Hero'
import CoffeeGallery from '../components/cafes/CafeGallery'
import Footer from '../components/footer/Footer'
import PricingTable from '../components/pricing-table/PricingTable'
import NavBar from '../components/navbar/Navbar'
import './HomePage.css'
import CTA from '../components/cta/CTA'
import FAQAccordion from '../components/faq/FAQAccordion'
import faqs from '../components/faq/DummyFAQ'

function HomePage() {

  return (
    <div>
      <NavBar minimal />
      <Hero />
      <div className="page-frame">
        <div className="section">
          <h2 id="section-title">Some of our partners</h2>
          <CoffeeGallery />
        </div>
      </div>
      <div className="section-sustainability">
        <div className="left-col">
          <img
            src="/images/home-sustainability.png"
            draggable={false}
            alt="Sustainability"
          />
        </div>
        <div className="right-col">
          <h2 id="section-title">Coffee meets sustainability</h2>
          <p style={{ fontSize: 22, paddingTop: 20, paddingRight: 200 }}>
            At CoffeeFirst, we believe every cup can make a difference. We
            partner exclusively with cafés that prioritize ethically sourced
            beans, eco-friendly packaging, and sustainable production. Our
            goal is to support local businesses that care for both people and
            the planet—one coffee at a time.
          </p>
        </div>
      </div>
      <div className="page-frame">
        <div className="section">
          <h2 id="section-title">Pricing</h2>
          <PricingTable onSelectPlan={null} onSessionCreated={null} page="home" />
        </div>
      </div>
      <CTA />
      <div className="page-frame">
        <div className="section">
          <h2 id="section-title">Questions? Answers.</h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </div>

      
      <Footer />
    </div>
  )
}

export default HomePage
