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
    setLoading(true);
    getAllCoffeeShops()
      .then(response => {
        setCafes(response.map(cafeObj => ({ cafeSlug: cafeObj.slug, cafeName: cafeObj.name, cafeDistrict: cafeObj.district })));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return [cafes, loading, error];
}
