export function ErrorCard({ message, onRetry }) {
  return (
    <div className="mt-4 bg-red-900/40 border border-red-500/60 rounded-lg p-3 text-sm text-red-100 flex items-start justify-between gap-3">
      <div>
        <div className="font-semibold mb-1">Ошибка</div>
        <div>{message}</div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-2 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white"
        >
          Повторить
        </button>
      )}
    </div>
  );
}