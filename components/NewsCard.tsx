
import React from 'react';
import { Link } from 'react-router-dom';
import { Article, Language } from '../types';
import { Clock, Eye } from 'lucide-react';

interface NewsCardProps {
  article: Article;
  lang: Language;
  variant?: 'grid' | 'horizontal' | 'large';
}

const NewsCard: React.FC<NewsCardProps> = ({ article, lang, variant = 'grid' }) => {
  if (variant === 'large') {
    return (
      <Link to={`/article/${article.id}`} className="group relative block overflow-hidden rounded-xl bg-gray-900 aspect-[16/9] md:aspect-[21/9]">
        <img 
          src={article.image} 
          alt={article.title[lang]}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 md:p-12 flex flex-col justify-end">
          <div className="mb-4">
             <span className="bg-majestic text-white text-[10px] font-bold uppercase px-3 py-1 rounded">
               {article.category}
             </span>
          </div>
          <h2 className="text-2xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:underline">
            {article.title[lang]}
          </h2>
          <p className="text-gray-300 line-clamp-2 max-w-2xl text-sm md:text-lg mb-6 hidden md:block">
            {article.summary[lang]}
          </p>
          <div className="flex items-center space-x-4 text-xs font-bold text-gray-400 uppercase">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${article.id}`} className="group flex space-x-4 items-start py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
        <div className="w-1/3 aspect-video overflow-hidden rounded-lg">
          <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={article.title[lang]} />
        </div>
        <div className="w-2/3">
          <span className="text-majestic text-[10px] font-bold uppercase mb-1 block">{article.category}</span>
          <h3 className="text-sm md:text-base font-bold group-hover:text-majestic transition-colors line-clamp-2 leading-snug">
            {article.title[lang]}
          </h3>
          <div className="flex items-center space-x-2 mt-2 text-[10px] text-gray-500 font-medium">
            <Clock size={12} />
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.id}`} className="group block overflow-hidden">
      <div className="aspect-video overflow-hidden rounded-xl mb-4 relative">
        <img 
          src={article.image} 
          alt={article.title[lang]} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          {article.isBreaking && (
            <span className="bg-majestic text-white text-[8px] font-black uppercase px-2 py-1 rounded animate-pulse">
              {lang === Language.BN ? 'ব্রেকিং' : 'Breaking'}
            </span>
          )}
        </div>
      </div>
      <div>
        <span className="text-majestic text-[10px] font-black uppercase tracking-widest mb-2 block">
          {article.category}
        </span>
        <h3 className="text-xl font-bold leading-tight group-hover:text-majestic transition-colors mb-2 line-clamp-2">
          {article.title[lang]}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {article.summary[lang]}
        </p>
        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase">
          <div className="flex items-center space-x-3">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye size={12} />
            <span>{article.views.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
