import { useState, useEffect } from 'react';
import { getAllDistricts } from '../apis/coffeeshop.js';

// This hook is used to get all districts from the database
// It returns an array of districts, a boolean indicating if the data is loading, and an error if there is one
// The districts are formatted as an array of objects with the following properties:
// - districtName: the name of the district

export function useAllDistricts() {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllDistricts()
      .then(response => {
        setDistricts(response.map(districtObj => ({ districtName: districtObj._id })));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return [districts, loading, error];
}
