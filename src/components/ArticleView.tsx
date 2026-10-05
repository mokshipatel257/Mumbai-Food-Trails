import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Printer,
  Clock,
  Train,
  CheckCircle2,
  Circle,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  Flame,
  Utensils
} from 'lucide-react';
import { BlogArticle, TrailSpot } from '../types/blog';

interface ArticleViewProps {
  article: BlogArticle;
  allArticles: BlogArticle[];
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onBack: () => void;
  onSelectArticle: (article: BlogArticle) => void;
  checkedDishes: Record<string, boolean>;
  onToggleDishCheck: (dishId: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  isSaved,
  onToggleSave,
  onBack,
  onSelectArticle,
  checkedDishes,
  onToggleDishCheck,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAtmosphere, setIsPlayingAtmosphere] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSpotTab, setActiveSpotTab] = useState<string>(article.spots[0]?.id || '');

  // Calculate next article in the series
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const nextArticle = allArticles[(currentIndex + 1) % allArticles.length];

  // Scroll reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="min-h-screen bg-[#FAF7F2] pb-24">
      {/* Reading Progress Top Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-[#9A3412] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Sub-header Navigation Bar */}
      <div className="sticky top-18 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DFD5] py-3 no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#9A3412] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Trails</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Atmospheric Soundscape Player Toggle */}
            <button
              onClick={() => setIsPlayingAtmosphere(!isPlayingAtmosphere)}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isPlayingAtmosphere
                  ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]'
                  : 'bg-white border-[#DDD5C7] text-[#57534E] hover:border-[#9A3412]'
              }`}
              title="Toggle audio atmosphere simulation"
            >
              {isPlayingAtmosphere ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#B45309] animate-pulse" />
                  <span className="hidden sm:inline">Ambience Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Play Ambience</span>
                </>
              )}
            </button>

            {/* Print Guide Button */}
            <button
              onClick={handlePrint}
              className="cursor-pointer p-2 text-[#57534E] hover:text-[#1F1D1B] bg-white border border-[#DDD5C7] rounded-lg transition-colors"
              title="Print Walking Guide"
              aria-label="Print Walking Guide"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleShare}
              className="cursor-pointer relative p-2 text-[#57534E] hover:text-[#1F1D1B] bg-white border border-[#DDD5C7] rounded-lg transition-colors"
              title="Copy trail link"
              aria-label="Copy trail link"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-[#1F1D1B] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow-sm">
                  Copied!
                </span>
              )}
            </button>

            {/* Save / Bookmark Trail */}
            <button
              onClick={() => onToggleSave(article.id)}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-[#9A3412] border-[#9A3412] text-white'
                  : 'bg-white border-[#DDD5C7] text-[#1F1D1B] hover:border-[#9A3412]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{isSaved ? 'Saved' : 'Save Trail'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Atmospheric Audio Player Banner (when active) */}
      {isPlayingAtmosphere && (
        <div className="bg-[#FFFBEB] border-b border-[#FDE68A] py-2.5 px-4 text-xs text-[#92400E] no-print">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-ping" />
              <span className="font-semibold">{article.audioAtmosphere.ambientTitle}:</span>
              <span className="hidden md:inline">{article.audioAtmosphere.description}</span>
            </div>
            <span className="font-mono text-[11px] text-[#B45309]">Field Recording Simulation</span>
          </div>
        </div>
      )}

      {/* Main Editorial Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        {/* Editorial Metadata Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#78716C] mb-4">
            <span className="font-semibold text-[#9A3412]">{article.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{article.neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span>{article.region}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1F1D1B] leading-tight text-balance">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#57534E] font-editorial italic leading-relaxed">
            {article.subtitle}
          </p>

          <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex items-center justify-center gap-4 text-xs text-[#78716C]">
            <span className="font-medium text-[#1F1D1B]">{article.author.name}</span>
            <span aria-hidden="true">·</span>
            <span>{article.author.title}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Hero Visual Presentation */}
        <div className="mt-8 overflow-hidden rounded-xl border border-[#E6DFD5] bg-[#EFE9DF] shadow-xs">
          <div className="relative aspect-[16/9] w-full">
            <img
              src={article.heroImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 bg-white border-t border-[#F0EAE1] text-xs font-editorial italic text-[#78716C] text-center">
            {article.heroImageCaption}
          </div>
        </div>

        {/* Trail Quick Metrics Ribbon */}
        <div className="mt-8 p-5 bg-white rounded-xl border border-[#E6DFD5] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="border-r border-[#F0EAE1] last:border-none">
            <div className="text-[11px] uppercase tracking-wider text-[#78716C]">Stops on Trail</div>
            <div className="mt-1 font-serif text-xl font-bold text-[#1F1D1B]">{article.trailMetrics.totalSpots} Heritage Spots</div>
          </div>
          <div className="border-r border-[#F0EAE1] last:border-none">
            <div className="text-[11px] uppercase tracking-wider text-[#78716C]">Route Distance</div>
            <div className="mt-1 font-serif text-xl font-bold text-[#1F1D1B]">{article.trailMetrics.distanceKm}</div>
          </div>
          <div className="border-r border-[#F0EAE1] last:border-none">
            <div className="text-[11px] uppercase tracking-wider text-[#78716C]">Dietary Focus</div>
            <div className="mt-1 text-sm font-semibold text-[#1F1D1B] flex items-center justify-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-[#9A3412]" />
              {article.trailMetrics.dietaryFocus}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#78716C]">Spice Rating</div>
            <div className="mt-1 text-sm font-semibold text-[#1F1D1B] flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#EA580C]" />
              {article.trailMetrics.spiceIndex}
            </div>
          </div>
        </div>

        {/* Editorial Body Reading Column */}
        <div className="mt-10 max-w-2xl mx-auto">
          {/* Overview with Drop Cap */}
          <div className="text-base sm:text-lg text-[#292524] leading-relaxed">
            <p>
              <span className="float-left text-5xl sm:text-6xl font-serif font-bold text-[#9A3412] leading-none pr-3 pt-1">
                {article.dropCapInitial}
              </span>
              {article.overview.slice(1)}
            </p>
          </div>

          {/* Detailed Editorial Sections */}
          {article.sections.map((section, idx) => (
            <div key={idx} className="mt-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1D1B] mb-4">
                {section.heading}
              </h2>

              <div className="space-y-4 text-base text-[#44403C] leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.pullQuote && (
                <figure className="my-8 pl-6 border-l-2 border-[#9A3412] italic font-serif text-xl sm:text-2xl text-[#1F1D1B] leading-snug">
                  <blockquote>"{section.pullQuote}"</blockquote>
                </figure>
              )}

              {section.highlights && (
                <div className="my-6 p-5 bg-[#F7F3EC] rounded-lg border border-[#E6DFD5]">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#9A3412] mb-3">
                    Curator’s Trail Highlights
                  </div>
                  <ul className="space-y-2 text-sm text-[#44403C]">
                    {section.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[#9A3412] mt-1 font-bold">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trail Stations & Spot Guide Section */}
        <section className="mt-16 pt-12 border-t border-[#E6DFD5]">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9A3412] font-semibold mb-2">
              <Compass className="w-4 h-4" />
              <span>Step-by-Step Walking Itinerary</span>
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#1F1D1B]">
              The {article.neighborhood} Stops
            </h2>
            <p className="mt-2 text-sm text-[#57534E]">
              Pacing recommendation: {article.trailMetrics.suggestedPacing}
            </p>
          </div>

          {/* Interactive Spot Selector Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-none">
            {article.spots.map((spot, index) => (
              <button
                key={spot.id}
                onClick={() => setActiveSpotTab(spot.id)}
                className={`cursor-pointer whitespace-nowrap px-4 py-2 text-xs font-medium rounded-lg transition-colors shrink-0 ${
                  activeSpotTab === spot.id
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#DDD5C7] hover:border-[#9A3412]'
                }`}
              >
                <span>{index + 1}. {spot.name}</span>
              </button>
            ))}
          </div>

          {/* All Spot Cards */}
          <div className="space-y-6">
            {article.spots.map((spot, index) => {
              const isActive = activeSpotTab === spot.id;
              return (
                <div
                  key={spot.id}
                  id={`spot-${spot.id}`}
                  className={`bg-white rounded-xl border p-6 transition-all ${
                    isActive
                      ? 'border-[#9A3412] shadow-md ring-1 ring-[#9A3412]/20'
                      : 'border-[#E6DFD5] hover:border-[#D6CEBE]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#78716C] mb-1">
                        <span className="font-mono font-bold text-[#9A3412]">Stop 0{index + 1}</span>
                        {spot.historicYear && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono">{spot.historicYear}</span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>{spot.neighborhood}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-[#1F1D1B]">
                        {spot.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 sm:text-right">
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold bg-[#FAF7F2] text-[#9A3412] rounded border border-[#E6DFD5]">
                        {spot.budgetLevel} ({spot.priceRange})
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#57534E] pt-3 border-t border-[#F0EAE1]">
                    <div>
                      <span className="font-semibold text-[#1F1D1B]">Address: </span>
                      <span>{spot.address}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#1F1D1B]">Timings: </span>
                      <span>{spot.timing}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Train className="w-3.5 h-3.5 text-[#9A3412]" />
                      <span className="font-semibold text-[#1F1D1B]">Nearest Train: </span>
                      <span>{spot.trainStation}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#1F1D1B]">Best Time: </span>
                      <span>{spot.bestTimeToGo}</span>
                    </div>
                  </div>

                  {/* Signature Dishes List */}
                  <div className="mt-4 pt-3 border-t border-[#F0EAE1]">
                    <span className="text-xs font-semibold text-[#1F1D1B]">Must-Order Signatures: </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {spot.signatureDishes.map((dish, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-xs px-2.5 py-1 bg-[#FAF7F2] text-[#44403C] rounded border border-[#E6DFD5]"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pro-Tip Callout */}
                  <div className="mt-4 p-3.5 bg-[#FFFBEB] rounded-lg border border-[#FDE68A] text-xs text-[#92400E]">
                    <span className="font-bold">Insider Pro-Tip: </span>
                    <span>{spot.proTip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Must-Try Dish Checklist for Travelers */}
        <section className="mt-16 p-6 sm:p-8 bg-white rounded-xl border border-[#E6DFD5] shadow-2xs">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h3 className="font-serif text-2xl font-semibold text-[#1F1D1B]">
              Trail Tasting Checklist
            </h3>
            <p className="mt-1 text-xs text-[#57534E]">
              Track your gastronomic conquests as you walk the trail. Ticked items are saved to your browser.
            </p>
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            {article.checklist.map((item) => {
              const isChecked = !!checkedDishes[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => onToggleDishCheck(item.id)}
                  className={`cursor-pointer w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-[#F0FDF4] border-[#86EFAC]'
                      : 'bg-[#FAF7F2] border-[#E6DFD5] hover:border-[#9A3412]'
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A] fill-current" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#A8A29E]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${isChecked ? 'line-through text-[#15803D]' : 'text-[#1F1D1B]'}`}>
                        {item.dish}
                      </span>
                      <span className="text-xs text-[#78716C] font-mono">@{item.spot}</span>
                    </div>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Next Trail Recommendation Card */}
        <div className="mt-16 p-6 sm:p-8 bg-[#F7F3EC] rounded-xl border border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-6 no-print">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              Continue The Journey
            </div>
            <h4 className="mt-1 font-serif text-xl sm:text-2xl font-semibold text-[#1F1D1B]">
              {nextArticle.title}
            </h4>
            <p className="mt-1 text-xs text-[#57534E]">
              Next trail in {nextArticle.neighborhood} · {nextArticle.readTime}
            </p>
          </div>
          <button
            onClick={() => {
              onSelectArticle(nextArticle);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <span>Read Next Trail</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
