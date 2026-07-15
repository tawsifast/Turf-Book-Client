import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
        
        {/* ৪MD ইলাস্ট্রেশন/আইকন */}
        <div className="mx-auto flex flex-col items-center justify-center">
          <span className="text-7xl font-black text-emerald-600 tracking-tighter">404</span>
          <div className="mt-2 text-3xl">🏟️❌</div>
        </div>

        {/* টেক্সট মেসেজ */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            The arena or page you are looking for doesn`t exist, has been removed, or the link is broken.
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* হোমপেজে ফেরার বাটন */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition shadow-sm w-full sm:w-auto"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}