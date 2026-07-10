// src/components/shared/TurfCardSkeleton.tsx
export default function TurfCardSkeleton() {
  return (
    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden animate-pulse h-[380px] flex flex-col">
      <div className="w-full h-48 bg-slate-200" />
      <div className="p-5 flex-grow flex flex-col gap-3">
        <div className="h-6 bg-slate-200 rounded-md w-3/4" />
        <div className="h-4 bg-slate-200 rounded-md w-1/2" />
        <div className="h-12 bg-slate-200 rounded-md w-full mt-2" />
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded-md w-10" />
            <div className="h-5 bg-slate-200 rounded-md w-16" />
          </div>
          <div className="h-9 bg-slate-200 rounded-md w-24" />
        </div>
      </div>
    </div>
  );
}