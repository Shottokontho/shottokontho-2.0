
import React, { useState } from 'react';
import { Heart, X, Zap, ShieldCheck, CreditCard, Landmark } from 'lucide-react';
import { Language } from '../types';

interface DonationModalProps {
  lang: Language;
  authorName: string;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ lang, authorName, onClose }) => {
  const [step, setStep] = useState<'amount' | 'payment'>('amount');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const amounts = [50, 100, 500, 1000];

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', color: 'bg-[#e2136e]', icon: 'b' },
    { id: 'nagad', name: 'Nagad', color: 'bg-[#f47321]', icon: 'n' },
    { id: 'card', name: 'Card', color: 'bg-gray-800', icon: <CreditCard size={18} /> },
    { id: 'bank', name: 'Bank', color: 'bg-blue-800', icon: <Landmark size={18} /> }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-dark max-w-md w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-majestic transition-colors z-10">
          <X size={20} />
        </button>
        
        <div className="p-8">
          {step === 'amount' ? (
            <div className="animate-in slide-in-from-right-4">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-majestic rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart size={32} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">Support Journalism</h3>
                <p className="text-gray-500 text-sm">
                  Support <strong>{authorName}</strong> with a direct contribution to fuel truth-seeking.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {amounts.map((amount) => (
                  <button 
                    key={amount} 
                    onClick={() => setSelectedAmount(amount)}
                    className={`py-4 rounded-xl border-2 font-black transition-all ${selectedAmount === amount ? 'border-majestic text-majestic bg-majestic/5' : 'border-gray-100 dark:border-gray-800 hover:border-majestic'}`}
                  >
                    ৳{amount}
                  </button>
                ))}
              </div>

              <button 
                disabled={!selectedAmount}
                onClick={() => setStep('payment')}
                className="w-full py-4 bg-majestic text-white rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Zap size={18} />
                <span>Next: Choose Payment</span>
              </button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4">
              <button onClick={() => setStep('amount')} className="text-[10px] font-black uppercase tracking-widest text-majestic mb-4">← Back to Amount</button>
              <h3 className="text-xl font-black uppercase mb-6">Choose Payment Gateway</h3>
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((pm) => (
                  <button key={pm.id} className="p-5 border-2 border-gray-100 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-majestic transition-all group">
                    <div className={`w-10 h-10 ${pm.color} rounded-lg flex items-center justify-center text-white font-black shadow-sm group-hover:scale-110 transition-transform`}>
                      {pm.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase">{pm.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <ShieldCheck size={12} />
            <span>100% SECURE & DIRECT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
