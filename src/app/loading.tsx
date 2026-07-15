export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4">
        
        {/* কাস্টম টার্ফ-থিম স্পিনার */}
        <div className="relative flex items-center justify-center">
          {/* বাইরের অ্যানিমেটেড রিং */}
          <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
          {/* ভেতরের ডামি বল আইকন */}
          <div className="absolute text-xs animate-pulse">⚽</div>
        </div>

        {/* লোডিং টেক্সট */}
        <div className="text-center">
          <h3 className="text-sm font-bold text-slate-800 tracking-wide">
            Loading Arena Data...
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}