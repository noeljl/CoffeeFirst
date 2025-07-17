import { useState, useEffect } from 'react';
import { getMemberCafeList } from '../apis/member.js';

// Gets all entries of wishlist of a member

export default function useGetWishlist(memberId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!memberId) return;
    setLoading(true);
    setError(null);
    getMemberCafeList(memberId, 'wishlistCoffeeShops')
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [memberId]);

  console.log('All wishlist', data);
  return [ data, loading, error ];
}
