"use client";

import { useMemo, useState } from "react";
import TurfCard from "@/components/shared/TurfCard";
import { mockTurfs } from "@/lib/mockData";
import type { Turf, SportType } from "@/types/turf";
import { TurfFilters } from "@/types/filters";


const ITEMS_PER_PAGE = 4;

export default function ExploreTurfsPage() {
  const [filters, setFilters] = useState<TurfFilters>({
    search: "",
    sportType: "all",
    sortBy: "priceLowToHigh",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredTurfs: Turf[] = useMemo(() => {
    let result: Turf[] = [...mockTurfs];

    if (filters.search.trim() !== "") {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (turf: Turf) =>
          turf.name.toLowerCase().includes(query) ||
          turf.location.toLowerCase().includes(query)
      );
    }

    if (filters.sportType !== "all") {
      result = result.filter((turf: Turf) => turf.sportType === filters.sportType);
    }

    if (filters.sortBy === "priceLowToHigh") {
      result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (filters.sortBy === "priceHighToLow") {
      result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    } else {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters]);

  const totalPages: number = Math.ceil(filteredTurfs.length / ITEMS_PER_PAGE);
  const paginatedTurfs: Turf[] = filteredTurfs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleFilterChange<K extends keyof TurfFilters>(key: K, value: TurfFilters[K]): void {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Explore Turfs</h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />

        <select
          value={filters.sportType}
          onChange={(e) => handleFilterChange("sportType", e.target.value as SportType | "all")}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="all">All Sports</option>
          <option value="futsal">Futsal</option>
          <option value="cricket">Cricket</option>
          <option value="badminton">Badminton</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value as TurfFilters["sortBy"])}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="ratingHighToLow">Rating: High to Low</option>
        </select>
      </div>

      {/* Cards */}
      {paginatedTurfs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedTurfs.map((turf: Turf) => (
            <TurfCard key={turf._id} turf={turf} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-16">No turfs match your filters.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg border ${
                currentPage === page
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}