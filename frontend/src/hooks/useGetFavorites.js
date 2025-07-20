import { useState, useEffect, useCallback } from 'react';
import { getMemberCafeList } from '../apis/member.js';

// Hook to manage favorites data with local state updates
export default function useGetFavorites(memberId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch favorites data from server
  const fetchFavorites = useCallback(async () => {
    if (!memberId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getMemberCafeList(memberId, 'favoriteCoffeeShops');
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  // Add cafe to favorites locally (optimistic update)
  const addToFavorites = useCallback((cafeId) => {
    setData(prevData => {
      // Check if cafe is already in favorites
      const exists = prevData.some(cafe => cafe._id === cafeId);
      if (!exists) {
        // Add cafe to local state immediately
        return [...prevData, { _id: cafeId }];
      }
      return prevData;
    });
  }, []);

  // Remove cafe from favorites locally (optimistic update)
  const removeFromFavorites = useCallback((cafeId) => {
    setData(prevData => {
      // Remove cafe from local state immediately
      return prevData.filter(cafe => cafe._id !== cafeId);
    });
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  console.log('All favorites', data);

  return { data, loading, error, addToFavorites, removeFromFavorites };
}
