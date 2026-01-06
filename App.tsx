
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Language } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AIPopup from './components/AIPopup';
import DonationModal from './components/DonationModal';
import PartnerModal from './components/PartnerModal';

const PartnerPage = ({ lang }: { lang: Language }) => (
  <div className="container mx-auto px-4 py-20 text-center max-w-4xl animate-in fade-in duration-700">
    <h1 className="text-5xl font-black mb-8 uppercase tracking-tight">Become a Partner</h1>
    <p className="text-xl text-gray-500 mb-12">ShottoKontho offers premium opportunities for high-quality guest publishing and paid backlink partnerships. Reach millions of engaged readers in the BD-US-UK diaspora.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-bold mb-4 uppercase text-majestic">Guest Publishing</h3>
        <p className="text-sm text-gray-400 mb-6">Submit your investigative pieces or op-eds. We accept high-authority content only.</p>
        <button className="w-full py-3 bg-majestic text-white font-black rounded-xl">APPLY NOW</button>
      </div>
      <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-bold mb-4 uppercase text-majestic">Paid Backlinks</h3>
        <p className="text-sm text-gray-400 mb-6">Boost your SEO with do-follow links in relevant articles. Starting from 5,000 BDT/month.</p>
        <button className="w-full py-3 border-2 border-majestic text-majestic font-black rounded-xl">GET RATES</button>
      </div>
    </div>
  </div>
);

const RouteTracker = ({ setPageCount }: { setPageCount: React.Dispatch<React.SetStateAction<number>> }) => {
  const location = useLocation();
  useEffect(() => {
    setPageCount(prev => prev + 1);
  }, [location.pathname, setPageCount]);
  return null;
};

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.BN);
  const [isDark, setIsDark] = useState(false);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [showDonation, setShowDonation] = useState(false);
  const [showPartner, setShowPartner] = useState(false);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    setIsDark(isNight);

    const dismissed = sessionStorage.getItem('ai_popup_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShowAIPopup(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (pageCount === 3) {
      const dismissed = sessionStorage.getItem('partner_dismissed');
      if (!dismissed) setShowPartner(true);
    }
    if (pageCount === 6) {
      const dismissed = sessionStorage.getItem('donation_dismissed');
      if (!dismissed) setShowDonation(true);
    }
  }, [pageCount]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleCloseAI = () => {
    setShowAIPopup(false);
    sessionStorage.setItem('ai_popup_dismissed', 'true');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${isDark ? 'dark:bg-dark dark:text-gray-100' : 'bg-white text-gray-900'}`}>
      <RouteTracker setPageCount={setPageCount} />
      <Header lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/article/:id" element={<ArticlePage lang={lang} />} />
          <Route path="/category/:categoryId" element={<CategoryPage lang={lang} />} />
          <Route path="/partner" element={<PartnerPage lang={lang} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/profile" 
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} 
          />
          <Route path="/subscribe" element={<div className="container mx-auto p-20 text-center"><h1 className="text-4xl font-black">Subscription Tiers Coming Soon</h1></div>} />
        </Routes>
      </div>

      <Footer lang={lang} />

      {showAIPopup && <AIPopup lang={lang} onClose={handleCloseAI} />}
      {showDonation && <DonationModal lang={lang} authorName="Rahim Khan" onClose={() => { setShowDonation(false); sessionStorage.setItem('donation_dismissed', 'true'); }} />}
      {showPartner && <PartnerModal lang={lang} onClose={() => { setShowPartner(false); sessionStorage.setItem('partner_dismissed', 'true'); }} />}
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
