
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { CATEGORIES_LIST, LANGUAGES, MOCK_USER } from '../constants';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  isDark: boolean;
  setIsDark: (d: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, isDark, setIsDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  // Checking login status
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-dark/95 shadow-lg backdrop-blur-md py-2' : 'bg-white dark:bg-dark py-4'
    }`}>
      <div className="container mx-auto px-4">
        {/* Top Bar (Desktop Only) */}
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-800 pb-2 hidden md:flex">
          <div className="flex items-center space-x-4 text-xs font-medium text-gray-500">
            <span>{new Date().toLocaleDateString(lang === Language.BN ? 'bn-BD' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center space-x-6">
            {LANGUAGES.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id as Language)}
                className={`text-xs uppercase tracking-wider font-bold hover:text-majestic transition-colors ${lang === l.id ? 'text-majestic' : 'text-gray-400'}`}
              >
                {l.label}
              </button>
            ))}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-1 hover:text-majestic transition-colors text-gray-400"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/subscribe" className="bg-majestic text-white px-4 py-1 text-xs font-bold rounded uppercase tracking-widest hover:bg-majestic-dark transition-all">
              {lang === Language.BN ? 'সাবস্ক্রাইব' : 'Subscribe'}
            </Link>
          </div>
        </div>

        {/* Main Nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? <X /> : <Menu />}
            </button>
            <Link to="/" className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-majestic dark:text-majestic-light leading-none">
                SHOTTOKONTHO
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase">
                {lang === Language.BN ? 'সত্যের সাথে, ন্যায়ের পথে' : 'With Truth, On Path of Justice'}
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {CATEGORIES_LIST.slice(0, 6).map((cat) => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`}
                className="text-xs font-black uppercase tracking-widest hover:text-majestic transition-colors border-b-2 border-transparent hover:border-majestic pb-1"
              >
                {lang === Language.BN ? cat.bn : cat.en}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hover:text-majestic transition-colors hidden sm:block p-2 text-gray-400">
              <Search size={22} />
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 pr-3 md:pr-4 rounded-full hover:bg-majestic hover:text-white transition-all group">
                  <div className="w-8 h-8 bg-majestic text-white rounded-full flex items-center justify-center text-xs font-black group-hover:bg-white group-hover:text-majestic transition-colors">
                    {MOCK_USER.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Profile</span>
                </Link>
                <button onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-majestic transition-colors hidden lg:block">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-[10px] font-black uppercase tracking-widest hover:text-majestic transition-colors px-3 py-2 border-r border-gray-100 dark:border-gray-800">
                  {lang === Language.BN ? 'লগইন' : 'Login'}
                </Link>
                <Link to="/login" className="bg-black dark:bg-white dark:text-black text-white px-4 md:px-6 py-2 text-[10px] font-black rounded-full uppercase tracking-widest hover:bg-majestic hover:text-white transition-all whitespace-nowrap shadow-lg">
                  {lang === Language.BN ? 'নিবন্ধন' : 'Sign Up'}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-4">
              {CATEGORIES_LIST.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/category/${cat.id}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-black uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-3"
                >
                  {lang === Language.BN ? cat.bn : cat.en}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-4">
                {!isLoggedIn && (
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 bg-majestic text-white text-center rounded-xl font-black uppercase text-xs tracking-widest"
                  >
                    {lang === Language.BN ? 'লগইন / নিবন্ধন' : 'Login / Sign Up'}
                  </Link>
                )}
                {isLoggedIn && (
                  <>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-widest">My Profile</Link>
                    <button onClick={handleLogout} className="text-left text-sm font-black uppercase tracking-widest text-majestic">Logout</button>
                  </>
                )}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex space-x-4">
                    {LANGUAGES.map((l) => (
                      <button key={l.id} onClick={() => setLang(l.id as Language)} className={`text-xs font-black uppercase tracking-widest ${lang === l.id ? 'text-majestic' : 'text-gray-400'}`}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setIsDark(!isDark)} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
