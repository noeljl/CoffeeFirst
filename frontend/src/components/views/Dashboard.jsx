import { useParams, useLocation } from "react-router-dom";
import CafeGallery from "../cafes/CafeGallery";
import PartnersByDistrict from "../cafes/PartnersByDistrict";
// import VisitedCafeTable from "../visited/VisitedCafeTable"; // Add if needed
// import EmptyState from "../states/EmptyState"; // Optional fallback

function Dashboard() {
  const location = useLocation();
  const filteredShops = location.state?.filteredShops;
  const { section } = useParams();

  if (section === "partners") {
    // If filteredShops exist, show only those in CafeGallery, else show default partners view
    if (filteredShops) {
      return <CafeGallery coffeeShops={filteredShops} />;
    }
    return <PartnersByDistrict />;
  }
  if (section === "favorites") {
    return <CafeGallery variant="favorites" />;
  }
  if (section === "wishlist") {
    return <CafeGallery variant="wishlist" />;
  }
  if (section === "visited") {
    return <CafeGallery variant="visited" />; // replace with your own component if needed
  }
  return <div>Section not found</div>;
}

export default Dashboard;