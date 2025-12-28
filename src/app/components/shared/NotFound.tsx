import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#2a2628] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-['Instrument_Serif:Regular',sans-serif] text-6xl md:text-8xl text-white mb-4">
          404
        </h1>
        <h2 className="font-['Instrument_Serif:Regular',sans-serif] text-2xl md:text-4xl text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-[#c2c2c2] mb-8 font-['Inter:Regular',sans-serif] text-base md:text-lg leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#8b8b8b] hover:bg-[#00a1ff] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}


