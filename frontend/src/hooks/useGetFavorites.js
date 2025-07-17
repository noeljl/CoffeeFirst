import { useState, useEffect } from 'react';
import { getMemberCafeList } from '../apis/member.js';

// Gets all entries of favorites of a member

export default function useGetFavorites(memberId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const favoriteList = async () => {
        try {
            const response = await getMemberCafeList(memberId, 'favoriteCoffeeShops')
            setData(response)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }
    favoriteList()
  }, [memberId]);

  console.log('All favorites', data);

  return [ data, loading, error ];
}
