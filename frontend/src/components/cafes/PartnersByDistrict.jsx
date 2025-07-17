
import React, { useState, useRef, useCallback, useContext, useEffect } from "react";
import CafeGallery from "../cafes/CafeGallery";
import { SearchContext } from "../../contexts/SearchContext";
import { useAllCafesGroupedByDistricts } from '../../hooks/useAllCafesGroupedByDistricts';

function PartnersByDistrict() {
  // Use the custom hook to fetch all grouped cafes
  const { groups: allDistricts, loading, error } = useAllCafesGroupedByDistricts();
  const [visibleCount, setVisibleCount] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const [groupedDistricts, setGroupedDistricts] = useState([]);
  const observerRef = useRef();
  const { searchFilter } = useContext(SearchContext);

  // Infinite scroll intersection observer
  const lastDistrictRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setVisibleCount(prev => prev + 2);
      }
    }, { rootMargin: '200px' });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  // Update groupedDistricts and hasMore when allDistricts or visibleCount changes
  useEffect(() => {
    if (allDistricts.length > 0) {
      setGroupedDistricts(allDistricts.slice(0, visibleCount));
      setHasMore(visibleCount < allDistricts.length);
    }
  }, [visibleCount, allDistricts]);

  // Derive what to render based on searchFilter
  const displayGroups = (() => {
    if (!searchFilter) {
      // no search → show paged/infinite groups
      return groupedDistricts;
    }
    if (searchFilter.type === 'district') {
      // district clicked → show that district’s group
      return groupedDistricts.filter(
        group => group._id === searchFilter.name
      );
    }
    // café clicked → find the shop and wrap as a single-group
    const matched = groupedDistricts
      .flatMap(group => group.coffeeShops)
      .filter(shop =>
        shop.name.toLowerCase().includes(
          searchFilter.name.toLowerCase()
        )
      );
    return matched.length > 0
      ? [{ _id: `Results for "${searchFilter.name}"`, coffeeShops: matched }]
      : [];
  })();

  // loading / error states
  if (loading) return <div>Loading districts…</div>;
  if (error)   return <div>Error loading districts: {error.toString()}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {/* Render either grouped or flat filtered */}
      {displayGroups.map((districtGroup, idx) => (
        <div
          key={districtGroup._id}
          // only attach infinite-scroll when NOT filtering
          ref={!searchFilter && idx === displayGroups.length - 1
            ? lastDistrictRef
            : null}
          style={{
            marginBottom: 48,
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: "bold" }}>
            {districtGroup._id}
          </h2>
          <CafeGallery coffeeShops={districtGroup.coffeeShops} />
        </div>
      ))}

      {/* “Load more” indicator only when NOT filtering */}
      {!searchFilter && hasMore && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div>Loading more districts…</div>
        </div>
      )}
    </div>
  );
}

export default PartnersByDistrict;
