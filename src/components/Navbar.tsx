import React from 'react';
import { Bookmark, Compass } from 'lucide-react';

interface NavbarProps {
  activeTab: 'all' | 'irani' | 'street' | 'map' | 'glossary';
  setActiveTab: (tab: 'all' | 'irani' | 'street' | 'map' | 'glossary') => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSavedDrawer,
  onOpenGlossary,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand title wordmark (single text element) */}
        <button
          onClick={() => setActiveTab('all')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1D1B] group-hover:text-[#9A3412] transition-colors">
            Bombay Flavours
          </span>
        </button>

        {/* Zone 2: 4-6 text navigation links with subtle hover states */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          <button
            onClick={() => setActiveTab('all')}
            className={`cursor-pointer pb-1 transition-colors ${
              activeTab === 'all'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            All Trails
          </button>
          <button
            onClick={() => setActiveTab('irani')}
            className={`cursor-pointer pb-1 transition-colors ${
              activeTab === 'irani'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            Irani Cafés
          </button>
          <button
            onClick={() => setActiveTab('street')}
            className={`cursor-pointer pb-1 transition-colors ${
              activeTab === 'street'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            Street Food
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`cursor-pointer pb-1 flex items-center gap-1.5 transition-colors ${
              activeTab === 'map'
                ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-[#1F1D1B]'
            }`}
          >
            <Compass className="w-4 h-4" />
            Trail Map
          </button>
          <button
            onClick={onOpenGlossary}
            className="cursor-pointer pb-1 text-[#57534E] hover:text-[#1F1D1B] transition-colors"
          >
            Food Glossary
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSavedDrawer}
            className="cursor-pointer relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1F1D1B] bg-white border border-[#DDD5C7] rounded-lg hover:border-[#9A3412] hover:text-[#9A3412] transition-colors shadow-2xs"
            aria-label="View saved food trails"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#9A3412]" />
            <span className="whitespace-nowrap">My Saved Trail</span>
            {savedCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#9A3412] rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
