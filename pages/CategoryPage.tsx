
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Category, Language } from '../types';
import { MOCK_ARTICLES, CATEGORIES_LIST } from '../constants';
import NewsCard from '../components/NewsCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface CategoryPageProps {
  lang: Language;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ lang }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [visibleCount, setVisibleCount] = useState(8);
  
  const categoryInfo = useMemo(() => 
    CATEGORIES_LIST.find(c => c.id === categoryId), 
    [categoryId]
  );

  const articles = useMemo(() => 
    MOCK_ARTICLES.filter(a => a.category === categoryId),
    [categoryId]
  );

  const loadMore = () => setVisibleCount(prev => prev + 8);

  if (!categoryInfo) return <div className="p-20 text-center">Category not found.</div>;

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Category Header */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <span className="text-majestic text-xs font-black uppercase tracking-[0.3em] mb-4 block">
              DISCOVER {categoryInfo.en}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase">
              {lang === Language.BN ? categoryInfo.bn : categoryInfo.en}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Explore our latest coverage on {categoryInfo.en}. From breaking headlines to in-depth investigations, we bring you the stories that matter most in {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-12 py-4 border-y border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-6">
             <button className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-majestic">
                <Filter size={14} />
                <span>FILTER</span>
             </button>
             <button className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-majestic transition-colors">
                <SlidersHorizontal size={14} />
                <span>SORT BY: LATEST</span>
             </button>
          </div>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            SHOWING {Math.min(visibleCount, articles.length)} OF {articles.length} ARTICLES
          </div>
        </div>

        {/* Featured Card */}
        {articles.length > 0 && (
          <div className="mb-16">
            <NewsCard article={articles[0]} lang={lang} variant="large" />
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {articles.slice(1, visibleCount).map((article) => (
            <NewsCard key={article.id} article={article} lang={lang} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < articles.length && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={loadMore}
              className="px-12 py-4 bg-white dark:bg-gray-900 border-2 border-majestic text-majestic font-black uppercase tracking-widest rounded-full hover:bg-majestic hover:text-white transition-all shadow-lg hover:shadow-majestic/20"
            >
              {lang === Language.BN ? 'আরও লোড করুন' : 'Load More Stories'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
