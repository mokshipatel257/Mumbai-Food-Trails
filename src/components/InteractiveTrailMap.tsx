import React, { useState } from 'react';
import { MapPin, Train, ArrowRight, Compass, Clock, Utensils } from 'lucide-react';
import { BlogArticle } from '../types/blog';

interface InteractiveTrailMapProps {
  articles: BlogArticle[];
  onSelectArticle: (article: BlogArticle) => void;
}

interface MapNode {
  id: string;
  name: string;
  marathiName: string;
  articleId: string;
  line: 'Western' | 'Central' | 'Harbour' | 'Coastal';
  topPercent: number; // Vertical position along Mumbai's North-South spine
  leftPercent: number; // Horizontal position
  vibe: string;
  spotsCount: number;
  highlightDish: string;
}

const MAP_NODES: MapNode[] = [
  {
    id: 'fort-ballard',
    name: 'Fort & Ballard Estate',
    marathiName: 'फोर्ट / बॅलार्ड इस्टेट',
    articleId: 'irani-cafe-odyssey',
    line: 'Western',
    topPercent: 88,
    leftPercent: 42,
    vibe: 'Vintage colonial stone arcades & antique Persian marble tables',
    spotsCount: 4,
    highlightDish: 'Mutton Berry Pulao & Brun Maska'
  },
  {
    id: 'marine-drive',
    name: 'Marine Drive & Chowpatty',
    marathiName: 'मरीन ड्राईव्ह / गिरगाव चौपाटी',
    articleId: 'marine-drive-sunset-midnight-rolls',
    line: 'Western',
    topPercent: 83,
    leftPercent: 28,
    vibe: 'Sunset sea spray, Queen’s necklace & midnight car snacks',
    spotsCount: 4,
    highlightDish: 'Fresh Strawberry Cream & Baida Roti'
  },
  {
    id: 'crawford-market',
    name: 'Crawford Market & Marine Lines',
    marathiName: 'क्रॉफर्ड मार्केट / मरीन लाइन्स',
    articleId: 'heritage-sweetmakers-crawford-market',
    line: 'Western',
    topPercent: 82,
    leftPercent: 52,
    vibe: '130-year confectionery dynasties & bas-relief stone arcades',
    spotsCount: 4,
    highlightDish: 'Malai Kulfi & Royal Rose Falooda'
  },
  {
    id: 'bhendi-bazaar',
    name: 'Mohammed Ali Rd & Bohri Mohalla',
    marathiName: 'मोहम्मद अली रोड / भेंडी बाजार',
    articleId: 'midnight-mohammed-ali-road',
    line: 'Central',
    topPercent: 77,
    leftPercent: 58,
    vibe: 'Nocturnal smoke, sizzling sigdis & 12-hour simmered broth',
    spotsCount: 5,
    highlightDish: 'Chicken Sanju Baba & Mawa Jalebi'
  },
  {
    id: 'dadar-west',
    name: 'Dadar West & Kirti College',
    marathiName: 'दादर पश्चिम / कीर्ती कॉलेज',
    articleId: 'sacred-vada-pav-cartography',
    line: 'Western',
    topPercent: 62,
    leftPercent: 36,
    vibe: 'The 1966 birthplace of Vada Pav and boiling oil woks',
    spotsCount: 5,
    highlightDish: 'Chura Vada Pav with Garlic Thecha'
  },
  {
    id: 'dadar-parsi-colony',
    name: 'Dadar Parsi Colony & Grant Rd',
    marathiName: 'दादर पारसी कॉलनी',
    articleId: 'dadar-parsi-colony-bakeries',
    line: 'Central',
    topPercent: 58,
    leftPercent: 54,
    vibe: 'Leafy Art Deco parks and hundred-year old clay ovens',
    spotsCount: 4,
    highlightDish: 'Cardamom Mawa Cakes & Chicken Pattice'
  },
  {
    id: 'matunga-kings-circle',
    name: 'Matunga & King’s Circle',
    marathiName: 'माटुंगा / किंग्स सर्कल',
    articleId: 'matunga-south-indian-coffee-dawn',
    line: 'Central',
    topPercent: 52,
    leftPercent: 60,
    vibe: 'Pre-dawn degree filter kaapi & butter-soaked benne dosas',
    spotsCount: 4,
    highlightDish: 'Pineapple Sheera & Filter Kaapi'
  },
  {
    id: 'bandra-ranwar',
    name: 'Bandra West (Ranwar Village)',
    marathiName: 'वांद्रे पश्चिम / रानवार गाव',
    articleId: 'bandra-bohemian-cafes',
    line: 'Western',
    topPercent: 42,
    leftPercent: 30,
    vibe: 'Portuguese wooden cottages, street murals & craft micro-roasters',
    spotsCount: 4,
    highlightDish: 'Single-Origin Pour Over & Pastrami Rye'
  },
  {
    id: 'vile-parle-coastal',
    name: 'Kala Ghoda to Vile Parle Coast',
    marathiName: 'विलेपार्ले आणि किनारपट्टी',
    articleId: 'coastal-mumbai-koli-feasts',
    line: 'Coastal',
    topPercent: 32,
    leftPercent: 25,
    vibe: 'Fisherfolk heritage, semolina-crusted Bombay Duck & Sol Kadhi',
    spotsCount: 4,
    highlightDish: 'Rava-crusted Bombil & Butter Garlic Crab'
  },
  {
    id: 'ghatkopar-khau-galli',
    name: 'Ghatkopar East Khau Galli',
    marathiName: 'घाटकोपर खाऊ गल्ली',
    articleId: 'ghatkopar-zaveri-bazaar-khau-galli',
    line: 'Central',
    topPercent: 24,
    leftPercent: 72,
    vibe: '100 variations of crispy cheese dosas & coal-roasted khichiya',
    spotsCount: 4,
    highlightDish: 'Rolled Jini Dosa & Kutchi Beer'
  }
];

