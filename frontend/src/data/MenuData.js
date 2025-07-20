// dashboardMenu.js
import { FaHeart, FaStar, FaHistory, FaUser, FaMoneyCheck, FaUserCheck, FaSearch } from "react-icons/fa";


const dashboardMenu = [
  {
    title: 'Discover',
    icon: <FaSearch size={25} />,
    link: '/dashboard/discover',
  },
  {
    title: 'Wishlist',
    icon: <FaHeart size={25} />,
    link: '/dashboard/wishlist',
  },
  {
    title: 'Favorites',
    icon: <FaStar size={25} />,
    link: '/dashboard/favorites',
  },
  {
    title: 'Visited',
    icon: <FaHistory size={25} />,
    link: '/dashboard/visited',
  },
  {
    title: 'Checkout',
    icon: <FaUserCheck size={25} />,
    link: '/dashboard/checkout',
  },
]

const settingsMenu = [
  {
    title: 'Personal Info',
    icon: <FaUser size={25} />,
    link: '/account-settings/personal',
  },
  {
    title: 'Membership',
    icon: <FaMoneyCheck size={25} />,
    link: '/account-settings/membership',
  },
]

export { settingsMenu, dashboardMenu }
