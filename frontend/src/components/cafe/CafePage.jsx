import { useParams } from "react-router-dom";
import dummyCafesData from "./DummySingleCafeData.js";

import CafeHeaderSection from "./CafeHeaderSection.jsx";
import VisitStatusCardSection from "./VisitStatusCardSection.jsx";
import AboutSection from "./AboutSection.jsx";
import SustainabilitySection from "./SustainabilitySection.jsx";
import CoffeeVariantsSection from "./CoffeeVariantsSection.jsx";
import CafeOffersSection from "./CafeOffersSection.jsx";
import ReviewSummarySection from "./ReviewSummarySection.jsx";
import MapEmbedSection from "./MapEmbedSection.jsx";

function CafePage() {
  const { cafeSlug } = useParams();

  // Find the matching café object
  const cafe = dummyCafesData.find((c) => c.slug === cafeSlug);

  if (!cafe) {
    return <div style={{ padding: "2rem" }}>Café not found.</div>;
  }

  return (
    <>
      <CafeHeaderSection cafe={cafe} />
      <VisitStatusCardSection lastVisit="2025-04-24" />
      <AboutSection title="About the café"   description={cafe.aboutCafe} />
      <AboutSection title="About the coffee" description={cafe.aboutCoffee} />
      <SustainabilitySection   list={cafe.sustainability} />
      <CoffeeVariantsSection   list={cafe.variants} />
      <CafeOffersSection       list={cafe.offers} />
      <ReviewSummarySection    ratings={cafe.ratings} />
      <MapEmbedSection         coords={cafe.coords}/>
    </>
  );
}

export default CafePage;