import React from 'react';
import { Bookmark, Clock, ArrowRight, MapPin } from 'lucide-react';
import { BlogArticle } from '../types/blog';

interface ArticleCardProps {
  article: BlogArticle;
  isSaved: boolean;
  onSelect: (article: BlogArticle) => void;
  onToggleSave: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isSaved,
  onSelect,
  onToggleSave,
}) => {
  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer flex flex-col bg-white rounded-xl border border-[#E6DFD5] hover:border-[#9A3412]/50 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Visual Header with Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFE9DF]">
        <img
          src={article.heroImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          onError={(e) => {
            // Elegant CSS/SVG fallback container if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Quick bookmark button (with stopPropagation) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(article.id);
          }}
          className={`cursor-pointer absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-[#9A3412] text-white shadow-sm'
              : 'bg-white/80 text-[#57534E] hover:text-[#9A3412] hover:bg-white'
          }`}
          aria-label={isSaved ? 'Remove from saved trails' : 'Save trail for later'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Subtle region indicator */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded text-[11px] text-white font-medium">
          {article.region}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata Discipline */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] mb-2">
            <span className="font-semibold text-[#9A3412] tracking-wider uppercase">
              {article.kicker}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 inline" />
              {article.readTime}
            </span>
          </div>

          <h3 className="font-serif text-xl font-semibold text-[#1F1D1B] group-hover:text-[#9A3412] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-3">
            {article.overview}
          </p>
        </div>

        {/* Trail Route Highlights */}
        <div className="mt-4 pt-3 border-t border-[#F0EAE1]">
          <div className="flex items-center justify-between text-xs text-[#78716C] mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#9A3412]" />
              <span>{article.trailMetrics.totalSpots} Stops</span>
              <span aria-hidden="true">·</span>
              <span>{article.trailMetrics.distanceKm}</span>
            </div>
            <span className="font-mono text-[11px] font-medium text-[#1F1D1B]">
              {article.spots[0]?.budgetLevel} {article.spots[0]?.priceRange.split(' ')[0]}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#FAF7F2]">
            <span className="text-[#78716C] font-mono text-[11px]">
              {article.publishedDate}
            </span>
            <span className="font-semibold text-[#9A3412] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore Trail <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
