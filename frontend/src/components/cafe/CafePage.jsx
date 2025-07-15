import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoffeeShopBySlug } from "../../apis/coffeeshop";

import CafeHeaderSection from "./CafeHeaderSection.jsx";
import VisitStatusCardSection from "./VisitStatusCardSection.jsx";
import AboutSection from "./AboutSection.jsx";
import SustainabilitySection from "./SustainabilitySection.jsx";
import CoffeeVariantsSection from "./CoffeeVariantsSection.jsx";
import CafeOffersSection from "./CafeOffersSection.jsx";
import ReviewSummarySection from "./ReviewSummarySection.jsx";
import MapEmbedSection from "./MapEmbedSection.jsx";
import ReviewSummaryContainer from "./ReviewSummaryContainer";

function CafePage() {
  const { cafeSlug } = useParams();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCoffeeShopBySlug(cafeSlug)
      .then(data => {
        console.log('Cafe data:', data);
        setCafe(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cafe:', err);
        setError(err);
        setLoading(false);
      });
  }, [cafeSlug]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading café...</div>;
  if (error) return <div style={{ padding: "2rem" }}>Error loading café: {error.toString()}</div>;
  if (!cafe) return <div style={{ padding: "2rem" }}>Café not found.</div>;

  return (
    <>
      <CafeHeaderSection cafe={cafe} />
      <VisitStatusCardSection lastVisit="2025-04-24" cafe={cafe} />
      <AboutSection title="About the café" description={cafe.aboutCafe} />
      <AboutSection title="About the coffee" description={cafe.aboutCoffee} />
      <SustainabilitySection list={cafe.sustainabilityFeatures} />
      <CoffeeVariantsSection list={cafe.coffeeTypes} />
      <CafeOffersSection list={cafe.amenities} />
      {console.log("CafePage: cafe._id =", cafe._id)} {/* Debug log */}
      <ReviewSummaryContainer coffeeShopId={cafe._id} />
      <MapEmbedSection coords={cafe.coords} />
    </>
  );
}

export default CafePage;