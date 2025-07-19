import { useParams, useLocation } from 'react-router-dom'
import CafeGallery from '../cafes/CafeGallery'
import CafeGalleryWithVisits from '../cafes/CafeGalleryWithVisits'
import Partners from './Partners'
import FilterResult from '../filter/FilterResult'
import useGetFavorites from '../../hooks/useGetFavorites'
import useGetWishlist from '../../hooks/useGetWishlist'
import useGetVisitedList from '../../hooks/useGetVisitedList'
import { useSelector } from 'react-redux'
import CheckOut from '../check-out/CheckOut'
import VisitStatsSection from '../dashboard/VisitStatsSection'

function Dashboard() {
  const location = useLocation()
  const filteredShops = location.state?.filteredShops
  const filters = location.state?.filters
  const { section } = useParams()
  // Get the member ID from the Redux store
  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id
  // Get the favorites and wishlist of the member
  const [favorites, favoritesLoading, favoritesError] =
    useGetFavorites(memberId)
  const [wishlist, wishlistLoading, wishlistError] = useGetWishlist(memberId)
  const [visited, visitedLoading, visitedError] = useGetVisitedList(memberId)

  const sectionMap = {
    partners:
      filteredShops && filteredShops.length > 0 ? (
        <FilterResult cafes={filteredShops} filters={filters} />
      ) : (
        <Partners />
      ), // Use Partners component here
    favorites: (
      <CafeGallery
        coffeeShops={favorites}
        loading={favoritesLoading}
        error={favoritesError}
        titleText="Your Favorites"
        galleryType="list"
      />
    ),
    wishlist: (
      <CafeGallery
        coffeeShops={wishlist}
        loading={wishlistLoading}
        error={wishlistError}
        titleText="Your Wishlist"
        galleryType="list"
      />
    ),
    visited: (
      <CafeGalleryWithVisits
        coffeeShops={visited}
        loading={visitedLoading}
        error={visitedError}
        titleText="Your Visits"
        galleryType="list"
        showVisitInfo={true}
      />
    ),
    stats: <VisitStatsSection />,
    checkout: <CheckOut />,
  }

  return sectionMap[section] || <div>Section not found</div>
}

export default Dashboard
