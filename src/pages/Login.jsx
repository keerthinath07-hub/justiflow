import React, { useState } from 'react';
import { MOCK_USERS } from '../data/mockData';
import { dbService } from '../utilities/dbService';
import { Scale, Lock, Mail, ChevronRight, ArrowLeft, Database, ShieldAlert } from 'lucide-react';

export default function Login({ onLoginSuccess, onBackToLanding }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = dbService.isOnline();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Fetch users (from Supabase if configured, otherwise local storage)
      const users = await dbService.getUsers();
      const matchedUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (matchedUser) {
        // Simple password check (password equals "password" for all demo users)
        if (password === 'password') {
          onLoginSuccess(matchedUser);
        } else {
          setError('Invalid credentials. (Hint: Use "password" for the demo password)');
        }
      } else {
        setError('User not found. Check email or select a demo role below.');
      }
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectDemoRole = (user) => {
    setEmail(user.email);
    setPassword('password');
    setError('');
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-indigo-500/10 to-transparent dark:from-indigo-400/5 blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 z-10 transition-all duration-300">
        
        {/* Banner Left (hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-slate-950 p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-6">
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Website
            </button>
            <div className="pt-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
                <Scale className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">JustiFlow IN</h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                AI-driven docket management and optimization console for judicial officers and citizens.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              {isOnline ? (
                <>
                  <Database className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold">Supabase Connected</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-400 font-semibold">Local Sandbox Mode</span>
                </>
              )}
            </div>
            <p className="text-slate-500 text-[10px]">© Department of Justice, India</p>
          </div>
        </div>

        {/* Form Right */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white dark:bg-slate-900">
          {/* Header Mobile Support */}
          <div className="flex md:hidden justify-between items-center mb-6">
            <button onClick={onBackToLanding} className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"><ArrowLeft className="h-5 w-5" /></button>
            <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><Scale className="h-4 w-4 text-indigo-600" /> JustiFlow</span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white mb-2">Console Sign In</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Access judicial workflow registries and AI tools.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs font-semibold text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hc.gov.in"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/55 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
            >
              {isLoading ? 'Verifying Credentials...' : 'Secure Login'} <ChevronRight className="h-4 w-4" />
            </button>
          </form>

          {/* Demo Roles */}
          <div className="border-t border-slate-100 dark:border-slate-800 mt-6 pt-6 space-y-3">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Demo Access (Click to autofill)</p>
            <div className="flex flex-wrap gap-2">
              {MOCK_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => selectDemoRole(user)}
                  className="text-[11px] font-semibold px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-850 hover:border-slate-300 text-slate-700 dark:text-slate-350 rounded-xl transition-all cursor-pointer"
                >
                  {user.role} ({user.name.split(' ').pop()})
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
