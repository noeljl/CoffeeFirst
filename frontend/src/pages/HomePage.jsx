import React from "react";
import NavBar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import CoffeeGallery from "../components/coffee-cards/CoffeeGallery";
import Footer from "../components/footer/Footer";
import PricingTable from "../components/pricing/PricingTable";

function HomePage() {
    return (
        <div>
            <NavBar />
            <Hero />
            <div className="section">
                <h2>Some of our partners</h2>
                <CoffeeGallery />
            </div>
            <div className="section">
                <h2>Pricing</h2>
                <PricingTable />
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;