import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMemberCafeList } from '../../apis/member';
import CafeOverview from '../cafes/CafeOverview';

function FavoriteWishlist({ listType }) {
    const member = useSelector(state => state.auth.member);
    const memberId = member?.member.
        id;

    const [listName, setListName] = useState("test");
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (listType === 'favorites') {
            setListName("Your Favorites");
        } else if (listType === 'wishlist') {
            setListName("Your Wishlist");
        }


    }, [listType]);

    useEffect(() => {
        if (!memberId) return;
        setLoading(true);
        getMemberCafeList(memberId, listType)
            .then(data => {
                setCafes(data);
                setLoading(false);
                console.log("The café data is:", data);
            })
            .catch(error => {
                console.error('Error fetching list:', error);
                setLoading(false);
            });
    }, [memberId, listType]);


    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="favorite-wishlist-title">{listName}</h2>
            <CafeOverview cafes={cafes} />
        </div>
    )
}

export default FavoriteWishlist;