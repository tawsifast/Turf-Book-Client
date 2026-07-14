// src/app/page.tsx
import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import TurfCard from "@/components/shared/TurfCard";


export default function HomePage() {
  // ৪ নম্বর রিকোয়ারমেন্ট অনুযায়ী হোম পেজে ৩-৪ টি টপ কার্ড দেখানো
  // const featuredTurfs = mockTurfs.slice(0, 3);

  return (
    <>
      <Hero />
      <Categories />
      
      {/* 4. Core Listing Section / Top Arenas */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Top Rated Arenas</h2>
              <p className="text-slate-500 text-sm mt-1">Handpicked premium fields based on player ratings.</p>
            </div>
          </div>
          
          {/* Responsive grid mapping for your Gorgeous TurfCard */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredTurfs.map((turf) => (
              <TurfCard key={turf._id} turf={turf} />
            ))}
          </div> */}
        </div>
      </section>

      <StatsSection />
      <Features />
      <Testimonials />
      <Newsletter />
    </>
  );
}