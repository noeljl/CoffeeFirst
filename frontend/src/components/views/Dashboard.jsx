import { useParams, useLocation } from "react-router-dom";
import CafeGallery from "../cafes/CafeGallery";
import Partners from "./Partners";
import FilterResult from "../ui/filter/FilterResult";
import useGetFavorites from "../../hooks/useGetFavorites";
import useGetWishlist from "../../hooks/useGetWishlist";
import { useSelector } from "react-redux";

function Dashboard() {
  const location = useLocation();
  const filteredShops = location.state?.filteredShops;
  const filters = location.state?.filters;
  const { section } = useParams();
  // Get the member ID from the Redux store
  const member = useSelector((state) => state.auth.member);
  const memberId = member?.id;
  // Get the favorites and wishlist of the member
  const { data: favorites, loading: favoritesLoading, error: favoritesError } = useGetFavorites(memberId);
  const { data: wishlist, loading: wishlistLoading, error: wishlistError } = useGetWishlist(memberId);

  console.log('favorites', favorites);
  console.log('wishlist', wishlist);

  const sectionMap = {
    partners: filteredShops && filteredShops.length > 0
      ? <FilterResult cafes={filteredShops} filters={filters}/>
      : <Partners />, // Use Partners component here
    favorites: <CafeGallery coffeeShops={favorites} loading={favoritesLoading} error={favoritesError} titleText="Your Favorites" />,
    wishlist: <CafeGallery coffeeShops={wishlist} loading={wishlistLoading} error={wishlistError} titleText="Your Wishlist" />,
    visited: <CafeGallery />,
  };

  return sectionMap[section] || <div>Section not found</div>;
}

export default Dashboard;