// src/components/home/Features.tsx
const features = [
  { title: "Instant Confirmation", desc: "No more waiting for calls. Book and secure your slot in under 60 seconds safely.", icon: "⚡" },
  { title: "Split-Bill Option", desc: "Share the booking cost easily with your teammates directly during checkout.", icon: "💸" },
  { title: "Premium Quality Turfs", desc: "Verified dimensions, top-tier turf mats, floodlights, and pristine changing rooms.", icon: "💎" },
];

export default function Features() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Built For Active Players</h2>
          <p className="text-slate-500 text-sm">Every feature designed to provide a seamless sports event organizing experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat) => (
            <div key={feat.title} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <span className="text-3xl inline-block mb-4">{feat.icon}</span>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}