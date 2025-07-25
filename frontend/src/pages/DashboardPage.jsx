import { useParams, useLocation } from "react-router-dom";
import CafeGallery from "../components/cafes/CafeGallery";
import DiscoverView, { FilteredCafesView } from "../views/DiscoverViews";
import useGetFavorites from "../hooks/useGetFavorites";
import useGetWishlist from "../hooks/useGetWishlist";
import useGetVisitedList from "../hooks/useGetVisitedList";
import { useSelector } from "react-redux";
import CheckOut from '../components/check-out/CheckOut'

function Dashboard() {
  const location = useLocation()
  const filteredShops = location.state?.filteredShops
  const filters = location.state?.filters
  const { section } = useParams()
  // Get the member ID from the Redux store
  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id
  // Get the favorites and wishlist of the member
  const { data: favorites, loading: favoritesLoading, error: favoritesError } =
    useGetFavorites(memberId)
  const { data: wishlist, loading: wishlistLoading, error: wishlistError } = useGetWishlist(memberId)
  const [visited, visitedLoading, visitedError] = useGetVisitedList(memberId)

  const sectionMap = {
    discover: filteredShops && filteredShops.length > 0
      ? <FilteredCafesView cafes={filteredShops} filters={filters}/>
      : <DiscoverView />, // Use Partners component here
    favorites: <CafeGallery coffeeShops={favorites} loading={favoritesLoading} error={favoritesError} titleText="Your Favorites" galleryType="list"/>,
    wishlist: <CafeGallery coffeeShops={wishlist} loading={wishlistLoading} error={wishlistError} titleText="Your Wishlist" galleryType="list"/>,
    visited: <CafeGallery coffeeShops={visited} loading={visitedLoading} error={visitedError} titleText="Your Visits" galleryType="list" />,
    checkout: <CheckOut />,
  }

  return sectionMap[section] || <div>Section not found</div>
}

export default Dashboard
