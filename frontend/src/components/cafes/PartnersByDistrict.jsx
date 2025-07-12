import { useLocation } from "react-router-dom"; // ← Add this at top
import { useEffect, useState, useRef, useCallback } from "react";
import CafeGallery from "../cafes/CafeGallery";
import { getAllCoffeeShopsGroupedByDistrict } from "../../apis/coffeeshop";

function PartnersByDistrict() {
  const location = useLocation(); // ← To access passed state
  const filteredShops = location.state?.filteredShops;
  const [groupedDistricts, setGroupedDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allDistricts, setAllDistricts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Show first 3 districts initially
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  const groupByDistrict = (shops) => {
    const districtMap = {};
    for (const shop of shops) {
      const district = shop.district || 'Unknown';
      if (!districtMap[district]) districtMap[district] = [];
      districtMap[district].push(shop);
    }
    return Object.entries(districtMap).map(([district, shops]) => ({
      _id: district,
      coffeeShops: shops,
    }));
  };

  useEffect(() => {
    // If filtered data is passed, group it by district directly
    if (filteredShops) {
      const grouped = groupByDistrict(filteredShops);
      setGroupedDistricts(grouped);
      setAllDistricts(grouped);
      setHasMore(false); // No pagination for filtered results
      setLoading(false);
    } else {
      // Otherwise fetch all with pagination
      getAllCoffeeShopsGroupedByDistrict()
        .then((data) => {
          setAllDistricts(data);
          setGroupedDistricts(data.slice(0, visibleCount));
          setHasMore(data.length > visibleCount);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [filteredShops, visibleCount]);

  // Intersection Observer for infinite scrolling
  const lastDistrictRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setVisibleCount(prev => prev + 2); // Load 2 more districts
      }
    }, {
      rootMargin: '200px' // Trigger loading 200px before reaching the end for smoother experience
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);



  if (loading) return <div>Loading districts...</div>;
  if (error) return <div>Error loading districts: {error.toString()}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {groupedDistricts.map((districtGroup, index) => (
        <div 
          key={districtGroup._id} 
          style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 20 }}
          ref={index === groupedDistricts.length - 1 ? lastDistrictRef : null}
        >
          <h2 style={{ fontSize: 20, fontWeight: "bold"}}>{districtGroup._id}</h2>
          <CafeGallery coffeeShops={districtGroup.coffeeShops} />
        </div>
      ))}
      {hasMore && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div>Loading more districts...</div>
        </div>
      )}
    </div>
  );
}

export default PartnersByDistrict;