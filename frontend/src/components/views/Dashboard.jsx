import { useParams } from "react-router-dom";
import CafeGallery from "../cafes/CafeGallery";
import PartnersByDistrict from "../cafes/PartnersByDistrict";
// import VisitedCafeTable from "../visited/VisitedCafeTable"; // Add if needed
// import EmptyState from "../states/EmptyState"; // Optional fallback

function Dashboard() {
  const { section } = useParams();

  const sectionMap = {
    partners: <PartnersByDistrict />,
    favorites: <CafeGallery variant="favorites" />,
    wishlist: <CafeGallery variant="wishlist" />,
    visited: <CafeGallery variant="visited" />, // replace with your own component if needed
  };

  return sectionMap[section] || <div>Section not found</div>;
}

export default Dashboard;