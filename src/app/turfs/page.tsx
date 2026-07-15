"use client";

import { useEffect, useState, useCallback } from "react";
import TurfCard from "@/components/shared/TurfCard";
import type { SportType, Turf } from "@/types/turf";
import Link from "next/link";

interface RawTurfDocument {
  _id: string;
  title: string;
  location: string;
  sportType: SportType;
  price: number;
  image: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
  status?: string;
}

interface ExtendedTurf extends Turf {
  status?: string;
}

export default function ExploreTurfsPage() {
  const [turfs, setTurfs] = useState<ExtendedTurf[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<SportType | "all">("all");
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<"rating" | "priceLow" | "priceHigh">("rating");
  


  const fetchTurfs = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
    
      const params = new URLSearchParams();
      if (searchQuery.trim() !== "") params.set("search", searchQuery);
      if (selectedSport !== "all") params.set("sportType", selectedSport);
      params.set("maxPrice", String(maxPrice));
      params.set("sortBy", sortBy);

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/allTurfs?${params.toString()}`);
      const resData = await response.json();

      if (resData.success) {
        const normalizedData: ExtendedTurf[] = resData.data.map((item: RawTurfDocument) => ({
          _id: item._id,
          name: item.title,
          location: item.location,
          pricePerHour: item.price,
          sportType: item.sportType,
          image: item.image,
          rating: 4.5,
          isAvailable: true,
          description: item.description ?? "",
          ownerId: item.ownerEmail,
          createdAt: new Date().toISOString(),
          status: item.status || "pending",
        }));
        // ⚡ status filter client-side এই রাখা হলো, যেহেতু আগে বলা হয়েছিল এটা frontend-এই থাকবে
        setTurfs(normalizedData.filter((t) => t.status === "approved"));
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error("Failed to fetch turfs:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedSport, maxPrice, sortBy]);

  // ✅ debounce — প্রতি keystroke এ না, বরং টাইপ করা থামার ৪০০ms পরে fetch হবে
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTurfs();
    }, 400);

    return () => clearTimeout(timer); // আগের timer বাতিল, নতুন keystroke এ
  }, [fetchTurfs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Explore Sports Arenas</h1>
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

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Search Venue</label>
            <input
              type="text"
              placeholder="Search by name or location (e.g. GEC, Agrabad)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Select Sport</label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value as SportType | "all")}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition capitalize"
            >
              <option value="all">All Sports</option>
              <option value="futsal">Futsal</option>
              <option value="cricket">Cricket</option>
              <option value="badminton">Badminton</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "rating" | "priceLow" | "priceHigh")}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            >
              <option value="rating">Top Rated (Default)</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-xs flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span>Max Price Per Hour</span>
              <span className="text-emerald-600 font-extrabold">৳{maxPrice}</span>
            </div>
            <input
              type="range"
              min="400"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="text-xs font-semibold text-slate-400 self-end sm:self-center">
            Showing <span className="text-slate-700 font-bold">{turfs.length}</span> results
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <span className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin inline-block"></span>
          <p className="text-slate-500 text-sm mt-2">Loading Arenas...</p>
        </div>
      ) : hasError ? (
        <div className="text-center py-20 border border-dashed border-red-200 rounded-2xl bg-white">
          <p className="text-red-500 text-sm">Failed to load arenas. Please check if the server is running.</p>
        </div>
      ) : turfs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {turfs.map((turf) => (
            <TurfCard key={turf._id} turf={turf} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-white">
          <span className="text-4xl">🔍</span>
          <h3 className="text-lg font-bold text-slate-800 mt-4">No Arenas Found</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
            Try adjusting your filters or search keywords to find alternative available fields.
          </p>
        </div>
      )}
    </div>
  );
}