import React from 'react';
import { Bookmark, Compass } from 'lucide-react';
import { Link } from '../utils/router';

interface NavbarProps {
  currentPath: string;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand title wordmark (single text element) */}
        <Link
          href="/"
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1D1B] group-hover:text-[#9A3412] transition-colors">
            Bombay Flavours
          </span>
        </Link>

        {/* Zone 2: 4-6 text navigation links with unique URLs */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          <Link
            href="/"
            className={`cursor-pointer pb-1 transition-colors ${
              currentPath === '/'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            All Trails
          </Link>
          <Link
            href="/irani-cafes"
            className={`cursor-pointer pb-1 transition-colors ${
              currentPath === '/irani-cafes'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            Irani Cafés
          </Link>
          <Link
            href="/street-food"
            className={`cursor-pointer pb-1 transition-colors ${
              currentPath === '/street-food'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            Street Food
          </Link>
          <Link
            href="/trail-map"
            className={`cursor-pointer pb-1 flex items-center gap-1.5 transition-colors ${
              currentPath === '/trail-map'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            <Compass className="w-4 h-4" />
            Trail Map
          </Link>
          <Link
            href="/food-glossary"
            className={`cursor-pointer pb-1 transition-colors ${
              currentPath === '/food-glossary'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            Food Glossary
          </Link>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/saved-trails"
            className={`cursor-pointer relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors shadow-2xs ${
              currentPath === '/saved-trails'
                ? 'bg-[#9A3412] border-[#9A3412] text-white'
                : 'bg-white text-[#1F1D1B] border-[#DDD5C7] hover:border-[#9A3412] hover:text-[#9A3412]'
            }`}
            aria-label="View saved food trails"
          >
            <Bookmark className={`w-3.5 h-3.5 ${currentPath === '/saved-trails' ? 'text-white' : 'text-[#9A3412]'}`} />
            <span className="whitespace-nowrap">My Saved Trail</span>
            {savedCount > 0 && (
              <span className={`ml-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                currentPath === '/saved-trails' ? 'bg-white text-[#9A3412]' : 'bg-[#9A3412] text-white'
              }`}>
                {savedCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
