import React, { useState, useEffect, useMemo } from 'react';
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
import { useRouter, updatePageSeo, Link } from './utils/router';
import { BookOpen, Sparkles, MapPin, Compass, ArrowLeft } from 'lucide-react';

export default function App() {
  const { currentPath, navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Persistent Saved Articles & Checked Dishes
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bombay_saved_trails');
      return stored ? JSON.parse(stored) : ['irani-cafe-odyssey', 'vada-pav-trail'];
    } catch {
      return ['irani-cafe-odyssey', 'vada-pav-trail'];
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

  // Derive active article from the unique URL pathname
  const activeArticle: BlogArticle | undefined = useMemo(() => {
    const slug = currentPath.replace(/^\//, '');
    if (!slug) return undefined;
    return BLOG_ARTICLES.find(
      (a) => a.slug === slug || a.id === slug
    );
  }, [currentPath]);

  // Derive active category from unique route URL
  const activeCategory: string = useMemo(() => {
    if (currentPath === '/irani-cafes') return 'irani';
    if (currentPath === '/street-food') return 'street';
    if (currentPath === '/dawn-coffee') return 'breakfast';
    if (currentPath === '/coastal-seafood') return 'coastal';
    if (currentPath === '/heritage-bakes') return 'bakes';
    return 'all';
  }, [currentPath]);

  // Is dedicated modal / page active
  const isGlossaryPage = currentPath === '/food-glossary';
  const isSavedTrailsPage = currentPath === '/saved-trails';
  const isMapPage = currentPath === '/trail-map';

  // Dynamic SEO metadata update on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (activeArticle) {
      updatePageSeo({
        title: `${activeArticle.title} – Mumbai Food Trails`,
        description: `${activeArticle.overview.slice(0, 150)}...`,
        canonicalPath: `/${activeArticle.slug}`,
        ogType: 'article',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: activeArticle.title,
          description: activeArticle.subtitle,
          author: {
            '@type': 'Person',
            name: activeArticle.author.name,
            jobTitle: activeArticle.author.title,
          },
          datePublished: activeArticle.publishedDate,
          publisher: {
            '@type': 'Organization',
            name: 'Bombay Flavours',
          },
        },
      });
    } else if (isMapPage) {
      updatePageSeo({
        title: 'Mumbai Rail & Coastal Food Spine Map – Bombay Flavours',
        description: 'Interactive schematic transit map plotting Mumbai heritage food trails along Western and Central railway corridors.',
        canonicalPath: '/trail-map',
      });
    } else if (isGlossaryPage) {
      updatePageSeo({
        title: 'Street Food Dialect & Glossary – Bombay Flavours',
        description: 'The essential Mumbai culinary lexicon: Brun Maska, Cutting Chai, Thecha, Sol Kadhi, and authentic street slang.',
        canonicalPath: '/food-glossary',
      });
    } else if (isSavedTrailsPage) {
      updatePageSeo({
        title: 'My Saved Food Trails & Pocket Itinerary – Bombay Flavours',
        description: 'Your custom bookmarked Mumbai culinary walking guide and printable walking itinerary.',
        canonicalPath: '/saved-trails',
      });
    } else if (currentPath === '/irani-cafes') {
      updatePageSeo({
        title: 'Heritage Irani Cafés & Bakeries Trail – Bombay Flavours',
        description: 'Century-old Parsi-Irani cafés in Fort, Ballard Estate, and Dhobi Talao serving Berry Pulao and Brun Maska.',
        canonicalPath: '/irani-cafes',
      });
    } else if (currentPath === '/street-food') {
      updatePageSeo({
        title: 'Mumbai Street Food & Khau Galli Trails – Bombay Flavours',
        description: 'The definitive guide to Mumbai street food: Vada Pav spine, nocturnal Mohammed Ali Road, and Ghatkopar Khau Galli.',
        canonicalPath: '/street-food',
      });
    } else if (currentPath === '/dawn-coffee') {
      updatePageSeo({
        title: 'Dawn Coffee & Breakfast Trails – Bombay Flavours',
        description: 'Pre-dawn degree filter kaapi in Matunga and specialty coffee micro-roasteries in Bandra.',
        canonicalPath: '/dawn-coffee',
      });
    } else if (currentPath === '/coastal-seafood') {
      updatePageSeo({
        title: 'Coastal Mumbai & Koli Feasts Trail – Bombay Flavours',
        description: 'Crisp Bombay Duck, Surmai Rava Fry, and pink Sol Kadhi along Mumbai’s coastal belt.',
        canonicalPath: '/coastal-seafood',
      });
    } else if (currentPath === '/heritage-bakes') {
      updatePageSeo({
        title: 'Heritage Bakeries & Confectioners Trail – Bombay Flavours',
        description: 'Hundred-year-old clay oven bakeries, Mawa Cakes, and Crawford Market royal confectioners.',
        canonicalPath: '/heritage-bakes',
      });
    } else {
      updatePageSeo({
        title: 'Bombay Flavours: Mumbai Food Trails – Cafés, Street Food & Hidden Spots',
        description: 'An editorial culinary gazette exploring Mumbai’s iconic Irani cafés, nocturnal street food gallis, coastal seafood dens, and hidden heritage spots.',
        canonicalPath: '/',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Bombay Flavours',
          url: window.location.origin,
          description: 'Mumbai Food Trails – cafés, street food and hidden food spots.',
        },
      });
    }
  }, [currentPath, activeArticle, isMapPage, isGlossaryPage, isSavedTrailsPage]);

  // Filter articles for catalog listing
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

      // Category matching derived from route
      let matchesCategory = true;
      if (activeCategory === 'irani') {
        matchesCategory = article.tags.includes('Irani Cafés') || article.tags.includes('Parsi Cuisine');
      } else if (activeCategory === 'street') {
        matchesCategory = article.tags.includes('Street Food') || article.tags.includes('Khau Galli');
      } else if (activeCategory === 'breakfast') {
        matchesCategory = article.tags.includes('Breakfast') || article.tags.includes('Filter Coffee') || article.tags.includes('Specialty Coffee');
      } else if (activeCategory === 'coastal') {
        matchesCategory = article.tags.includes('Seafood') || article.tags.includes('Coastal Cuisine');
      } else if (activeCategory === 'bakes') {
        matchesCategory = article.tags.includes('Bakeries') || article.tags.includes('Desserts') || article.tags.includes('Artisan Bakery');
      }

      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, activeCategory, selectedRegion]);

  const featuredArticle = BLOG_ARTICLES[0]; // Irani Cafe Odyssey

  // Check if current route is an unknown slug
  const isNotFound =
    Boolean(currentPath.length > 1) &&
    !activeArticle &&
    !isMapPage &&
    !isGlossaryPage &&
    !isSavedTrailsPage &&
    !['/irani-cafes', '/street-food', '/dawn-coffee', '/coastal-seafood', '/heritage-bakes'].includes(currentPath);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1D1B] flex flex-col font-sans selection:bg-[#9A3412] selection:text-white">
      {/* Top Bar Navigation (Strict 3-zone contract with unique URLs) */}
      <Navbar
        currentPath={currentPath}
        savedCount={savedArticleIds.length}
      />

      {/* Main Content Router */}
      {activeArticle ? (
        /* Full Article Reading Experience (Unique URL: /slug) */
        <ArticleView
          article={activeArticle}
          allArticles={BLOG_ARTICLES}
          isSaved={savedArticleIds.includes(activeArticle.id)}
          onToggleSave={toggleSaveArticle}
          onBack={() => navigate('/')}
          onSelectArticle={(article) => navigate(`/${article.slug}`)}
          checkedDishes={checkedDishes}
          onToggleDishCheck={toggleDishCheck}
        />
      ) : isNotFound ? (
        /* 404 Route for Invalid URLs */
        <main className="flex-1 max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#F7F3EC] flex items-center justify-center text-[#9A3412] mb-4">
            <Compass className="w-8 h-8 animate-spin" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#1F1D1B]">
            Food Trail Not Found
          </h1>
          <p className="mt-2 text-sm text-[#57534E]">
            The URL <code className="bg-[#EFE9DF] px-2 py-0.5 rounded text-xs">{currentPath}</code> does not match any chronicled Mumbai food trail.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to All Trails</span>
            </Link>
          </div>
        </main>
      ) : isMapPage ? (
        /* Dedicated Map Page (/trail-map) */
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#9A3412] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Gazette</span>
            </Link>
          </div>
          <InteractiveTrailMap
            articles={BLOG_ARTICLES}
            onSelectArticle={(article) => navigate(`/${article.slug}`)}
          />
        </main>
      ) : (
        /* Gazette Front-Page & Article Catalog (/, /irani-cafes, /street-food, etc.) */
        <main className="flex-1">
          {/* Editorial Gazette Hero Section (Only on root /) */}
          {currentPath === '/' && (
            <HeroSection featuredArticle={featuredArticle} />
          )}

          {/* Catalog & Filter Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E6DFD5]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#9A3412]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {activeCategory === 'irani'
                      ? 'The Persian & Parsi Sanctuaries'
                      : activeCategory === 'street'
                      ? 'Nocturnal Gallis & Street Stalls'
                      : activeCategory === 'breakfast'
                      ? 'Dawn Coffee & Breakfast Shrines'
                      : activeCategory === 'coastal'
                      ? 'Coastal Koliwada Seafood Dens'
                      : activeCategory === 'bakes'
                      ? 'Artisanal Bakes & Sweet Dynasties'
                      : 'The Ten Chapters'}
                  </span>
                </div>
                <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#1F1D1B]">
                  {activeCategory === 'irani'
                    ? 'Heritage Irani Cafés'
                    : activeCategory === 'street'
                    ? 'Street Food & Khau Gallis'
                    : activeCategory === 'breakfast'
                    ? 'Dawn Coffee & Morning Trails'
                    : activeCategory === 'coastal'
                    ? 'Coastal & Koli Seafood Feasts'
                    : activeCategory === 'bakes'
                    ? 'Bakeries & Sweetmakers'
                    : 'Curated Food Trails'}
                </h2>
                <p className="mt-2 text-sm text-[#57534E] max-w-xl">
                  Each trail features unique URLs, step-by-step itineraries, nearest train stops, signature dishes, and cultural lore.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/food-glossary"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#57534E] hover:text-[#1F1D1B] bg-white border border-[#DDD5C7] rounded-lg transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>View Food Glossary</span>
                </Link>
                <Link
                  href="/trail-map"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#57534E] hover:text-[#1F1D1B] bg-white border border-[#DDD5C7] rounded-lg transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-[#9A3412]" />
                  <span>Transit Map</span>
                </Link>
              </div>
            </div>

            {/* Filter Bar with unique URL tabs */}
            <div className="mt-8">
              <TrailFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={activeCategory}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                matchingCount={filteredArticles.length}
                totalCount={BLOG_ARTICLES.length}
              />
            </div>

            {/* Articles Grid (Each card is a link with unique URL) */}
            <div className="mt-10">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-[#E6DFD5] p-8">
                  <p className="font-serif text-xl font-medium text-[#1F1D1B]">
                    No food trails found matching your search.
                  </p>
                  <p className="mt-2 text-xs text-[#57534E]">
                    Try clearing your search query or selecting "All Mumbai" to view all chronicles.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedRegion('all');
                      }}
                      className="cursor-pointer inline-block px-4 py-2 text-xs font-semibold bg-[#9A3412] text-white rounded-lg hover:bg-[#7C2D12] transition-colors"
                    >
                      Reset Filters
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      isSaved={savedArticleIds.includes(article.id)}
                      onToggleSave={toggleSaveArticle}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Interactive Schematic Railway & Trail Map Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
            <InteractiveTrailMap
              articles={BLOG_ARTICLES}
              onSelectArticle={(article) => navigate(`/${article.slug}`)}
            />
          </section>
        </main>
      )}

      {/* Saved Trails Pocket Itinerary Drawer (Unique URL: /saved-trails) */}
      <SavedTrailsDrawer
        isOpen={isSavedTrailsPage}
        onClose={() => navigate('/')}
        savedArticleIds={savedArticleIds}
        allArticles={BLOG_ARTICLES}
        onRemoveSaved={toggleSaveArticle}
        onClearAll={clearAllSaved}
        onSelectArticle={(article) => navigate(`/${article.slug}`)}
      />

      {/* Street Food Dialect & Glossary Modal (Unique URL: /food-glossary) */}
      <GlossaryModal
        isOpen={isGlossaryPage}
        onClose={() => navigate('/')}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
