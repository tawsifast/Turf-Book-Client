// src/components/home/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[65vh] min-h-112.5 w-full bg-linear-to-tr from-emerald-50 via-slate-50 to-emerald-100/50 flex items-center overflow-hidden border-b border-slate-100">
      
      {/* Background Subtle Shapes for Premium Look */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-2xl text-left">
          
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-4 animate-fade-in uppercase tracking-wider">
            ⚡ Quick & Reliable Sports Booking
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Find and Book Your <br />
            Perfect <span className="text-emerald-600 bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Sports Turf</span> Instantly
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
            Premium futsal arenas, cricket grounds, and badminton courts await you in Chattogram. Real-time availability, clear pricing, and instant secure confirmations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/turfs"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-lg shadow-slate-900/10 flex items-center gap-2 group text-sm"
            >
              Explore Arenas
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              href="/about"
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold px-6 py-3.5 rounded-xl transition text-sm shadow-sm"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Indicator for scrolling to the next section */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-slate-400">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 animate-pulse">Scroll Down</span>
        <div className="w-1.5 h-6 bg-slate-200 rounded-full relative overflow-hidden">
          <div className="w-full h-2 bg-emerald-500 rounded-full absolute top-0 animate-bounce" />
        </div>
      </div>
    </section>
  );
}