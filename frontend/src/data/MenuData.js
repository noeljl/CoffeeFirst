// dashboardMenu.js
import { FaStoreAlt, FaHeart, FaStar, FaHistory, FaUser, FaMoneyCheck, FaUserCheck } from "react-icons/fa";


const dashboardMenu = [
  {
    title: 'Partners',
    icon: <FaStoreAlt size={25} />,
    link: '/dashboard/partners',
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
