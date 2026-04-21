import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="relative w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-violet opacity-20 blur-[100px] rounded-full pointer-events-none" />

      <h1 className="text-6xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-white via-white/80 to-brand-violet-light drop-shadow-(--shadow-glow-primary)">
        404
      </h1>

      <h2 className="mt-4 text-xl md:text-3xl font-semibold text-white/90">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-white/60 text-base md:text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium text-white transition-all duration-300 backdrop-blur-md shadow-(--shadow-glass-button hover:shadow-(--shadow-glass-button-hover) flex items-center gap-2 group"
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform"
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
