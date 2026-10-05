import React, { useState } from 'react';
import { X, Search, Sparkles, MapPin, Volume2 } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/glossary';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredItems = GLOSSARY_ITEMS.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.culturalLore.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div className="relative bg-[#FAF7F2] rounded-2xl border border-[#E6DFD5] max-w-2xl w-full text-left overflow-hidden shadow-2xl p-6 sm:p-8 my-8">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#E6DFD5]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Bombay Gastronomic Lexicon</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-[#1F1D1B]">
                Street Food Glossary & Dialect
              </h2>
              <p className="text-xs text-[#57534E] mt-1">
                Essential vocabulary, colloquial slang, and culinary lore for navigating Mumbai’s food trails.
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer p-1.5 rounded-lg text-[#78716C] hover:text-[#1F1D1B] hover:bg-white"
              aria-label="Close glossary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search term (e.g. Brun Maska, Thecha, Sukha Puri, Khau Galli)..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#DDD5C7] rounded-lg text-xs text-[#1F1D1B] placeholder-[#A8A29E] focus:outline-none focus:border-[#9A3412]"
            />
          </div>

          {/* Term Cards */}
          <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-4 pr-1">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl border border-[#E6DFD5] hover:border-[#9A3412]/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#1F1D1B]">
                      {item.term}
                    </h3>
                    {item.marathiHindiScript && (
                      <span className="text-xs text-[#9A3412] font-serif">
                        {item.marathiHindiScript}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#78716C]">
                    [{item.pronunciation}]
                  </span>
                </div>

                <p className="text-xs text-[#1F1D1B] font-medium leading-relaxed">
                  {item.definition}
                </p>

                <p className="mt-2 text-xs text-[#57534E] italic font-editorial leading-relaxed border-l-2 border-[#E6DFD5] pl-3">
                  {item.culturalLore}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#F0EAE1] flex items-center gap-1.5 text-[11px] text-[#78716C]">
                  <MapPin className="w-3 h-3 text-[#9A3412]" />
                  <span className="font-medium text-[#1F1D1B]">Where to taste:</span>
                  <span>{item.whereToOrder}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex items-center justify-between text-xs text-[#78716C]">
            <span>10 Essential Terms Chronicled</span>
            <button
              onClick={onClose}
              className="cursor-pointer font-medium text-[#9A3412] hover:underline"
            >
              Close Glossary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
