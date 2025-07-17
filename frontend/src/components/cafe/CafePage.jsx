import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCafeBySlug } from "../../hooks/useCafeBySlug.js";

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
  const { cafe, loading, error } = useCafeBySlug(cafeSlug);
  const [reviewSubmitted, setReviewSubmitted] = useState(false); // Track review submission

  // Callback to handle review submission
  const handleReviewSubmitted = () => {
    setReviewSubmitted(prev => !prev); // Toggle to trigger refresh
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading café...</div>;
  if (error) return <div style={{ padding: "2rem" }}>Error loading café: {error.toString()}</div>;
  if (!cafe) return <div style={{ padding: "2rem" }}>Café not found.</div>;

  return (
    <>
      <CafeHeaderSection cafe={cafe} />
      <VisitStatusCardSection 
        lastVisit="2025-04-24" 
        cafe={cafe} 
        onReviewSubmitted={handleReviewSubmitted} // Pass callback
      />
      <AboutSection title="About the café" description={cafe.aboutCafe} />
      <AboutSection title="About the coffee" description={cafe.aboutCoffee} />
      <SustainabilitySection list={cafe.sustainabilityFeatures} />
      <CoffeeVariantsSection list={cafe.coffeeTypes} />
      <CafeOffersSection list={cafe.amenities} />
      {console.log("CafePage: cafe._id =", cafe._id)} {/* Debug log */}
      <ReviewSummaryContainer 
        coffeeShopId={cafe._id} 
        refreshTrigger={reviewSubmitted} // Pass trigger to refresh
      />
      <MapEmbedSection coords={cafe.coords} />
    </>
  );
}

export default CafePage;