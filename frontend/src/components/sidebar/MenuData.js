import React from "react";
import cup from "../../assets/dashboard-icons/coffee-cup.png";
import wishlist from "../../assets/dashboard-icons/wishlist.svg";
import map from "../../assets/dashboard-icons/map.png";
import favorite from "../../assets/dashboard-icons/favorite.png";

const menuData = [
    {
        title: "Partners",
        icon: cup,
        link: "/dashboard/partners",
    },
    {
        title: "Wishlist",
        icon: wishlist,
        link: "/dashboard/wishlist",
    }, 
    {
        title: "Favorites",
        icon: favorite,
        link: "/dashboard/favorites",
    },
    {
        title: "Visited",
        icon: map,
        link: "/dashboard/visited",
    }
];

const accountData = [
    {
        title: "Partners",
        icon: cup,
        link: "/dashboard/partners",
    },
    {
        title: "Wishlist",
        icon: wishlist,
        link: "/dashboard/wishlist",
    }, 
    {
        title: "Favorites",
        icon: favorite,
        link: "/dashboard/favorites",
    },
    {
        title: "Visited",
        icon: map,
        link: "/dashboard/visited",
    }
];

export default menuData;
export { accountData };