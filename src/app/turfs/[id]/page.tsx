"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function TurfDetailPage() {
  const { id } = useParams(); 

  const [turf, setTurf] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchTurfDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/allTurfs/${id}`);
        const resData = await response.json();

        if (resData.success) {
          // ডাটাবেজের 'title' ও 'price' কে ফ্রন্টএন্ড ভ্যারিয়েবলের সাথে নরমালাইজ করা
          const item = resData.data;
          setTurf({
            ...item,
            name: item.name || item.title,
            pricePerHour: item.pricePerHour || item.price,
            rating: item.rating || 4.7,
          });
        } else {
          console.error("Arena not found");
        }
      } catch (error) {
        console.error("Error fetching turf details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTurfDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin inline-block"></span>
        <p className="text-slate-500 text-sm mt-2">Loading details...</p>
      </div>
    );
  }

  if (!turf) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-bold text-slate-800">Arena Not Found</h3>
        <Link href="/turfs" className="text-emerald-600 underline mt-2 inline-block">
          Go Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Navigation */}
      <nav className="text-sm font-medium text-slate-500 mb-6">
        <Link href="/turfs" className="hover:text-emerald-600 transition">
          ← Back to Explore
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Image and Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <img
              src={turf.image || "https://images.unsplash.com/photo-1517649763962-0c623066013b"}
              alt={turf.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100">
                {turf.sportType}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                ⭐ {turf.rating}
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {turf.name}
            </h1>

            <p className="text-slate-500 flex items-start gap-1.5 text-sm">
              📍 <span className="text-slate-600">{turf.location}</span>
            </p>

            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Description & Ground Rules
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {turf.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Sidebar / Summary Widget */}
        <div className="space-y-6">
          <div className=" text-white rounded-3xl p-6 shadow-xl sticky top-6">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Price Rate</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-emerald-400">৳{turf.pricePerHour}</span>
              <span className="text-slate-400 text-xs">/ hour</span>
            </div>

            <div className="border-t border-white/10 my-4 pt-4 space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Availability</span>
                <span className="text-emerald-400 font-bold">Available Now</span>
              </div>
              <div className="flex justify-between">
                <span>Field Quality</span>
                <span>Premium Turf (FIFA Approved)</span>
              </div>
            </div>

            <button 
              onClick={() => alert("Booking functionality coming soon!")}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition duration-200 text-sm mt-2 shadow-lg shadow-emerald-900/20"
            >
              Book This Arena
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}