import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="relative w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-violet opacity-20 blur-[100px] rounded-full pointer-events-none" />

      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-white via-white/80 to-brand-violet-light drop-shadow-(--shadow-glow-primary)">
        404
      </h1>

      <h2 className="mt-3 text-lg md:text-2xl font-semibold text-white/90">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-sm text-white/60 text-sm md:text-base">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium text-white transition-all duration-300 backdrop-blur-md shadow-(--shadow-glass-button hover:shadow-(--shadow-glass-button-hover) flex items-center gap-2 group"
      >
        <svg
          className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>
    </main>
  );
}
