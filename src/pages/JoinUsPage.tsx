import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Lock, User, Shield, ArrowRight } from 'lucide-react';

export const JoinUsPage = () => {
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - ignore credentials
    login(role);
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-brand-bg relative overflow-hidden flex items-center justify-center">
      {/* Background styling similar to other pages */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[128px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-brand-bg border border-brand-accent/25 shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)] rounded-2xl relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border border-brand-accent/40 bg-brand-accent/5 flex items-center justify-center">
            <Lock className="w-8 h-8 text-brand-accent" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-white text-center mb-2 uppercase tracking-[1px]">Welcome Back</h1>
        <p className="text-brand-muted text-[13px] uppercase tracking-[1px] text-center mb-8">Login to access your dashboard</p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setRole('user')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all border ${
              role === 'user' ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'bg-transparent border-brand-accent/25 text-brand-muted hover:border-brand-accent/60'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-bold text-[12px] uppercase tracking-[1px]">User</span>
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all border ${
              role === 'admin' ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]' : 'bg-transparent border-brand-accent/25 text-brand-muted hover:border-brand-accent/60'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span className="font-bold text-[12px] uppercase tracking-[1px]">Admin</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-[1px] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-brand-bg border border-brand-accent/25 rounded-lg text-white focus:outline-none focus:border-brand-accent transition-colors"
              placeholder={`demo@${role}.com`}
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-[1px] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-brand-bg border border-brand-accent/25 rounded-lg text-white focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-4 mt-4 bg-white text-black border border-white hover:bg-transparent hover:text-white transition-colors duration-300 font-black uppercase tracking-[2px] rounded-lg flex items-center justify-center gap-2 group"
          >
            <span>Login as {role === 'admin' ? 'Admin' : 'User'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <p className="mt-6 text-[10px] uppercase tracking-[1px] text-center text-brand-muted">
          * This is a demonstration login. Any email/password will work.
        </p>
      </motion.div>
    </div>
  );
};
