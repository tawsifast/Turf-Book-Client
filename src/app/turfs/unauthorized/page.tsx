import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
        
        {/* লক বা শিল্ড আইকন */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-50 border border-red-100 text-red-500 animate-bounce">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="360"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* টেক্সট মেসেজ */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Access Denied
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Oops! You do not have permission to view this page. This area is restricted to authorized roles only.
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* নেভিগেশন বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* ইউজারকে তার রোল অনুযায়ী ড্যাশবোর্ডে পাঠানোর বাটন */}
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-3 rounded-xl transition shadow-sm w-full sm:w-auto"
          >
            Back to Home
          </Link>
          
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold px-5 py-3 rounded-xl transition w-full sm:w-auto"
          >
            My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}