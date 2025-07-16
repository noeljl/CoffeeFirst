import React, { useEffect, useState } from 'react'
import Hero from '../components/hero/Hero'
import CoffeeGallery from '../components/cafes/CafeGallery'
import Footer from '../components/footer/Footer'
import PricingTable from '../components/ui/pricing/PricingTable'
import NavBar from '../components/ui/navbar/Navbar'
import './HomePage.css'
import CTA from '../components/cta/CTA'
import FAQAccordion from '../components/faq/FAQAccordion'
import faqs from '../components/faq/DummyFAQ'
import { getAllDistricts } from '../apis/coffeeshop'
import CafeGallery from '../components/cafes/CafeGallery'

function HomePage() {
  const [districts, setDistricts] = useState([])
  const [loadingDistricts, setLoadingDistricts] = useState(true)
  const [districtsError, setDistrictsError] = useState(null)

  useEffect(() => {
    getAllDistricts()
      .then((data) => {
        setDistricts(data)
        setLoadingDistricts(false)
      })
      .catch((err) => {
        setDistrictsError(err)
        setLoadingDistricts(false)
      })
  }, [])

  return (
    <div>
      <NavBar />
      <div className="content">
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
            <PricingTable />
          </div>
        </div>
        <CTA />
        <div className="page-frame">
          <div className="section">
            <h2 id="section-title">Questions? Answers.</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
