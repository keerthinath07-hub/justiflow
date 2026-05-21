import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scale, Brain, Shield, Database, Play } from 'lucide-react';

export default function Hero({ onLoginClick, currentUser, onDashboardClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent dark:from-indigo-400/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300 shadow-sm text-xs font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            Empowering the Indian Judiciary with AI
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Streamlining Justice,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              One Case at a Time.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            JustiFlow IN is a high-performance judicial optimization suite. Leveraging advanced docket balancing algorithms, real-time NJDG synchronization, and secure e-filing to clear case backlogs.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {currentUser ? (
              <button
                onClick={onDashboardClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/35 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Go to Console <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/35 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Launch Console <ArrowRight className="h-5 w-5" />
              </button>
            )}
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl shadow-sm transition-all"
            >
              <Play className="h-4 w-4 fill-current text-slate-500" /> Explore Features
            </a>
          </motion.div>

          {/* Interactive Stats Panel */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/50 dark:border-slate-800/30"
          >
            {[
              { label: 'Disposal Rate', value: '+12.4%', sub: 'Avg Bench Increase' },
              { label: 'Sync Latency', value: '42ms', sub: 'NJDG Sync active' },
              { label: 'Adjournment Limit', value: '3 Max', sub: 'O.17 CPC Compliance' },
              { label: 'AI Docket Balancing', value: '98%', sub: 'Workload Efficiency' }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900/50 backdrop-blur-sm shadow-sm text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mt-1">{stat.label}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* Hero App Mockup / Visual */}
          <motion.div
            variants={itemVariants}
            className="relative mt-12 max-w-5xl mx-auto rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-3 shadow-2xl shadow-slate-200 dark:shadow-none overflow-hidden"
          >
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 md:p-6 text-left aspect-video overflow-hidden relative group">
              {/* Fake dashboard headers */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-slate-500 uppercase tracking-widest">JUSTIFLOW WORKBENCH IN</span>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
                  NJDG SYNC: ACTIVE
                </span>
              </div>
              {/* Fake inner content */}
              <div className="grid grid-cols-3 gap-4 pt-4 h-full">
                <div className="col-span-2 space-y-4">
                  <div className="h-28 rounded-2xl bg-indigo-900 text-white p-4 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <p className="text-lg font-bold">Judicial Efficiency Workbench</p>
                      <p className="text-xs text-indigo-200">State and Case Analytics dashboard live.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20 font-semibold">Disposals: +12.4%</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20 font-semibold">Overload: Resolved</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pendency</span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">4,202 Cases</span>
                    </div>
                    <div className="h-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Disposal Time</span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">1.8 Years</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3 flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Case Insights</span>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-indigo-600 rounded-full" />
                    </div>
                    <p className="text-[10px] text-slate-500">Case MHBO is classified as High Risk (85%) - Adjournment limit breached.</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold text-indigo-600">
                    <span>Clearance Index</span>
                    <span>104%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
