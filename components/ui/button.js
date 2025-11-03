export function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition ${className}`}
    >
      {children}
    </button>
  );
}
