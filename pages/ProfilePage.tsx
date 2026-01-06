
import React from 'react';
import { MOCK_USER, MOCK_ARTICLES } from '../constants';
import { Zap, TrendingUp, BarChart3, Clock, DollarSign, ArrowUpRight, Award, User as UserIcon } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const user = MOCK_USER;
  const userArticles = MOCK_ARTICLES.filter(a => user.articlesPublished.includes(a.id));
  const totalViews = userArticles.reduce((sum, art) => sum + art.views, 0);
  const totalEarnings = (totalViews / 1000) * 100;

  // Earnings history mockup for infographics (3 months)
  const earningsHistory = [
    { month: 'Oct', amount: 12400 },
    { month: 'Nov', amount: 15600 },
    { month: 'Dec', amount: totalEarnings }
  ];

  const maxEarnings = Math.max(...earningsHistory.map(h => h.amount));

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700 pb-24">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-majestic text-white rounded-[2rem] flex items-center justify-center text-4xl font-black shadow-xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-majestic mb-2">Verified Author & Partner</div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{user.name}</h1>
              <div className="text-gray-400 text-sm font-bold mt-2">{user.email}</div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-black uppercase tracking-widest">Edit Profile</button>
            <button className="px-6 py-3 bg-black dark:bg-white dark:text-black text-white rounded-xl text-xs font-black uppercase tracking-widest">Post Article</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-4 space-y-8">
            {/* AI Subscription */}
            <div className="bg-gradient-to-br from-majestic to-black p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
              <Zap className="absolute -right-8 -bottom-8 text-white/5" size={180} />
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-majestic-light mb-6 text-xs font-black uppercase tracking-widest">
                  <Zap size={16} />
                  <span>AI Subscription</span>
                </div>
                <div className="text-3xl font-black uppercase mb-2">
                  {user.aiSubscription?.isActive ? 'ACTIVE PRO' : 'INACTIVE'}
                </div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest">
                  Expires: {user.aiSubscription?.expiryDate}
                </div>
                <button className="mt-8 w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-majestic-light hover:text-white transition-all">
                  Manage Plan
                </button>
              </div>
            </div>

            {/* Investment Info */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center space-x-2 text-gray-400 mb-6 text-xs font-black uppercase tracking-widest">
                <TrendingUp size={16} />
                <span>Equity Holding</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-4xl font-black">1.0%</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Share</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">৳{user.investment?.amountInvested.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Initial Investment</div>
                </div>
              </div>
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                <div className="flex justify-between items-center text-green-600">
                  <span className="text-xs font-black uppercase tracking-widest">Total ROI (Dividends)</span>
                  <div className="flex items-center font-black">
                    <ArrowUpRight size={14} className="mr-1" />
                    ৳{user.investment?.totalROI.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Earnings Infographics */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight flex items-center space-x-3">
                    <BarChart3 className="text-majestic" />
                    <span>Author Earnings Desk</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-widest">Base Payout: ৳100 per 1000 views</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 rounded-2xl flex items-center space-x-4">
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Balance</div>
                    <div className="text-2xl font-black text-majestic">৳{totalEarnings.toLocaleString()}</div>
                  </div>
                  <button className="p-2 bg-majestic text-white rounded-lg hover:scale-105 transition-transform">
                    <DollarSign size={20} />
                  </button>
                </div>
              </div>

              {/* Earnings Infographic Chart */}
              <div className="mb-12">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Previous 3 Months Growth</h4>
                <div className="flex items-end space-x-6 h-48 px-4">
                  {earningsHistory.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group">
                      <div className="w-full relative bg-gray-50 dark:bg-gray-800 rounded-t-xl overflow-hidden transition-all duration-700" style={{ height: `${(h.amount / maxEarnings) * 100}%` }}>
                        <div className="absolute inset-0 bg-majestic/20 group-hover:bg-majestic transition-colors duration-500"></div>
                        <div className="absolute top-2 left-0 w-full text-center text-[10px] font-black text-majestic dark:text-white drop-shadow-md">
                          ৳{Math.floor(h.amount/1000)}K
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-4">{h.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Article Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
                      <th className="pb-4 pr-4">Article Topic</th>
                      <th className="pb-4 px-4 text-center">Views</th>
                      <th className="pb-4 px-4 text-center">Category</th>
                      <th className="pb-4 pl-4 text-right">Earning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {userArticles.map(art => (
                      <tr key={art.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-5 pr-4">
                          <div className="font-bold text-sm line-clamp-1 group-hover:text-majestic transition-colors">{art.title.en}</div>
                        </td>
                        <td className="py-5 px-4 text-center">
                          <span className="text-xs font-black">{art.views.toLocaleString()}</span>
                        </td>
                        <td className="py-5 px-4 text-center">
                          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">{art.category}</span>
                        </td>
                        <td className="py-5 pl-4 text-right">
                          <span className="text-xs font-black text-majestic">৳{((art.views / 1000) * 100).toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
