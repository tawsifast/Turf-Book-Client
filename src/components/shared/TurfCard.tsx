import Image from "next/image";
import Link from "next/link"; // 👈 ইমপোর্ট করো
import type { Turf } from "@/types/turf";

interface TurfCardProps {
  turf: Turf;
}

export default function TurfCard({ turf }: TurfCardProps) {
  // console.log(turf.image,"img");
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group">
      {/* Card Image Area */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
           src={turf.image && turf.image.trim() !== "" ? turf.image : "/turfs/placeholder.jpg"}
          alt={turf.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
          {turf.sportType}
        </span>
      </div>

      {/* Card Body Contents */}
      <div className="p-5 grow flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-slate-800 text-base tracking-tight line-clamp-1">
              {turf.name}
            </h3>
            <div className="flex items-center gap-0.5 text-amber-600 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              ⭐ {turf.rating.toFixed(1)}
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-1 flex items-center gap-0.5">
            📍 {turf.location}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Per Hour
            </p>
            <p className="text-slate-900 font-black text-lg">
              ৳{turf.pricePerHour}
            </p>
          </div>

          {/* dynamic Route Link button */}
          <Link
            href={`/turfs/${turf._id}`}
            className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
