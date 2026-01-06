
import React, { useState, useEffect } from 'react';
import { Sparkles, X, Play, Volume2, CheckCircle2, ArrowRight, Zap, Target, CreditCard, Landmark } from 'lucide-react';
import { Category, Language, Article } from '../types';
import { CATEGORIES_LIST, MOCK_ARTICLES } from '../constants';
import { getArticleSummary } from '../services/gemini';

interface AIPopupProps {
  lang: Language;
  onClose: () => void;
}

const AIPopup: React.FC<AIPopupProps> = ({ lang, onClose }) => {
  const [step, setStep] = useState<'pitch' | 'topics' | 'demo' | 'checkout' | 'payment'>('pitch');
  const [selectedCats, setSelectedCats] = useState<Category[]>([]);
  const [demoArticles, setDemoArticles] = useState<Article[]>([]);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const toggleCategory = (catId: Category) => {
    setSelectedCats(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const startDemo = async () => {
    setLoading(true);
    setStep('demo');
    const filtered = MOCK_ARTICLES
      .filter(a => selectedCats.length === 0 || selectedCats.includes(a.category))
      .slice(0, 10);
    setDemoArticles(filtered);
    const newSummaries: Record<string, string> = {};
    for (const art of filtered.slice(0, 3)) {
      const s = await getArticleSummary(art.content[lang], lang);
      newSummaries[art.id] = s;
    }
    setSummaries(newSummaries);
    setLoading(false);
  };

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', color: 'bg-[#e2136e]', icon: 'b' },
    { id: 'nagad', name: 'Nagad', color: 'bg-[#f47321]', icon: 'n' },
    { id: 'card', name: 'Card', color: 'bg-gray-800', icon: <CreditCard size={18} /> },
    { id: 'bank', name: 'Bank', color: 'bg-blue-800', icon: <Landmark size={18} /> }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-dark rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-majestic hover:text-white transition-all z-10">
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-[85vh] md:h-[600px]">
          {/* Left Panel */}
          <div className="w-full md:w-2/5 bg-majestic p-10 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 text-white/5 rotate-12">
              <Sparkles size={300} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-6 text-majestic-light font-black uppercase tracking-widest text-xs">
                <Sparkles size={20} />
                <span>SHOTTOKONTHO AI</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight uppercase mb-4">
                {lang === Language.BN ? 'সময়ের অপচয় বন্ধ করুন' : 'Stop Wasting Time'}
              </h2>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                {lang === Language.BN 
                  ? '১০ সেকেন্ডের ভিডিও এবং অডিও সারসংক্ষেপে খবর জানুন।'
                  : 'Know news through 10-second video and audio summaries.'}
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-gray-50 dark:bg-dark/50">
            {step === 'pitch' && (
              <div className="h-full flex flex-col justify-center animate-in fade-in slide-in-from-right-4">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-majestic/10 rounded-2xl flex items-center justify-center text-majestic mb-6">
                    <Target size={32} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase">
                    {lang === Language.BN ? 'সত্য জানুন - মুহূর্তেই' : 'Know The Truth'}
                  </h3>
                  <button onClick={() => setStep('topics')} className="w-full py-5 bg-majestic text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3">
                    <span>{lang === Language.BN ? 'সত্য জানুন' : 'KNOW THE TRUTH'}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 'topics' && (
              <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4">
                <h3 className="text-xl font-black mb-6 uppercase">Interests</h3>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {CATEGORIES_LIST.map((cat) => (
                    <button key={cat.id} onClick={() => toggleCategory(cat.id)} className={`p-4 rounded-xl border-2 text-xs font-black uppercase transition-all flex items-center justify-between ${selectedCats.includes(cat.id) ? 'border-majestic bg-majestic/5 text-majestic' : 'border-gray-100 dark:border-gray-800'}`}>
                      <span>{lang === Language.BN ? cat.bn : cat.en}</span>
                    </button>
                  ))}
                </div>
                <button onClick={startDemo} className="mt-auto w-full py-4 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest">GENERATE AI FEED</button>
              </div>
            )}

            {step === 'demo' && (
              <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4">
                <h3 className="text-sm font-black uppercase text-majestic mb-6">YOUR AI TRUTH FEED</h3>
                <div className="flex-grow space-y-4 overflow-y-auto no-scrollbar">
                  {demoArticles.map((art) => (
                    <div key={art.id} className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <h4 className="text-sm font-bold mb-3 leading-tight">{art.title[lang]}</h4>
                      <p className="text-xs text-gray-500 italic">{summaries[art.id] || "Generating..."}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep('checkout')} className="mt-6 w-full py-4 bg-majestic text-white rounded-xl font-black text-xs uppercase tracking-widest">GET FULL ACCESS</button>
              </div>
            )}

            {step === 'checkout' && (
              <div className="h-full flex flex-col justify-center animate-in fade-in slide-in-from-right-4">
                <h3 className="text-3xl font-black mb-8 uppercase text-center">Unlock Intelligence</h3>
                <div className="space-y-4 mb-8">
                  <button onClick={() => { setSelectedPlan('monthly'); setStep('payment'); }} className="w-full p-6 border-2 border-majestic/20 rounded-2xl flex justify-between items-center group hover:border-majestic transition-all">
                    <div className="text-left">
                      <div className="font-black uppercase text-xs text-majestic mb-1">Standard Plan</div>
                      <div className="text-xl font-bold">Monthly Access</div>
                    </div>
                    <div className="text-2xl font-black text-majestic">৳100</div>
                  </button>
                  <button onClick={() => { setSelectedPlan('annual'); setStep('payment'); }} className="w-full p-6 bg-majestic text-white rounded-2xl flex justify-between items-center shadow-lg shadow-majestic/20">
                    <div className="text-left">
                      <div className="font-black uppercase text-xs text-majestic-light mb-1">Best Value</div>
                      <div className="text-xl font-bold">Annual Saver</div>
                    </div>
                    <div className="text-2xl font-black">৳1,000</div>
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4">
                <div className="mb-6">
                  <button onClick={() => setStep('checkout')} className="text-xs font-black text-majestic uppercase tracking-widest mb-4 hover:underline">← Change Plan</button>
                  <h3 className="text-2xl font-black uppercase">Secure Payment</h3>
                  <p className="text-sm text-gray-500 mt-2">Paying {selectedPlan === 'monthly' ? '৳100' : '৳1,000'} for AI Access.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 flex-grow">
                  {paymentMethods.map((pm) => (
                    <button key={pm.id} className="p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center space-y-3 hover:border-majestic transition-all group">
                      <div className={`w-12 h-12 ${pm.color} rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-110 transition-transform`}>
                        {pm.icon}
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">{pm.name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-8">Securely processed via SSLCommerz. Your data is encrypted.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPopup;