export const InteractiveTrailMap: React.FC<InteractiveTrailMapProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('fort-ballard');
  const [selectedLineFilter, setSelectedLineFilter] = useState<'All' | 'Western' | 'Central' | 'Coastal'>('All');

  const selectedNode = MAP_NODES.find((n) => n.id === selectedNodeId) || MAP_NODES[0];
  const matchingArticle = articles.find((a) => a.id === selectedNode.articleId);

  const filteredNodes = MAP_NODES.filter(
    (n) => selectedLineFilter === 'All' || n.line === selectedLineFilter
  );

  return (
    <section className="bg-white rounded-xl border border-[#E6DFD5] p-6 sm:p-8 overflow-hidden shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E6DFD5]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Cartography</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1D1B]">
            Mumbai Rail & Coastal Food Spine
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Click any station hub along the Western or Central corridors to inspect its food trail.
          </p>
        </div>

        {/* Filter by Train Corridor */}
        <div className="flex items-center gap-1 p-1 bg-[#F5F0E8] rounded-lg text-xs font-medium self-start md:self-auto">
          {(['All', 'Western', 'Central', 'Coastal'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedLineFilter(filter)}
              className={`cursor-pointer px-3 py-1.5 rounded-md transition-colors ${
                selectedLineFilter === filter
                  ? 'bg-white text-[#1F1D1B] shadow-2xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1F1D1B]'
              }`}
            >
              {filter === 'All' ? 'All Corridors' : `${filter} Line`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Schematic Cartography Visual (Left 7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5] p-6 relative min-h-[520px] sm:min-h-[580px] overflow-hidden select-none">
          {/* Arabian Sea backdrop watermark */}
          <div className="absolute top-8 left-6 text-xs uppercase tracking-widest text-[#B4A897]/50 font-serif italic pointer-events-none">
            ~ Arabian Sea Coastline ~
          </div>
          <div className="absolute bottom-8 right-6 text-xs uppercase tracking-widest text-[#B4A897]/50 font-serif italic pointer-events-none">
            ~ Mumbai Harbour ~
          </div>

          {/* Western Line Guideline (Vertical SVG track) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current text-[#D6CEBE]">
            {/* Western Railway Spine (Dashed line) */}
            <path
              d="M 28% 28% L 32% 42% L 36% 62% L 28% 83% L 42% 88%"
              fill="none"
              stroke="#B45309"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            {/* Central Railway Spine */}
            <path
              d="M 72% 24% L 60% 52% L 54% 58% L 58% 77% L 52% 82% L 42% 88%"
              fill="none"
              stroke="#9A3412"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </svg>

          {/* Interactive Station Nodes */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <div
                key={node.id}
                style={{ top: `${node.topPercent}%`, left: `${node.leftPercent}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                <button
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`cursor-pointer relative flex items-center justify-center transition-all ${
                    isSelected
                      ? 'scale-125 z-30'
                      : 'hover:scale-115'
                  }`}
                  aria-label={`View trail for ${node.name}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-sm transition-colors ${
                      isSelected
                        ? 'bg-[#9A3412] border-white ring-3 ring-[#9A3412]/30 text-white'
                        : 'bg-white border-[#9A3412] text-[#9A3412]'
                    }`}
                  >
                    <Train className="w-3 h-3" />
                  </div>

                  {/* Station Label Tooltip / Tag */}
                  <div
                    className={`absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded text-[11px] font-medium border shadow-2xs transition-all pointer-events-none ${
                      isSelected
                        ? 'bg-[#1F1D1B] text-white border-[#1F1D1B] font-semibold'
                        : 'bg-white/90 text-[#44403C] border-[#DDD5C7] group-hover:bg-white group-hover:text-[#9A3412]'
                    }`}
                  >
                    {node.name.split(' (')[0]}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Hub Details Panel (Right 5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#78716C] mb-2">
              <span className="font-mono text-[#9A3412] font-semibold uppercase">
                {selectedNode.line} Line Corridor
              </span>
              <span className="font-editorial text-xs">{selectedNode.marathiName}</span>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#1F1D1B]">
              {selectedNode.name}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-[#57534E] leading-relaxed">
              {selectedNode.vibe}
            </p>

            {/* Signature Dish Callout */}
            <div className="mt-4 p-3.5 bg-white rounded-lg border border-[#E6DFD5]">
              <div className="text-[11px] uppercase tracking-wider text-[#78716C]">
                Culinary Landmark
              </div>
              <div className="mt-1 text-sm font-semibold text-[#1F1D1B] flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-[#9A3412]" />
                {selectedNode.highlightDish}
              </div>
            </div>

            {/* Associated Trail Snapshot */}
            {matchingArticle && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-[#E6DFD5]">
                <div className="flex items-center gap-2 text-xs text-[#78716C] mb-1">
                  <span className="font-semibold text-[#9A3412]">{matchingArticle.kicker}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {matchingArticle.readTime}
                  </span>
                </div>
                <div className="font-serif text-base font-semibold text-[#1F1D1B] line-clamp-2">
                  {matchingArticle.title}
                </div>
                <div className="mt-2 text-xs text-[#57534E] line-clamp-2">
                  {matchingArticle.overview}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#78716C]">
                  <MapPin className="w-3.5 h-3.5 text-[#9A3412]" />
                  <span>{matchingArticle.trailMetrics.totalSpots} stops ({matchingArticle.trailMetrics.distanceKm})</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E6DFD5]">
            {matchingArticle ? (
              <button
                onClick={() => onSelectArticle(matchingArticle)}
                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors shadow-xs"
              >
                <span>Read Full Trail Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
