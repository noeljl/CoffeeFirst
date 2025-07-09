import { useParams } from "react-router-dom";
import CafeGallery from "../cafes/CafeGallery";
import PartnersByDistrict from "../cafes/PartnersByDistrict";
import FavoriteWishlist from "../favorite-wishlist/FavoriteWishlist";
// import VisitedCafeTable from "../visited/VisitedCafeTable"; // Add if needed
// import EmptyState from "../states/EmptyState"; // Optional fallback

function Dashboard() {
  const { section } = useParams();

  const sectionMap = {
    partners: <PartnersByDistrict />,
    favorites: <FavoriteWishlist listType="favorites" />,
    wishlist: <FavoriteWishlist listType="wishlist" />,
    visited: <CafeGallery variant="visited" />, // replace with your own component if needed
  };

  return sectionMap[section] || <div>Section not found</div>;
}

export default Dashboard;