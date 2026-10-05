import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { InteractiveTrailMap } from './components/InteractiveTrailMap';
import { TrailFilterBar } from './components/TrailFilterBar';
import { SavedTrailsDrawer } from './components/SavedTrailsDrawer';
import { GlossaryModal } from './components/GlossaryModal';
import { Footer } from './components/Footer';
import { BLOG_ARTICLES } from './data/articles';
import { BlogArticle } from './types/blog';
import { MapPin, Compass, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [activeNavTab, setActiveNavTab] = useState<'all' | 'irani' | 'street' | 'map' | 'glossary'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const mapSectionRef = useRef<HTMLDivElement>(null);
  const catalogSectionRef = useRef<HTMLDivElement>(null);

  // Persistent Saved Articles & Checked Dishes
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bombay_saved_trails');
      return stored ? JSON.parse(stored) : ['irani-cafe-odyssey', 'sacred-vada-pav-cartography'];
    } catch {
      return ['irani-cafe-odyssey', 'sacred-vada-pav-cartography'];
    }
  });

  const [checkedDishes, setCheckedDishes] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('bombay_checked_dishes');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bombay_saved_trails', JSON.stringify(savedArticleIds));
    } catch (e) {
      console.warn('Unable to persist saved trails', e);
    }
  }, [savedArticleIds]);

  useEffect(() => {
    try {
      localStorage.setItem('bombay_checked_dishes', JSON.stringify(checkedDishes));
    } catch (e) {
      console.warn('Unable to persist checked dishes', e);
    }
  }, [checkedDishes]);

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const toggleDishCheck = (dishId: string) => {
    setCheckedDishes((prev) => ({
      ...prev,
      [dishId]: !prev[dishId],
    }));
  };

  const clearAllSaved = () => {
    setSavedArticleIds([]);
  };

  // Category & search filtering
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      // Search matching
      const matchesSearch =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.spots.some(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.signatureDishes.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
        );

      // Region matching
      const matchesRegion = selectedRegion === 'all' || article.region === selectedRegion;

      // Category matching
      let matchesCategory = true;
      if (selectedCategory === 'irani') {
        matchesCategory = article.tags.includes('Irani Cafés') || article.tags.includes('Parsi Cuisine');
      } else if (selectedCategory === 'street') {
        matchesCategory = article.tags.includes('Street Food') || article.tags.includes('Khau Galli');
      } else if (selectedCategory === 'breakfast') {
        matchesCategory = article.tags.includes('Breakfast') || article.tags.includes('Filter Coffee') || article.tags.includes('Specialty Coffee');
      } else if (selectedCategory === 'coastal') {
        matchesCategory = article.tags.includes('Seafood') || article.tags.includes('Coastal Cuisine');
      } else if (selectedCategory === 'bakes') {
        matchesCategory = article.tags.includes('Bakeries') || article.tags.includes('Desserts') || article.tags.includes('Artisan Bakery');
      }

      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, selectedCategory, selectedRegion]);

  const handleNavClick = (tab: 'all' | 'irani' | 'street' | 'map' | 'glossary') => {
    setActiveNavTab(tab);
    if (tab === 'glossary') {
      setIsGlossaryOpen(true);
      return;
    }

    if (selectedArticle) {
      setSelectedArticle(null);
    }

    if (tab === 'map') {
      setTimeout(() => {
        mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (tab === 'irani') {
      setSelectedCategory('irani');
      setTimeout(() => {
        catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (tab === 'street') {
      setSelectedCategory('street');
      setTimeout(() => {
        catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (tab === 'all') {
      setSelectedCategory('all');
      setSelectedRegion('all');
      setSearchQuery('');
      setTimeout(() => {
        catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const handleSelectArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredArticle = BLOG_ARTICLES[0]; // Irani Cafe Odyssey

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1D1B] flex flex-col font-sans selection:bg-[#9A3412] selection:text-white">
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        activeTab={activeNavTab}
        setActiveTab={handleNavClick}
        savedCount={savedArticleIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Main Content Area */}
      {selectedArticle ? (
        /* Full Article Reading Experience */
        <ArticleView
          article={selectedArticle}
          allArticles={BLOG_ARTICLES}
          isSaved={savedArticleIds.includes(selectedArticle.id)}
          onToggleSave={toggleSaveArticle}
          onBack={() => {
            setSelectedArticle(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectArticle={handleSelectArticle}
          checkedDishes={checkedDishes}
          onToggleDishCheck={toggleDishCheck}
        />
      ) : (
        /* Gazette Front-Page & Article Catalog */
        <main className="flex-1">
          {/* Editorial Gazette Hero Section */}
          <HeroSection
            featuredArticle={featuredArticle}
            onSelectArticle={handleSelectArticle}
            onExploreMap={() => {
              mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />

          {/* Catalog & Filter Section */}
          <section
            ref={catalogSectionRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E6DFD5]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#9A3412]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>The Ten Chapters</span>
                </div>
                <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#1F1D1B]">
                  Curated Food Trails
                </h2>
                <p className="mt-2 text-sm text-[#57534E] max-w-xl">
                  Each trail is designed as a standalone walking circuit complete with opening hours, nearest train stops, signature dishes, and culinary lore.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGlossaryOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#57534E] hover:text-[#1F1D1B] bg-white border border-[#DDD5C7] rounded-lg transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>View Food Glossary</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="mt-8">
              <TrailFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                matchingCount={filteredArticles.length}
                totalCount={BLOG_ARTICLES.length}
              />
            </div>

            {/* Articles Grid (Responsive layout) */}
            <div className="mt-10">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-[#E6DFD5] p-8">
                  <p className="font-serif text-xl font-medium text-[#1F1D1B]">
                    No food trails found matching your search.
                  </p>
                  <p className="mt-2 text-xs text-[#57534E]">
                    Try clearing your search query or selecting "All Mumbai" to view all 10 chronicles.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedRegion('all');
                    }}
                    className="cursor-pointer mt-4 px-4 py-2 text-xs font-semibold bg-[#9A3412] text-white rounded-lg hover:bg-[#7C2D12] transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      isSaved={savedArticleIds.includes(article.id)}
                      onSelect={handleSelectArticle}
                      onToggleSave={toggleSaveArticle}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Interactive Schematic Railway & Trail Map Section */}
          <section
            ref={mapSectionRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4"
          >
            <InteractiveTrailMap
              articles={BLOG_ARTICLES}
              onSelectArticle={handleSelectArticle}
            />
          </section>
        </main>
      )}

      {/* Saved Trails Pocket Itinerary Drawer */}
      <SavedTrailsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticleIds={savedArticleIds}
        allArticles={BLOG_ARTICLES}
        onRemoveSaved={toggleSaveArticle}
        onClearAll={clearAllSaved}
        onSelectArticle={handleSelectArticle}
      />

      {/* Street Food Dialect & Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (selectedArticle) setSelectedArticle(null);
          setTimeout(() => {
            catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenMap={() => {
          if (selectedArticle) setSelectedArticle(null);
          setTimeout(() => {
            mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
      />
    </div>
  );
}
