import { useParams } from "react-router-dom";
import CoffeeGallery from "../coffee-cards/CoffeeGallery";
// import VisitedCafeTable from "../visited/VisitedCafeTable"; // Add if needed
// import EmptyState from "../states/EmptyState"; // Optional fallback

function Dashboard() {
  const { section } = useParams();

  const sectionMap = {
    partners: <CoffeeGallery variant="partners" />,
    favorites: <CoffeeGallery variant="favorites" />,
    wishlist: <CoffeeGallery variant="wishlist" />,
    visited: <CoffeeGallery variant="visited" />, // replace with your own component if needed
  };

  return sectionMap[section] || <div>Section not found</div>;
}

export default Dashboard;