export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none">
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring */}
        <div className="w-16 h-16 rounded-full border-2 border-accent/20 animate-ping absolute" />
        {/* Spinning indicator */}
        <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted font-light animate-pulse">
        Loading Space...
      </p>
    </div>
  );
}
