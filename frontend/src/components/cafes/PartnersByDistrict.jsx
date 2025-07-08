/*import { useEffect, useState, useRef, useCallback } from "react";
//import { useEffect, useState, useRef, useCallback } from "react";
import CafeGallery from "../cafes/CafeGallery";
//import CafeGallery from "../cafes/CafeGallery";
import { getAllCoffeeShopsGroupedByDistrict } from "../../apis/coffeeshop";
import SearchBar from "../../../components/ui/search-bar/SearchBar";

function PartnersByDistrict() {
  const [groupedDistricts, setGroupedDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allDistricts, setAllDistricts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Show first 3 districts initially
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  // holds the last clicked suggestion: { type: 'district'|'cafe', name: string }
  const [searchFilter, setSearchFilter] = useState(null);


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

  useEffect(() => {
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
  }, []);

  // Update visible districts when visibleCount changes
  useEffect(() => {
    if (allDistricts.length > 0) {
      setGroupedDistricts(allDistricts.slice(0, visibleCount));
      setHasMore(visibleCount < allDistricts.length);
    }
  }, [visibleCount, allDistricts]);

  // build a flat list when filtering, else keep the grouped districts
  const displayGroups = (() => {
    if (!searchFilter) {
      // No filter → show all existing groups
      return groupedDistricts;
    }

    // District filter → find that single group
    if (searchFilter.type === 'district') {
      return groupedDistricts
        .filter(g => g._id === searchFilter.name);
    }

    // Café filter → find the one shop within all groups
    const match = groupedDistricts
      .flatMap(g => g.coffeeShops)
      .find(shop => shop.title === searchFilter.name);

    return match
      ? [{ _id: match.title, coffeeShops: [match] }]
      : [];
  })();


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

export default PartnersByDistrict;*/
// File: frontend/src/routes/dashboards/PartnersByDistrict.jsx

import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import CafeGallery from "../cafes/CafeGallery";
import { getAllCoffeeShopsGroupedByDistrict } from "../../apis/coffeeshop";
//import SearchBar from "../../../components/ui/search-bar/SearchBar";
//import SearchBar from "../ui/search-bar/SearchBar";
import { SearchContext } from "../../contexts/SearchContext";

function PartnersByDistrict() {
  // existing state
  const [groupedDistricts, setGroupedDistricts] = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);
  const [allDistricts, setAllDistricts]         = useState([]);
  const [visibleCount, setVisibleCount]         = useState(3);
  const [hasMore, setHasMore]                   = useState(true);
  const observerRef                             = useRef();

  // ─── NEW: track search-bar clicks ───
  //const [searchFilter, setSearchFilter] = useState(null);
  const { searchFilter } = useContext(SearchContext);
  // infinite-scroll intersection observer
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

  // initial fetch
  useEffect(() => {
    getAllCoffeeShopsGroupedByDistrict()
      .then(data => {
        setAllDistricts(data);
        setGroupedDistricts(data.slice(0, visibleCount));
        setHasMore(data.length > visibleCount);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // load more on visibleCount change
  useEffect(() => {
    if (allDistricts.length > 0) {
      setGroupedDistricts(allDistricts.slice(0, visibleCount));
      setHasMore(visibleCount < allDistricts.length);
    }
  }, [visibleCount, allDistricts]);

  // ─── NEW: derive what to render ───
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
    const match = groupedDistricts
      .flatMap(group => group.coffeeShops)
      .find(shop => shop.title === searchFilter.name);

    return match
      ? [{ _id: match.title, coffeeShops: [match] }]
      : [];
  })();

  // loading / error states
  if (loading) return <div>Loading districts…</div>;
  if (error)   return <div>Error loading districts: {error.toString()}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {/* 2) Render either grouped or flat filtered */}
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

      {/* 3) “Load more” indicator only when NOT filtering */}
      {!searchFilter && hasMore && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div>Loading more districts…</div>
        </div>
      )}
    </div>
  );
}

export default PartnersByDistrict;
