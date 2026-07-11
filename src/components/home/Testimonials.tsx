// src/components/home/Testimonials.tsx
const reviews = [
  { name: "Tahsan Ahmed", role: "Futsal Captain", quote: "Booking slots at Agrabad Arena was a nightmare. This app solved it instantly. Highly recommended!", rating: "★★★★★" },
  { name: "Sajid Hasan", role: "Corporate Player", quote: "We book GEC Cricket ground every Friday. The payment and confirmation are completely seamless.", rating: "★★★★★" },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">What Captains Say</h2>
          <p className="text-slate-500 text-sm">Join thousands of team leaders who book their matches smoothly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((rev) => (
            <div key={rev.name} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <p className="text-slate-600 text-sm italic mb-4">{rev.quote}</p>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{rev.name}</h4>
                  <p className="text-xs text-slate-400">{rev.role}</p>
                </div>
                <span className="text-amber-500 text-sm font-bold tracking-tight">{rev.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}