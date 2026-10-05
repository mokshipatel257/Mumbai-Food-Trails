import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Printer, MapPin, Clock } from 'lucide-react';
import { BlogArticle } from '../types/blog';

interface SavedTrailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticleIds: string[];
  allArticles: BlogArticle[];
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
  onSelectArticle: (article: BlogArticle) => void;
}

export const SavedTrailsDrawer: React.FC<SavedTrailsDrawerProps> = ({
  isOpen,
  onClose,
  savedArticleIds,
  allArticles,
  onRemoveSaved,
  onClearAll,
  onSelectArticle,
}) => {
  if (!isOpen) return null;

  const savedArticles = allArticles.filter((a) => savedArticleIds.includes(a.id));
  const totalStops = savedArticles.reduce((acc, curr) => acc + curr.spots.length, 0);

  const handlePrintItinerary = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E6DFD5] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E6DFD5] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#9A3412] fill-current" />
                <h2 className="font-serif text-xl font-semibold text-[#1F1D1B]">
                  My Saved Trails
                </h2>
              </div>
              <button
                onClick={onClose}
                className="cursor-pointer p-1.5 rounded-lg text-[#78716C] hover:text-[#1F1D1B] hover:bg-[#FAF7F2]"
                aria-label="Close saved drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {savedArticles.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#78716C]">
                <div>
                  <span className="font-bold text-[#1F1D1B]">{savedArticles.length}</span> Trails Saved
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span className="font-bold text-[#1F1D1B]">{totalStops}</span> Heritage Spots
                </div>
                <button
                  onClick={onClearAll}
                  className="cursor-pointer text-[#DC2626] hover:underline"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedArticles.length === 0 ? (
              <div className="text-center py-16">
                <Bookmark className="w-10 h-10 text-[#DDD5C7] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-semibold text-[#1F1D1B]">
                  No Saved Trails Yet
                </h3>
                <p className="text-xs text-[#57534E] max-w-xs mx-auto mt-1">
                  Click the bookmark icon on any food trail to build your custom Mumbai culinary walking itinerary.
                </p>
              </div>
            ) : (
              savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 bg-white rounded-xl border border-[#E6DFD5] hover:border-[#9A3412]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#78716C] mb-1">
                      <span className="font-semibold text-[#9A3412]">{article.kicker}</span>
                      <button
                        onClick={() => onRemoveSaved(article.id)}
                        className="cursor-pointer text-[#A8A29E] hover:text-[#DC2626]"
                        aria-label="Remove trail"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif text-base font-semibold text-[#1F1D1B] leading-snug">
                      {article.title}
                    </h4>

                    <div className="mt-2 flex items-center gap-3 text-xs text-[#78716C]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#9A3412]" />
                        {article.neighborhood}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.spots.length} Stops
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#78716C]">
                      {article.trailMetrics.suggestedPacing.split('(')[0]}
                    </span>
                    <button
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="cursor-pointer text-xs font-semibold text-[#9A3412] flex items-center gap-1 hover:underline"
                    >
                      <span>Open Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedArticles.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E6DFD5] space-y-3">
              <button
                onClick={handlePrintItinerary}
                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Pocket Itinerary</span>
              </button>
              <p className="text-[11px] text-center text-[#78716C]">
                Ready to take on Mumbai local trains and street gallis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
