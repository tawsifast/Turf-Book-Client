// src/components/home/Newsletter.tsx
"use client"
export default function Newsletter() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-emerald-600/10">
          <h2 className="text-3xl font-black tracking-tight mb-2">Ready to Take the Field?</h2>
          <p className="text-emerald-100 text-sm max-w-md mx-auto mb-6">
            Subscribe to get instant alerts on newly opened arenas and exclusive weekend slot discounts.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-emerald-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
              required
            />
            <button type="submit" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition text-sm whitespace-nowrap">
              Join Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}