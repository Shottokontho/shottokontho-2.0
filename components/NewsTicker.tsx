
import React from 'react';
import { Language } from '../types';

interface TickerProps {
  lang: Language;
  items: string[];
}

const NewsTicker: React.FC<TickerProps> = ({ lang, items }) => {
  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden whitespace-nowrap flex items-center border-y border-gray-800">
      <div className="px-4 bg-majestic text-xs font-black uppercase tracking-widest h-full flex items-center z-10 mr-4">
        {lang === Language.BN ? 'ব্রেকিং' : 'Breaking'}
      </div>
      <div className="flex animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="mx-8 text-sm font-medium hover:text-majestic cursor-pointer transition-colors">
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
