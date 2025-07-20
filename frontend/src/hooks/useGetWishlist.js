import { useState, useEffect, useCallback } from 'react';
import { getMemberCafeList } from '../apis/member.js';

// Hook to manage wishlist data with local state updates
export default function useGetWishlist(memberId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch wishlist data from server
  const fetchWishlist = useCallback(async () => {
    if (!memberId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getMemberCafeList(memberId, 'wishlistCoffeeShops');
      setData(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  // Add cafe to wishlist locally (optimistic update)
  const addToWishlist = useCallback((cafeId) => {
    setData(prevData => {
      // Check if cafe is already in wishlist
      const exists = prevData.some(cafe => cafe._id === cafeId);
      if (!exists) {
        // Add cafe to local state immediately
        return [...prevData, { _id: cafeId }];
      }
      return prevData;
    });
  }, []);

  // Remove cafe from wishlist locally (optimistic update)
  const removeFromWishlist = useCallback((cafeId) => {
    setData(prevData => {
      // Remove cafe from local state immediately
      return prevData.filter(cafe => cafe._id !== cafeId);
    });
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  console.log('All wishlist', data);
  return { data, loading, error, addToWishlist, removeFromWishlist };
}
