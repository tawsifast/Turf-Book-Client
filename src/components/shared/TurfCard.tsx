// src/components/shared/TurfCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Turf } from "@/types/turf";

interface TurfCardProps {
  turf: Turf;
}

export default function TurfCard({ turf }: TurfCardProps) {
  return (
    // white bg, soft border, and clean shadow-sm on hover
    <div className="group relative border border-slate-200 bg-white rounded-2xl overflow-hidden hover:border-emerald-500 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-100">
        <Image
          src={turf.images[0] ?? "/turfs/placeholder.jpg"}
          alt={turf.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-full text-emerald-700 border border-slate-200 shadow-sm capitalize">
          {turf.sportType}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {turf.name}
          </h3>
          <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
            <span>★</span>
            <span>{turf.rating}</span>
          </div>
        </div>

        <p className="text-slate-500 text-xs flex items-center gap-1 mb-3">
          📍 {turf.location}
        </p>

        <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">
          {turf.description}
        </p>

        {/* Action / Price Section */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Per Hour</p>
            <p className="text-lg font-extrabold text-emerald-600">৳{turf.pricePerHour}</p>
          </div>
          
          <Link
            href={`/turfs/${turf._id}`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}