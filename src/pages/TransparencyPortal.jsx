import React, { useState } from 'react';
import { Compass, Award, BarChart3, Scale, Search, ShieldCheck } from 'lucide-react';

export default function TransparencyPortal() {
  const [searchQuery, setSearchQuery] = useState('');

  const advocates = [
    { rank: 1, name: 'Adv. Vikram Singh', casesHandled: 42, successRate: '88%', avgAdjournments: 1.2, rankTier: 'A++ Tier' },
    { rank: 2, name: 'Adv. Meenakshi Lekhi', casesHandled: 35, successRate: '82%', avgAdjournments: 1.5, rankTier: 'A+ Tier' },
    { rank: 3, name: 'Adv. Harish Salve Chambers', casesHandled: 50, successRate: '80%', avgAdjournments: 1.1, rankTier: 'A+ Tier' },
    { rank: 4, name: 'Adv. Kapil Sibal Office', casesHandled: 48, successRate: '78%', avgAdjournments: 1.8, rankTier: 'A Tier' },
    { rank: 5, name: 'Adv. Abhishek Singhvi', casesHandled: 30, successRate: '75%', avgAdjournments: 2.1, rankTier: 'B Tier' }
  ];

  const filteredAdvocates = advocates.filter((adv) =>
    adv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="h-6 w-6 text-indigo-600" /> Public Transparency & Advocate Index
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access court clearance metrics and advocate performance parameters transparently.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Public stats grid (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">National Case Clearance Index</span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">104.2%</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Target matched (&gt; 100% clearing backlog)</p>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Adjournment Ratio</span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">1.4 Days</h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1">Compliance: Article 21 Time-bound Limits</p>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

          </div>

          {/* Advocate index list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" /> Advocate Performance Index (API)
              </h3>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search counsel name..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-slate-900/50">
                    <th className="p-4 pl-6">Rank</th>
                    <th className="p-4">Counsel Name</th>
                    <th className="p-4">Cases Handled</th>
                    <th className="p-4">Success Rate</th>
                    <th className="p-4">Avg Adjournments</th>
                    <th className="p-4 text-right pr-6">Performance Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredAdvocates.map((adv) => (
                    <tr key={adv.rank} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="p-4 pl-6 font-extrabold text-indigo-600 dark:text-indigo-400">#{adv.rank}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{adv.name}</td>
                      <td className="p-4 font-semibold text-slate-500">{adv.casesHandled} cases</td>
                      <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">{adv.successRate}</td>
                      <td className="p-4 font-semibold text-slate-700 dark:text-slate-350">{adv.avgAdjournments}</td>
                      <td className="p-4 text-right pr-6">
                        <span className="px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/20 text-[9px]">
                          {adv.rankTier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Audit reports sidebar (1 col) */}
        <div className="bg-slate-950 text-white rounded-3xl border border-slate-900 p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-extrabold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" /> Digital Performance Auditing
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Advocate Performance Indexes are computed objectively using raw electronic registry entries: disposal duration, adherence to cause-list, adjournment motions, and case outcomes.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-900">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Public Access Portal</span>
                <span className="text-emerald-400 font-bold">Authorized</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">GDPR Compliance</span>
                <span className="text-slate-350">Certified (DPDP Act)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Verification Source</span>
                <span className="text-indigo-400 font-semibold">NIC High Court Core</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 text-[10px] text-slate-500 leading-relaxed">
            Data refreshed hourly from state registries. To correct a counsel listing, registry credentials are required.
          </div>
        </div>

      </div>
    </div>
  );
}
