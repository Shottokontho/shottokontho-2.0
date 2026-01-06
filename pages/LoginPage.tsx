
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin' && password === 'admin') {
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate('/profile');
    } else {
      setError('Invalid credentials. Use admin/admin for demo.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-dark border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl p-10">
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-black text-majestic tracking-tighter mb-4 block uppercase">SHOTTOKONTHO</Link>
          <h2 className="text-xl font-black uppercase tracking-widest">Login to Intelligence</h2>
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Demo: use admin / admin</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
            <div className="relative">
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-1 focus:ring-majestic"
                placeholder="admin"
              />
              <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-1 focus:ring-majestic"
                placeholder="admin"
              />
              <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>}

          <button type="submit" className="w-full py-5 bg-majestic text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center space-x-3">
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <ShieldCheck size={14} />
          <span>Secured by Enterprise Shield</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
