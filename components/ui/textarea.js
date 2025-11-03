export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full min-h-[120px] p-3 border border-neutral-300 rounded-lg
      focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none
      shadow-sm bg-white/90 backdrop-blur-sm ${className}`}
      {...props}
    />
  );
}
