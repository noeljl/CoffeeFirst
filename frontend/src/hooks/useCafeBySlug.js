import { useState, useEffect } from 'react';
import { getCoffeeShopBySlug } from '../apis/coffeeshop.js';

export function useCafeBySlug(cafeSlug) {
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCoffeeShopBySlug(cafeSlug)
      .then(data => {
        setCafe(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [cafeSlug]);

  return { cafe, loading, error };
}
