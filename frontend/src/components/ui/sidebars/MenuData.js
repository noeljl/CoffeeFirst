// dashboardMenu.js
import Icons from "../../../assets/Icons.js";

const dashboardMenu = [
  {
    title: "Partners",
    icon: Icons.coffeeCup,
    link: "/dashboard/partners"
  },
  { 
    title: "Wishlist", 
    icon: Icons.wishlist, 
    link: "/dashboard/wishlist" 
  },
  { 
    title: 
    "Favorites", 
    icon: Icons.favorite, 
    link: "/dashboard/favorites" 
  },
  { 
    title: "Visited", 
    icon: Icons.map, 
    link: "/dashboard/visited" 
  },
  {
    title: "Checkout",
    icon: Icons.checkout, // Stelle sicher, dass ein passendes Icon existiert
    link: "/dashboard/checkOut"
  },
];

const settingsMenu = [
  { 
    title: "Personal Info", 
    icon: Icons.person, 
    link: "/account-settings/personal" 
  },
  { 
    title: "Membership", 
    icon: Icons.recurrence, 
    link: "/account-settings/membership" },
];

export default dashboardMenu;
export { settingsMenu };