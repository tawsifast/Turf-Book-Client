// src/components/home/Categories.tsx
import Link from "next/link";

const categories = [
  { icon: "⚽", name: "Futsal", count: "18 Arenas", path: "/turfs?sport=futsal", bg: "bg-emerald-50", text: "text-emerald-700" },
  { icon: "🏏", name: "Cricket", count: "12 Grounds", path: "/turfs?sport=cricket", bg: "bg-amber-50", text: "text-amber-700" },
  { icon: "🏸", name: "Badminton", count: "15 Courts", path: "/turfs?sport=badminton", bg: "bg-sky-50", text: "text-sky-700" },
];

export default function Categories() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Explore by Sport</h2>
        <p className="text-slate-500 text-sm mb-10">Choose your favorite game and find the best nearby venues.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              href={cat.path}
              className="bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition duration-200 flex flex-col items-center group"
            >
              <span className={`text-4xl p-4 rounded-xl ${cat.bg} mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </span>
              <h3 className="font-bold text-lg text-slate-800">{cat.name}</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}