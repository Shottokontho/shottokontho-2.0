
import React, { useState } from 'react';
import { TrendingUp, X, BarChart3, Users, Globe2, ArrowUpRight, DollarSign, CreditCard, Landmark } from 'lucide-react';
import { Language } from '../types';

interface PartnerModalProps {
  lang: Language;
  onClose: () => void;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ lang, onClose }) => {
  const [step, setStep] = useState<'info' | 'payment'>('info');

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', color: 'bg-[#e2136e]', icon: 'b' },
    { id: 'nagad', name: 'Nagad', color: 'bg-[#f47321]', icon: 'n' },
    { id: 'card', name: 'Card', color: 'bg-gray-800', icon: <CreditCard size={18} /> },
    { id: 'bank', name: 'Bank', color: 'bg-blue-800', icon: <Landmark size={18} /> }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-dark max-w-3xl w-full rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full z-10">
          <X size={20} />
        </button>

        <div className="w-full md:w-1/2 bg-black text-white p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-majestic-light mb-8 text-xs font-black uppercase tracking-[0.2em]">
              <TrendingUp size={16} />
              <span>Investment Opportunity</span>
            </div>
            <h2 className="text-4xl font-black leading-none mb-6 uppercase">OWN THE FUTURE.</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              ShottoKontho is redefining media for 20M+ Bangla speakers. We are offering limited equity to visionary partners.
            </p>
          </div>
          
          <div className="bg-majestic/20 border border-majestic/30 p-6 rounded-2xl">
            <div className="text-majestic-light text-[10px] font-black uppercase mb-1">Fixed Valuation</div>
            <div className="text-2xl font-black">1% Share = ৳1,00,000</div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10 bg-gray-50 dark:bg-gray-900/50">
          {step === 'info' ? (
            <div className="animate-in slide-in-from-right-4">
              <h3 className="text-lg font-black uppercase mb-8 flex items-center space-x-2">
                <BarChart3 size={20} className="text-majestic" />
                <span>Growth Infographic</span>
              </h3>

              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                    <span>Revenue Growth</span>
                    <span className="text-green-500">+340%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-majestic w-[85%] rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <Users size={18} className="text-majestic mb-2" />
                    <div className="text-xl font-black">2.4M</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Monthly Readers</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <Globe2 size={18} className="text-majestic mb-2" />
                    <div className="text-xl font-black">12+</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Country Desks</div>
                  </div>
                </div>

                <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-start space-x-4">
                  <div className="p-2 bg-green-500 rounded-lg text-white"><DollarSign size={20} /></div>
                  <div>
                    <div className="text-sm font-black text-green-600 uppercase">Partner Dividends</div>
                    <p className="text-[10px] text-gray-500 leading-tight mt-1">Our early partners have already received 18% ROI in dividends within 12 months.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep('payment')}
                className="w-full py-5 bg-black dark:bg-white dark:text-black text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:scale-[1.02] transition-all"
              >
                <span>Invest ৳1,00,000 Now</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4">
              <button onClick={() => setStep('info')} className="text-[10px] font-black uppercase tracking-widest text-majestic mb-4">← Back to Details</button>
              <h3 className="text-2xl font-black uppercase mb-8">Select Payment Gateway</h3>
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((pm) => (
                  <button key={pm.id} className="p-8 border-2 border-gray-100 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center space-y-4 hover:border-majestic transition-all group">
                    <div className={`w-14 h-14 ${pm.color} rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-110 transition-transform`}>
                      {pm.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">{pm.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-10">All investments are subject to Share Purchase Agreements (SPA). Securely processed via SSLCommerz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerModal;
