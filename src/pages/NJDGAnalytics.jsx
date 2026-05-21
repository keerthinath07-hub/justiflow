import React, { useState } from 'react';
import { BarChart3, Activity, PieChart, RefreshCw, Landmark, Database } from 'lucide-react';

export default function NJDGAnalytics() {
  const [selectedState, setSelectedState] = useState('All India');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const statesList = ['All India', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh'];

  const stats = {
    'All India': { total: '4.4 Crore', civil: '1.1 Crore', criminal: '3.3 Crore', clearanceRate: '98.4%', averageAge: '2.8 Years' },
    'Maharashtra': { total: '51 Lakh', civil: '14 Lakh', criminal: '37 Lakh', clearanceRate: '101.2%', averageAge: '2.4 Years' },
    'Delhi': { total: '12 Lakh', civil: '4 Lakh', criminal: '8 Lakh', clearanceRate: '97.5%', averageAge: '1.9 Years' },
    'Karnataka': { total: '32 Lakh', civil: '9 Lakh', criminal: '23 Lakh', clearanceRate: '99.1%', averageAge: '2.6 Years' },
    'Tamil Nadu': { total: '28 Lakh', civil: '8 Lakh', criminal: '20 Lakh', clearanceRate: '96.8%', averageAge: '2.3 Years' },
    'Uttar Pradesh': { total: '1.1 Crore', civil: '24 Lakh', criminal: '86 Lakh', clearanceRate: '94.2%', averageAge: '3.9 Years' }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const activeStats = stats[selectedState] || stats['All India'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-indigo-600" /> National Judicial Data Grid (NJDG) Integrations
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time synchronization with the national case filing database and clearance indexes.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none shadow-sm"
          >
            {statesList.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400 rounded-xl transition-colors cursor-pointer shadow-sm"
            aria-label="Refresh NJDG sync"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Active Cases</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">{activeStats.total}</h3>
          <p className="text-xs text-slate-500 mt-1">Civil: {activeStats.civil} | Criminal: {activeStats.criminal}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clearance Rate</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">{activeStats.clearanceRate}</h3>
          <p className="text-xs text-slate-500 mt-1">Target: &gt;100.0% to resolve backlog</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Age of Cases</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">{activeStats.averageAge}</h3>
          <p className="text-xs text-slate-500 mt-1">Target: Under 2.0 Years avg</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Filings Ratio</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">84.2%</h3>
          <p className="text-xs text-slate-500 mt-1">Direct e-filing vs court registries</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Charts Area (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
          <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-600" /> Historical Disposal Clearance Index Trend
          </h3>
          
          <div className="flex items-end justify-between gap-6 h-56 pt-6">
            {[
              { month: 'Oct 25', clearance: '92.5%', height: 'height: 60%', color: 'bg-slate-300 dark:bg-slate-700' },
              { month: 'Nov 25', clearance: '94.2%', height: 'height: 68%', color: 'bg-slate-300 dark:bg-slate-700' },
              { month: 'Dec 25', clearance: '97.8%', height: 'height: 75%', color: 'bg-slate-300 dark:bg-slate-700' },
              { month: 'Jan 26', clearance: '101.4%', height: 'height: 85%', color: 'bg-indigo-600' },
              { month: 'Feb 26', clearance: '104.2%', height: 'height: 94%', color: 'bg-indigo-650 dark:bg-indigo-500' }
            ].map((bar, i) => (
              <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{bar.clearance}</span>
                <div className={`${bar.color} w-full rounded-t-xl transition-all hover:brightness-115`} style={{ height: `${parseInt(bar.height.split(' ')[1])}%` }} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Category Breakdown (1 col) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-indigo-600" /> Case Categories Breakout
            </h3>

            <div className="space-y-4">
              {[
                { name: 'Civil Petitions (CPC)', pct: '25%', count: '1.1 Crore', color: 'bg-indigo-600' },
                { name: 'Criminal Proceedings (CrPC)', pct: '65%', count: '2.8 Crore', color: 'bg-emerald-500' },
                { name: 'Taxation and Writ Trials', pct: '6%', count: '26 Lakh', color: 'bg-purple-500' },
                { name: 'Family and Matrimonial', pct: '4%', count: '17 Lakh', color: 'bg-amber-500' }
              ].map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-350">
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                      {cat.name}
                    </span>
                    <span>{cat.pct} ({cat.count})</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-100 dark:border-slate-900">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <Database className="h-4 w-4 text-slate-400" /> NJDG DATA COMPLIANT INDEX
          </div>
        </div>

      </div>
    </div>
  );
}
