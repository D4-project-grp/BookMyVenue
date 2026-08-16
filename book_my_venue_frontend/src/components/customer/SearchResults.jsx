import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";

import VenueCard from "./VenueCard";
import "./SearchResults.css";
import { getApprovedVenues } from "../../api/venueService";
export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const eventType = searchParams.get("type") || "";

  const [search, setSearch] = useState(initialSearch);
  const [locality, setLocality] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  const [venues, setVenues] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await getApprovedVenues();
      setVenues(response.data);
    }
    fetchData();
  }, []);

  const localities = [...new Set(venues.map((v) => v.locality))];

  const results = useMemo(() => {
    let list = venues.filter((v) =>
      v.venueName.toLowerCase().includes(search.toLowerCase())
    );
    if (locality) list = list.filter((v) => v.locality === locality);
    if (minCapacity) list = list.filter((v) => v.guest_capacity >= Number(minCapacity));

    const sorted = [...list];

    switch (sortBy) {
      case "price_low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "capacity":
        sorted.sort((a, b) => b.guest_capacity - a.guest_capacity);
        break;
      case "location":
        sorted.sort((a, b) => a.locality.localeCompare(b.locality));
        break;
      default:
        sorted.sort((a, b) => b.popularity - a.popularity);
    }
    return sorted;
  }, [venues, search, locality, minCapacity, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(search ? { search } : {});
  };

  return (
    <div className="container results-page">
      <form className="results-searchbar" onSubmit={handleSearchSubmit}>
        <input
          placeholder="Search venues by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {eventType && <p className="results-context">Showing venues for: <strong>{eventType}</strong></p>}

      <div className="results-layout">
        <aside className="results-filters">
          <h3>Filters</h3>
          <label>Locality</label>
          <select value={locality} onChange={(e) => setLocality(e.target.value)}>
            <option value="">All localities</option>
            {localities.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <label>Minimum guest capacity</label>
          <input
            type="number"
            placeholder="e.g. 200"
            value={minCapacity}
            onChange={(e) => setMinCapacity(e.target.value)}
          />
        </aside>

        <div className="results-main">
          <div className="results-toolbar">
            <span>{results.length} venues found</span>
            <div className="sort-control">
              <label>Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Popularity</option>
                <option value="location">Location</option>
                <option value="capacity">Guest Capacity</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="empty-state">
              <h3>No venues found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="venue-grid">
              {results.map((v) => (
                <VenueCard key={v.venueId} venue={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
