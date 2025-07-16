// useAllCafesGroupedByDistricts.js
// Custom React hook to fetch all cafés grouped by district.
// Returns an object with:
//   - groups: Array of district groups, each containing cafés
//   - loading: Boolean indicating if the fetch is in progress
//   - error: Any error encountered during fetch
//
// Usage:
//   const { groups, loading, error } = useAllCafesGroupedByDistricts();
//
// This hook fetches data once on mount and manages loading and error state internally.

import { useState, useEffect } from 'react';
import { getAllCoffeeShopsGroupedByDistrict } from '../apis/coffeeshop.js';

export function useAllCafesGroupedByDistricts() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllCoffeeShopsGroupedByDistrict()
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { groups, loading, error };
}
