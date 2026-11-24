// Delays (seconds) inside the 12s cycle: one streak, then two, then three.
const STREAK_DELAYS = [2, 7.4];

export default function Scanlines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <div className="scanlines-grid absolute inset-0" />
      <div className="absolute inset-0 opacity-13 backdrop-blur-lg" />
      {STREAK_DELAYS.map((delay) => (
        <div
          key={delay}
          className="scanlines-streak absolute top-0 left-0 hidden w-full md:block"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
