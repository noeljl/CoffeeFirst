import React from "react";
// import cup from "../../assets/coffee-cup.png";
// import wishlist from "../../assets/wishlist.svg";
// import map from "../../assets/map.png";
// import favorite from "../../assets/favorite.png";

import Icons from "../../assets/Icons.js";

const menuData = [
    {
        title: "Partners",
        icon: Icons.coffeeCup,
        link: "/dashboard/partners",
    },
    {
        title: "Wishlist",
        icon: Icons.wishlist,
        link: "/dashboard/wishlist",
    }, 
    {
        title: "Favorites",
        icon: Icons.favorite,
        link: "/dashboard/favorites",
    },
    {
        title: "Visited",
        icon: Icons.map,
        link: "/dashboard/visited",
    }
];

const accountData = [
    {
        title: "Partners",
        icon: Icons.coffeeCup,
        link: "/dashboard/partners",
    },
    {
        title: "Wishlist",
        icon: Icons.wishlist,
        link: "/dashboard/wishlist",
    }, 
    {
        title: "Favorites",
        icon: Icons.favorite,
        link: "/dashboard/favorites",
    },
    {
        title: "Visited",
        icon: Icons.map,
        link: "/dashboard/visited",
    }
];

export default menuData;
export { accountData };