import React, { createContext, useState } from 'react';

// Shape: { type: 'district'|'cafe', name: string } or null
export const SearchContext = createContext({
  searchFilter: null,
  setSearchFilter: () => {}
});

export function SearchProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState(null);

  return (
    <SearchContext.Provider value={{ searchFilter, setSearchFilter }}>
      {children}
    </SearchContext.Provider>
  );
}
