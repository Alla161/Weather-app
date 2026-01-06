export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="mt-2 p-4 rounded-xl bg-slate-200/80 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1">
          <div className="h-4 bg-slate-300 dark:bg-slate-500/60 rounded w-2/3 mb-2" />
          <div className="h-6 bg-slate-300 dark:bg-slate-500/60 rounded w-1/3" />
        </div>
        <div className="w-16 h-16 bg-slate-300 dark:bg-slate-500/60 rounded-full" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-3 bg-slate-300 dark:bg-slate-500/60 rounded w-full"
          />
        ))}
      </div>
    </div>
  );
}