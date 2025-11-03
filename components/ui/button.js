export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium shadow-sm transition-all
      bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
