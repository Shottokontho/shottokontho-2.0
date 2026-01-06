import React from 'react';
import { Language, Category } from '../types';
import { MOCK_ARTICLES, CATEGORIES_LIST } from '../constants';
import NewsCard from '../components/NewsCard';
import NewsTicker from '../components/NewsTicker';
import { ArrowRight, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  lang: Language;
}

const HomePage: React.FC<HomePageProps> = ({ lang }) => {
  const mainArticle = MOCK_ARTICLES[0];
  const breakingItems = MOCK_ARTICLES.filter(a => a.isBreaking).map(a => a.title[lang]);

  return (
    <div className="animate-in fade-in duration-700">
      <NewsTicker lang={lang} items={breakingItems} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Top Feature Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <NewsCard article={mainArticle} lang={lang} variant="large" />
          </div>
          <div className="lg:col-span-4 flex flex-col space-y-6">
             <div className="flex items-center justify-between border-b border-majestic pb-2 mb-2">
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">{lang === Language.BN ? 'শীর্ষ খবর' : 'Must Read'}</h3>
             </div>
             {MOCK_ARTICLES.slice(2, 6).map(art => (
               <NewsCard key={art.id} article={art} lang={lang} variant="horizontal" />
             ))}
          </div>
        </section>

        {/* Global News Ribbon */}
        <section className="bg-gray-900 text-white rounded-3xl p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-majestic/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black uppercase flex items-center space-x-3">
                <span className="text-majestic-light">GLOBAL</span> <span>REPORTS</span>
              </h2>
              <Link to={`/category/${Category.INTERNATIONAL}`} className="text-xs font-bold uppercase tracking-widest hover:text-majestic transition-colors">
                VIEW GLOBAL DESK
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_ARTICLES.filter(a => a.category === Category.INTERNATIONAL).slice(0, 3).map(art => (
                <Link key={art.id} to={`/article/${art.id}`} className="group">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
                    <img src={art.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-majestic-light transition-colors line-clamp-2 leading-tight">
                    {art.title[lang]}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Content Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-16">
            {CATEGORIES_LIST.filter(c => [Category.TECH, Category.BUSINESS, Category.TRAVEL].includes(c.id)).map(category => (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-8 border-b-2 border-majestic pb-2">
                  <h2 className="text-2xl font-black uppercase flex items-center space-x-2">
                    <span className="w-2 h-8 bg-majestic"></span>
                    <span>{lang === Language.BN ? category.bn : category.en}</span>
                  </h2>
                  <Link to={`/category/${category.id}`} className="text-xs font-bold text-majestic flex items-center hover:translate-x-1 transition-transform uppercase tracking-widest">
                    {lang === Language.BN ? 'আরও' : 'See More'} <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {MOCK_ARTICLES.filter(a => a.category === category.id).slice(0, 4).map(article => (
                    <NewsCard key={article.id} article={article} lang={lang} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* AI Curated Section */}
            <div className="bg-gradient-to-br from-majestic to-black p-8 rounded-3xl text-white shadow-xl shadow-majestic/10 relative overflow-hidden">
               <div className="absolute -right-6 -bottom-6 text-white/5 rotate-12">
                 <Sparkles size={160} />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center space-x-2 text-majestic-light mb-4">
                    <Sparkles size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">AI Powered Feed</span>
                 </div>
                 <h3 className="text-2xl font-black mb-4 uppercase leading-tight">Your Smart Intelligence Feed</h3>
                 <p className="text-sm text-gray-400 mb-8 leading-relaxed">Our AI analyzes thousands of global events to bring you the most critical summaries daily. Stay ahead of the curve.</p>
                 <button className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-majestic-light hover:text-white transition-all">
                   ENABLE AI FEED
                 </button>
               </div>
            </div>

            {/* Trending Ticker */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
               <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center space-x-2">
                 <TrendingUp className="text-majestic" />
                 <span>TRENDING DISCUSSIONS</span>
               </h3>
               <div className="space-y-6">
                 {MOCK_ARTICLES.sort((a,b) => b.views - a.views).slice(0, 5).map((art, idx) => (
                   <Link key={art.id} to={`/article/${art.id}`} className="flex space-x-4 group">
                      <span className="text-4xl font-black text-gray-100 dark:text-gray-800 group-hover:text-majestic transition-colors">0{idx + 1}</span>
                      <div>
                        <h4 className="text-sm font-bold group-hover:text-majestic transition-colors line-clamp-2">{art.title[lang]}</h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">{art.views.toLocaleString()} READS</span>
                      </div>
                   </Link>
                 ))}
               </div>
            </div>

            {/* Partner Ads */}
            <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 block">Sponsored Partner</span>
               <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 flex items-center justify-center text-gray-400 font-bold italic">
                  AD SPACE
               </div>
               <p className="text-xs text-gray-500 mb-4 italic">Want to reach our global audience?</p>
               <Link to="/partner" className="text-xs font-black text-majestic hover:underline">BECOME A PARTNER</Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HomePage;