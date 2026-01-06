
import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <Link to="/" className="block mb-6">
              <span className="text-4xl font-black tracking-tighter text-white">
                SHOTTOKONTHO
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {lang === Language.BN 
                ? 'সত্যের সাথে, ন্যায়ের পথে - আমরা বিশ্বাস করি বস্তুনিষ্ঠ সাংবাদিকতায়। বাংলাদেশের শীর্ষস্থানীয় ডিজিটাল সংবাদ মাধ্যম।'
                : 'With truth, on path of justice - we believe in objective journalism. Leading digital news media in Bangladesh.'}
            </p>
            <div className="flex items-center space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-majestic hover:border-majestic transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-l-2 border-majestic pl-3">
              {lang === Language.BN ? 'বিভাগসমূহ' : 'Categories'}
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link to="/category/national" className="hover:text-white transition-colors">National</Link></li>
              <li><Link to="/category/international" className="hover:text-white transition-colors">International</Link></li>
              <li><Link to="/category/travel" className="hover:text-white transition-colors">Travel Guides</Link></li>
              <li><Link to="/category/business" className="hover:text-white transition-colors">Business & Finance</Link></li>
              <li><Link to="/category/tech" className="hover:text-white transition-colors">Tech & Future</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-l-2 border-majestic pl-3">
              {lang === Language.BN ? 'কোম্পানি' : 'Company'}
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/partner" className="hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link to="/advertise" className="hover:text-white transition-colors">Advertise</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-l-2 border-majestic pl-3">
              {lang === Language.BN ? 'নিউজলেটার' : 'Newsletter'}
            </h4>
            <p className="text-gray-400 text-sm mb-6">
              {lang === Language.BN ? 'সাপ্তাহিক সেরা খবর ইনবক্সে পান।' : 'Get weekly top stories in your inbox.'}
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-gray-900 border-none rounded py-3 pl-4 pr-12 text-sm focus:ring-1 focus:ring-majestic"
              />
              <button className="absolute right-2 top-2 bg-majestic p-1.5 rounded">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © 2026 ShottoKontho Media Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
