import React from 'react';
import { Search, X } from 'lucide-react';
import { Region } from '../types/blog';

interface TrailFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  matchingCount: number;
  totalCount: number;
}

const CATEGORIES = [
  { id: 'all', label: 'All Trails' },
  { id: 'irani', label: 'Irani Cafés & Heritage' },
  { id: 'street', label: 'Street Food & Khau Gallis' },
  { id: 'breakfast', label: 'Dawn Coffee & Breakfast' },
  { id: 'coastal', label: 'Coastal Seafood' },
  { id: 'bakes', label: 'Bakes & Sweets' },
];

const REGIONS: Array<{ id: string; label: string }> = [
  { id: 'all', label: 'All Mumbai' },
  { id: 'South Bombay', label: 'South Bombay' },
  { id: 'Central Suburbs', label: 'Central (Dadar/Matunga)' },
  { id: 'Western Suburbs', label: 'Western (Bandra/Parle)' },
  { id: 'Eastern Suburbs', label: 'Eastern (Ghatkopar)' },
  { id: 'Coastal Fringe', label: 'Coastal Fringe' },
];

export const TrailFilterBar: React.FC<TrailFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  matchingCount,
  totalCount,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input with functional affordance */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish (e.g. Berry Pulao, Vada Pav, Sol Kadhi) or spot..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#DDD5C7] rounded-lg text-xs text-[#1F1D1B] placeholder-[#A8A29E] focus:outline-none focus:border-[#9A3412] focus:ring-1 focus:ring-[#9A3412]/30 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1F1D1B]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter status label */}
        <div className="text-xs text-[#78716C] font-mono whitespace-nowrap self-end md:self-auto">
          Showing <span className="font-bold text-[#1F1D1B]">{matchingCount}</span> of {totalCount} Trails
        </div>
      </div>

      {/* Category Segmented Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer whitespace-nowrap px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
                  isActive
                    ? 'bg-[#1F1D1B] text-white shadow-2xs'
                    : 'bg-white text-[#57534E] border border-[#DDD5C7] hover:border-[#9A3412] hover:text-[#1F1D1B]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Region Dropdown Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-[#78716C] font-medium whitespace-nowrap">Region:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="cursor-pointer bg-white border border-[#DDD5C7] text-xs text-[#1F1D1B] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#9A3412]"
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
