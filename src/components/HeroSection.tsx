import React from 'react';
import { ArrowUpRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { BlogArticle } from '../types/blog';

interface HeroSectionProps {
  featuredArticle: BlogArticle;
  onSelectArticle: (article: BlogArticle) => void;
  onExploreMap: () => void;
  onOpenGlossary: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredArticle,
  onSelectArticle,
  onExploreMap,
  onOpenGlossary,
}) => {
  return (
    <section className="relative border-b border-[#E6DFD5] bg-[#F7F3EC] overflow-hidden">
      {/* Editorial Gazette Dispatch Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E0D7C9] text-xs uppercase tracking-widest text-[#78716C] font-mono">
          <div>The Bombay Culinary Gazette · Vol. XII</div>
          <div className="flex items-center gap-4">
            <span>Autumn Edition 2026</span>
            <span aria-hidden="true">·</span>
            <span>10 Curated Neighborhood Trails</span>
          </div>
        </div>

        {/* Hero Title & Masthead */}
        <div className="pt-8 pb-10 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9A3412]">
            Field Notes & Gastronomic Cartography
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1F1D1B] text-balance leading-[1.12]">
            Mumbai Food Trails: Cafés, Street Alleys & Secret Spots
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl">
            From sunrise filter kaapi in Matunga to midnight seekh kebabs under the minarets of Mohammed Ali Road. Ten meticulously mapped walking routes through the city’s living culinary memory.
          </p>

          {/* Quick utility jump bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectArticle(featuredArticle)}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors shadow-xs"
            >
              <span>Read Featured Trail</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreMap}
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1F1D1B] bg-white border border-[#DDD5C7] hover:border-[#9A3412] rounded-lg transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#9A3412]" />
              <span>Interactive Transit Map</span>
            </button>
            <button
              onClick={onOpenGlossary}
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#57534E] hover:text-[#1F1D1B] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Street Food Lexicon</span>
            </button>
          </div>
        </div>

        {/* Featured Story Marquee Banner */}
        <div className="pb-10">
          <div
            onClick={() => onSelectArticle(featuredArticle)}
            className="group cursor-pointer block bg-white rounded-xl border border-[#E6DFD5] overflow-hidden hover:border-[#9A3412]/50 hover:shadow-md transition-all duration-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#EAE4D9]">
                <img
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-3 left-4 text-xs text-white/90 font-serif italic lg:hidden">
                  {featuredArticle.neighborhood}
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-[#78716C] mb-3">
                    <span className="font-semibold text-[#9A3412] uppercase tracking-wider">
                      {featuredArticle.kicker}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.neighborhood}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 inline" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1D1B] group-hover:text-[#9A3412] transition-colors text-balance leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-3 text-sm text-[#57534E] leading-relaxed line-clamp-3">
                    {featuredArticle.overview}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#78716C]">
                    <div>
                      <span className="text-[#1F1D1B] font-medium">Route: </span>
                      <span>{featuredArticle.trailMetrics.totalSpots} heritage stops ({featuredArticle.trailMetrics.distanceKm})</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between border-t border-[#F0EAE1]">
                  <div className="text-xs">
                    <span className="font-medium text-[#1F1D1B]">{featuredArticle.author.name}</span>
                    <span className="text-[#78716C]"> — {featuredArticle.author.title}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A3412] group-hover:translate-x-1 transition-transform">
                    Read Trail <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
