import React from "react";
import CafeData from "../../data/CafeData";
import "./CafePage.css";

const CafePage = () => {
  const cafe = CafeData[0]; // later: use useParams() for dynamic routing

  return (
    <div className="cafe-container">
      {/* Hero */}
      <section className="cafe-hero">
        <img src={cafe.images[0]} alt={cafe.name} draggable={false} className="cafe-hero-img" />
        <h1 className="cafe-name">{cafe.name}</h1>
        <p className="cafe-address">{cafe.location.address}</p>
      </section>

      {/* About */}
      <section className="cafe-section">
        <h2>About the Café</h2>
        <p>{cafe.aboutCafe}</p>
      </section>

      {/* Coffee */}
      <section className="cafe-section">
        <h2>About the Coffee</h2>
        <p>{cafe.aboutCoffee}</p>
      </section>

      {/* Sustainability Facts */}
      <section className="cafe-section">
        <h2>Sustainability</h2>
        <div className="icon-list">
          {cafe.sustainabilityFacts.map((fact, i) => (
            <div key={i} className="icon-item">
              <img src={fact.icon} draggable={false} alt={fact.label} />
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Coffee Variants */}
      <section className="cafe-section">
        <h2>Coffee Variants</h2>
        <div className="icon-list">
          {cafe.coffeeVariants.map((variant, i) => (
            <div key={i} className="icon-item">
              <img src={variant.icon} draggable={false} alt={variant.name} />
              <span>{variant.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Cafe Offers */}
      <section className="cafe-section">
        <h2>What They Offer</h2>
        <div className="icon-list">
          {cafe.cafeOffers.map((offer, i) => (
            <div key={i} className="icon-item">
              <img src={offer.icon} draggable={false} alt={offer.label} />
              <span>{offer.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="cafe-section">
        <h2>Find Us</h2>
        <iframe
          className="cafe-map"
          src={cafe.location.mapEmbedUrl}
          allowFullScreen
          loading="lazy"
          title="Google Map"
        ></iframe>
      </section>
    </div>
  );
};

export default CafePage;