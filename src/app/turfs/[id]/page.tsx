"use client";

import { use } from "react";
import { mockTurfs } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface TurfDetailsProps {
  params: Promise<{ id: string }>;
}

export default function TurfDetailsPage({ params }: TurfDetailsProps) {
  // Next.js 15+ এ params আনর‌্যাপ করার জন্য use() ব্যবহার করতে হয়
  const { id } = use(params);
  
  // মক ডাটা থেকে আইডি অনুযায়ী নির্দিষ্ট টার্ফ খুঁজে বের করা
  const turf = mockTurfs.find((t) => t._id === id);

  // টার্ফ পাওয়া না গেলে ৪MD৪ নট ফাউন্ড পেজ শো করবে
  if (!turf) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm font-medium text-slate-500 mb-6">
        <Link href="/turfs" className="hover:text-emerald-600 transition">
          ← Back to All Turfs
        </Link>
      </nav>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Image & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-75 sm:h-112.5 w-full rounded-3xl overflow-hidden shadow-sm">
            <Image
              src={turf.images[0]}
              alt={turf.name}
              fill
              className="object-cover"
              priority
            />
            <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider">
              {turf.sportType}
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{turf.name}</h1>
                <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                  📍 {turf.location}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 font-black px-3 py-1.5 rounded-xl text-sm">
                ⭐ {turf.rating.toFixed(1)}
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">About This Arena</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Experience premium sports facilities at {turf.name}. This venue features FIFA-certified synthetic turf, excellent LED floodlighting for night matches, full backup power, and comfortable sitting zones for substitutes and spectators. Located conveniently at {turf.location}.
              </p>
            </div>

            {/* Included Amenities */}
            <div className="mt-6 border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Available Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Changing Rooms", "Filtered Water", "Free Wi-Fi", "Parking Space", "First Aid Kit"].map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700">
                    ✅ {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Widget Box */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-6">
            <div className="mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black text-slate-900">৳{turf.pricePerHour}</span>
                <span className="text-slate-400 text-sm font-semibold">/ hour</span>
              </div>
            </div>

            {/* Date and Time Form Simulator */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Select Date</label>
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Available Slots</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition">
                  <option>04:00 PM - 05:00 PM</option>
                  <option>05:00 PM - 06:00 PM</option>
                  <option>08:00 PM - 09:00 PM (Premium)</option>
                  <option>09:00 PM - 10:00 PM (Premium)</option>
                </select>
              </div>

              <button 
                onClick={() => alert("Booking mechanics will be connected in the dashboard section!")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/10 transition duration-200 text-sm mt-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}