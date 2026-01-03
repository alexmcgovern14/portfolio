import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#2a2628] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-['Instrument_Serif:Regular',sans-serif] text-6xl md:text-8xl text-white mb-4">
          404
        </h1>
        <p className="text-[#D6D6D6] mb-8 font-['Inter:Regular',sans-serif] text-base md:text-lg leading-relaxed">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white hover:text-[#7ACAFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7ACAFF] focus:ring-offset-2 focus:ring-offset-[#2a2628] rounded-lg px-4 py-2"
        >
          <span>Back to homepage</span>
        </Link>
      </div>
    </div>
  );
}