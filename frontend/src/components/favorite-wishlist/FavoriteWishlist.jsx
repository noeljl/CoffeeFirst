import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMemberCafeList } from '../../apis/member';

function FavoriteWishlist({ listType }) {
    const member = useSelector(state => state.auth.member);
    const memberId = member?.member._id;

    const [listName, setListName] = useState("test");
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (listType === 'favoriteCoffeeShops') {
            setListName("Your Favorites");
        } else if (listType === 'wishlistCoffeeShops') {
            setListName("Your Wishlist");
        }

        if (!memberId) return;
        setLoading(true);
        getMemberCafeList(memberId, listType)
            .then(data => {
                setCafes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching list:', error);
                setLoading(false);
            });
    }, [memberId, listType]);


    if (loading) return <div>Loading...</div>;

    return (
        <h2>{listName}</h2>
    )
}

export default FavoriteWishlist;