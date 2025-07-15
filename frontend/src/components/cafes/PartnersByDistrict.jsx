
import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import CafeGallery from "../cafes/CafeGallery";
import { getAllCoffeeShopsGroupedByDistrict } from "../../apis/coffeeshop";
//import SearchBar from "../../../components/ui/search-bar/SearchBar";
//import SearchBar from "../ui/search-bar/SearchBar";
import { SearchContext } from "../../contexts/SearchContext";
import { useParams, useLocation } from "react-router-dom";

function PartnersByDistrict() {
  // existing state
  const [allDistricts, setAllDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const location = useLocation();
  const { searchFilter, setSearchFilter } = useContext(SearchContext);

  // On mount, sync filter from navigation state if present
  useEffect(() => {
    if (location.state && location.state.searchFilter) {
      setSearchFilter(location.state.searchFilter);
    }
  }, [location.state, setSearchFilter]);

  // initial fetch
  useEffect(() => {
    getAllCoffeeShopsGroupedByDistrict()
      .then(data => {
        setAllDistricts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // load more on visibleCount change (for infinite scroll)
  useEffect(() => {
    if (allDistricts.length > 0) {
      setHasMore(visibleCount < allDistricts.length);
    }
  }, [visibleCount, allDistricts]);

  // ─── Always compute what to render based on latest searchFilter and allDistricts ───
  const displayGroups = (() => {
    if (!searchFilter) {
      // no search → show paged/infinite groups
      return allDistricts.slice(0, visibleCount);
    }
    if (searchFilter.type === 'district') {
      // district clicked → show that district’s group
      return allDistricts.filter(
        group => group._id === searchFilter.name
      );
    }
    // café clicked → find the shop and wrap as a single-group
    const matched = allDistricts
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
      {/* 2) Render either grouped or flat filtered */}
      {displayGroups.map((districtGroup, idx) => (
        <div
          key={districtGroup._id}
          // only attach infinite-scroll when NOT filtering
          ref={!searchFilter && idx === displayGroups.length - 1
            ? observerRef
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
