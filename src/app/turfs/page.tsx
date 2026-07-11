"use client";

import { useState, useMemo } from "react";
import { mockTurfs } from "@/lib/mockData";
import TurfCard from "@/components/shared/TurfCard";
import type { SportType } from "@/types/turf";
import Link from "next/link";

export default function ExploreTurfsPage() {
  // স্টেটস (States)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<SportType | "all">("all");
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<"rating" | "priceLow" | "priceHigh">(
    "rating",
  );

  // ফিল্টারিং এবং সর্টিং লজিক (useMemo ব্যবহার করা হয়েছে পারফরম্যান্সের জন্য)
  const filteredAndSortedTurfs = useMemo(() => {
    return mockTurfs
      .filter((turf) => {
        const matchesSearch =
          turf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          turf.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSport =
          selectedSport === "all" || turf.sportType === selectedSport;
        const matchesPrice = turf.pricePerHour <= maxPrice;

        return matchesSearch && matchesSport && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating; // সর্বোচ্চ রেটিং আগে
        if (sortBy === "priceLow") return a.pricePerHour - b.pricePerHour; // কম দাম আগে
        if (sortBy === "priceHigh") return b.pricePerHour - a.pricePerHour; // বেশি দাম আগে
        return 0;
      });
  }, [searchQuery, selectedSport, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      {/* <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Explore Sports Arenas</h1>
        <p className="text-slate-500 text-sm mt-1">Find and book the finest turfs matching your budget and schedule.</p>
      </div> */}
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Explore Sports Arenas
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Find and book the finest turfs matching your budget and schedule.
          </p>
        </div>
        <Link
          href="/turfs/add"
          className="bg-slate-900 hover:bg-emerald-600 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-sm transition-colors duration-200 self-start sm:self-center flex items-center gap-1.5"
        >
          <span>+</span> List Your Turf
        </Link>
      </div>

      {/* Filter and Search Panel Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 1. Search Input */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Search Venue
            </label>
            <input
              type="text"
              placeholder="Search by name or location (e.g. GEC, Agrabad)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          {/* 2. Sport Type Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Select Sport
            </label>
            <select
              value={selectedSport}
              onChange={(e) =>
                setSelectedSport(e.target.value as SportType | "all")
              }
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition capitalize"
            >
              <option value="all">All Sports</option>
              <option value="futsal">Futsal</option>
              <option value="cricket">Cricket</option>
              <option value="badminton">Badminton</option>
            </select>
          </div>

          {/* 3. Sorting Option */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "rating" | "priceLow" | "priceHigh")
              }
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            >
              <option value="rating">Top Rated (Default)</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 4. Price Range Filter (Second Field Constraint) */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-xs flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span>Max Price Per Hour</span>
              <span className="text-emerald-600 font-extrabold">
                ৳{maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="400"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Active Filters Clear Count Banner */}
          <div className="text-xs font-semibold text-slate-400 self-end sm:self-center">
            Showing{" "}
            <span className="text-slate-700 font-bold">
              {filteredAndSortedTurfs.length}
            </span>{" "}
            results
          </div>
        </div>
      </div>

      {/* Turf Listing Grid */}
      {filteredAndSortedTurfs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedTurfs.map((turf) => (
            <TurfCard key={turf._id} turf={turf} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-white">
          <span className="text-4xl">🔍</span>
          <h3 className="text-lg font-bold text-slate-800 mt-4">
            No Arenas Found
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
            Try adjusting your filters or search keywords to find alternative
            available fields.
          </p>
        </div>
      )}
    </div>
  );
}
