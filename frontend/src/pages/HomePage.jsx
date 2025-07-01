import React from "react";
import Hero from "../components/hero/Hero";
import CoffeeGallery from "../components/cafes/CafeGallery";
import Footer from "../components/footer/Footer";
import PricingTable from "../components/ui/pricing/PricingTable";
import NavBar from "../components/ui/navbar/Navbar";

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