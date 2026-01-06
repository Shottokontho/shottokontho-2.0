
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article, Language } from '../types';
import { MOCK_ARTICLES } from '../constants';
import { getArticleSummary } from '../services/gemini';
import { Share2, Bookmark, MessageSquare, Clock, Sparkles, Play, Award, ArrowUpRight } from 'lucide-react';

interface ArticlePageProps {
  lang: Language;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ lang }) => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [activeMedia, setActiveMedia] = useState<'video' | 'image'>('video');

  useEffect(() => {
    const found = MOCK_ARTICLES.find(a => a.id === id);
    if (found) {
      setArticle(found);
      setLoadingSummary(true);
      getArticleSummary(found.content[lang], lang).then(summary => {
        setAiSummary(summary);
        setLoadingSummary(false);
      });
    }
    window.scrollTo(0, 0);
  }, [id, lang]);

  if (!article) return <div className="p-20 text-center">Article not found.</div>;

  return (
    <article className="animate-in fade-in duration-500 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase mb-6 tracking-widest">
            <Link to="/" className="hover:text-majestic transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/category/${article.category}`} className="hover:text-majestic transition-colors">{article.category}</Link>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              {article.title[lang]}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 dark:border-gray-800 py-6 mb-10 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-majestic rounded-full flex items-center justify-center text-white text-xl font-black shadow-lg">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-xs uppercase tracking-wider">{article.author}</div>
                  <div className="text-gray-400 text-[10px] flex items-center space-x-2 mt-1 font-bold uppercase tracking-widest">
                    <Clock size={12} />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{Math.ceil(article.content[lang].length / 500)} MIN READ</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full text-xs font-bold hover:bg-majestic hover:text-white transition-all">
                  <Share2 size={16} /> <span>SHARE</span>
                </button>
                <button className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-majestic hover:text-white transition-all">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* Multimedia Section */}
          <div className="mb-12 group">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
              {activeMedia === 'video' && article.videoUrl ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${article.videoUrl}?rel=0&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="relative h-full">
                   <img src={article.image} alt={article.title[lang]} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-6">
              {article.videoUrl && (
                <button 
                  onClick={() => setActiveMedia('video')}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full text-xs font-black transition-all ${activeMedia === 'video' ? 'bg-majestic text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  <Play size={14} /> <span>VIDEO</span>
                </button>
              )}
              <button 
                onClick={() => setActiveMedia('image')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full text-xs font-black transition-all ${activeMedia === 'image' ? 'bg-majestic text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
              >
                <span>IMAGES</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-majestic/5 to-transparent dark:from-majestic/10 border-l-[6px] border-majestic p-8 md:p-10 rounded-r-3xl mb-12 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-majestic opacity-5 rotate-12">
              <Sparkles size={120} />
            </div>
            <div className="flex items-center space-x-2 mb-6 text-majestic font-black uppercase text-[10px] tracking-[0.2em] relative z-10">
              <Sparkles size={16} />
              <span>{lang === Language.BN ? 'এআই সারসংক্ষেপ' : 'AI Analysis & Summary'}</span>
            </div>
            {loadingSummary ? (
              <div className="animate-pulse flex space-y-3 flex-col relative z-10">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              </div>
            ) : (
              <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-gray-800 dark:text-gray-100 relative z-10">
                "{aiSummary}"
              </p>
            )}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <p className="text-xl md:text-2xl font-bold mb-10 text-gray-900 dark:text-white leading-relaxed">
              {article.summary[lang]}
            </p>
            <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-[1.8] font-medium">
              {article.content[lang].split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
                {article.gallery.map((img, idx) => (
                  <div key={idx} className="overflow-hidden rounded-2xl aspect-square bg-gray-100 dark:bg-gray-800">
                    <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Author Bio Section */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 mb-20 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-24 h-24 bg-majestic rounded-[2rem] flex-shrink-0 flex items-center justify-center text-white text-3xl font-black shadow-lg">
              {article.author.charAt(0)}
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight">{article.author}</h4>
                  <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center md:justify-start space-x-2 mt-1">
                    <Award size={12} className="text-majestic" />
                    <span>Investigative Reporter</span>
                  </div>
                </div>
                <Link to={article.authorId === 'u1' ? '/profile' : '#'} className="text-xs font-black uppercase text-majestic border-b-2 border-majestic pb-1 hover:translate-x-1 transition-transform inline-flex items-center">
                  View Portfolio <ArrowUpRight size={14} className="ml-1" />
                </Link>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                Dedicated to uncovering the hidden layers of policy and technology in Bangladesh. {article.author} has been reporting on {article.category} for over 5 years, providing deep insights that challenge the status quo.
              </p>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-black uppercase tracking-widest mb-8 border-l-4 border-majestic pl-4">
              {lang === Language.BN ? 'সম্পর্কিত সংবাদ' : 'Related Stories'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3).map(rel => (
                <Link key={rel.id} to={`/article/${rel.id}`} className="group">
                  <div className="aspect-video rounded-xl overflow-hidden mb-3">
                    <img src={rel.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={rel.title[lang]} />
                  </div>
                  <h4 className="text-sm font-bold leading-tight group-hover:text-majestic transition-colors line-clamp-2">
                    {rel.title[lang]}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
