import { useParams, useLocation } from "react-router-dom";
import CafeGallery from "../cafes/CafeGallery";
import Partners from "./Partners";
import FilterResult from "../ui/filter/FilterResult";

function Dashboard() {
  const location = useLocation();
  const filteredShops = location.state?.filteredShops;
  const filters = location.state?.filters;
  const { section } = useParams();

  const sectionMap = {
    partners: filteredShops && filteredShops.length > 0
      ? <FilterResult cafes={filteredShops} filters={filters}/>
      : <Partners />, // Use Partners component here
    favorites: <CafeGallery />,
    wishlist: <CafeGallery />,
    visited: <CafeGallery />,
  };

  return sectionMap[section] || <div>Section not found</div>;
}

export default Dashboard;