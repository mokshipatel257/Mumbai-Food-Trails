import React, { useState } from 'react';
import { ArrowUp, Train, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenGlossary: () => void;
  onOpenMap: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenGlossary,
  onOpenMap,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F1D1B] text-[#D6CEBE] pt-16 pb-12 border-t border-[#332F2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#332F2C]">
          {/* Brand & Editorial Mission (5 cols) */}
          <div className="md:col-span-5">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Bombay Flavours
            </span>
            <p className="mt-3 text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-sm">
              An independent gazette chronicling Mumbai’s endangered Irani cafés, century-old street gallis, and coastal culinary sanctuaries. Built with archival devotion to the city that never stops eating.
            </p>

            {/* Travel Advisory Callout */}
            <div className="mt-6 p-4 rounded-lg bg-[#2A2724] border border-[#3D3834] text-xs text-[#C5BDB0]">
              <div className="flex items-center gap-2 font-semibold text-white mb-1">
                <Train className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Mumbaikar Rail Transit Advisory</span>
              </div>
              <p className="leading-relaxed text-[11px] text-[#A8A29E]">
                Avoid the suburban rail rush between 8:30–10:30 AM (southbound) and 6:00–8:30 PM (northbound). Carry small currency notes for street stalls; always request extra Sukha Chutney.
              </p>
            </div>
          </div>

          {/* Curated Trail Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-4">
              Curated Trails
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <button
                  onClick={() => onSelectCategory('irani')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Heritage Irani Cafés
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('street')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Street Food & Khau Gallis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('breakfast')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Dawn Filter Kaapi in Matunga
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('coastal')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Konkan Coastal & Koli Feasts
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMap}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Interactive Transit Cartography
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGlossary}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Street Food Dialect Glossary
                </button>
              </li>
            </ul>
          </div>

          {/* Field Dispatch Gazette Sign-up (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-4">
              The Weekly Food Dispatch
            </h4>
            <p className="text-xs text-[#A8A29E] leading-relaxed mb-3">
              Receive secret weekend morning walking routes, seasonal Alphonso and strawberry bulletins, and bakery batch timings directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 px-3 py-2 text-xs bg-[#2A2724] border border-[#3D3834] rounded-lg text-white placeholder-[#78716C] focus:outline-none focus:border-[#F97316]"
                />
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 text-xs font-semibold bg-[#9A3412] hover:bg-[#C2410C] text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  Join Gazette
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-[#4ADE80] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Welcome to the culinary circle. First dispatch arriving soon.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © 2026 Bombay Flavours Gazette · All rights reserved · Handcrafted in Mumbai
          </div>

          <button
            onClick={scrollToTop}
            className="cursor-pointer flex items-center gap-1 text-[#A8A29E] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
