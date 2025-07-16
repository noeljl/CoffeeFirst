import { useParams, useLocation } from 'react-router-dom'
import CafeGallery from '../cafes/CafeGallery'
import PartnersByDistrict from '../cafes/PartnersByDistrict'
import FavoriteWishlist from '../favorite-wishlist/FavoriteWishlist'
import FilterResult from '../ui/filter/FilterResult'
import CheckOut from '../../components/check-out/CheckOut'
// import VisitedCafeTable from "../visited/VisitedCafeTable"; // Add if needed
// import EmptyState from "../states/EmptyState"; // Optional fallback

function Dashboard() {
  const location = useLocation()
  const filteredShops = location.state?.filteredShops
  const filters = location.state?.filters
  const { section } = useParams()

  const sectionMap = {
    partners:
      filteredShops && filteredShops.length > 0 ? (
        <FilterResult cafes={filteredShops} filters={filters} />
      ) : (
        <PartnersByDistrict />
      ),
    favorites: <FavoriteWishlist listType="favorites" />,
    wishlist: <FavoriteWishlist listType="wishlist" />,
    visited: <CafeGallery variant="visited" />, // replace with your own component if needed
    checkOut: <CheckOut />,
  }

  return sectionMap[section] || <div>Section not found</div>
}

export default Dashboard
