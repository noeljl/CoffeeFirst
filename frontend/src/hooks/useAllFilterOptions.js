import { useState, useEffect } from 'react';
import { getFilterOptions } from '../apis/coffeeshop.js';

export function useAllFilterOptions() {
  const [options, setOptions] = useState({ offers: [], sustainability: [], coffeeVariants: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getFilterOptions()
      .then((data) => {
        setOptions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return [options, loading, error];
}
