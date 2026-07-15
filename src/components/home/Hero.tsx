// src/components/home/Hero.tsx
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  // সার্ভার সাইড ডেটা (CSS অ্যানিমেশনের মাধ্যমে এগুলো ফেইড ইন/আউট হবে)
  const sports = ["Futsal Arenas", "Cricket Grounds", "Badminton Courts"];

  return (
    <section className="relative h-[65vh] min-h-125 w-full bg-linear-to-tr from-emerald-50 via-slate-50 to-emerald-100/50 flex items-center overflow-hidden border-b border-slate-100">
      
      {/* ১. স্লাইডার ইমেজ ব্যাকগ্রাউন্ড (Pure CSS Animation - Server Safe) */}
      <div className="absolute inset-0 z-0 hidden lg:block w-1/2 left-1/2">
        <div className="absolute inset-0 opacity-20 transition-all duration-1000">
          <Image
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200"
            alt="Premium Sports Turf"
            fill
            className="object-cover object-center animate-pulse"
            priority
          />
        </div>
        {/* ফেড ইফেক্টের জন্য গ্রেডিয়েন্ট ওভারলে */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-50 via-transparent to-transparent" />
      </div>

      {/* Background Subtle Shapes */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-2xl text-left">
          
          {/* Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 animate-fade-in uppercase tracking-wider">
              ⚡ Quick & Reliable Sports Booking
            </span>
          </div>

          {/* Headline (Interactive CSS Dynamic Text Layer) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Find and Book Your <br />
            Perfect{" "}
            <span className="text-emerald-600 bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline">
              Sports Turf
            </span>{" "}
            Instantly
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
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
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

      {/* Visual Flow Indicator for scrolling to the next section */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-slate-400 z-10">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 animate-pulse">Scroll Down</span>
        <div className="w-1.5 h-6 bg-slate-200 rounded-full relative overflow-hidden">
          <div className="w-full h-2 bg-emerald-500 rounded-full absolute top-0 animate-bounce" />
        </div>
      </div>
    </section>
  );
}