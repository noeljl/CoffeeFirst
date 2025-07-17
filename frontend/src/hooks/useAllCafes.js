import { useState, useEffect } from 'react';
import { getAllCoffeeShops } from '../apis/coffeeshop.js';

// This hook is used to get all cafes from the database
// It returns an array of cafes, a boolean indicating if the data is loading, and an error if there is one
// The cafes are formatted as an array of objects with the following properties:
// - cafeSlug: the slug of the cafe
// - cafeName: the name of the cafe
// - cafeDistrict: the district of the cafe

export function useAllCafes() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await getAllCoffeeShops();
        setCafes(response);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCafes();
  }, []);

  return [cafes, loading, error];
}
