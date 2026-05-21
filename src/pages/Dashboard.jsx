import React from 'react';
import { Briefcase, Clock, Activity, Users, AlertTriangle, FileSignature, CreditCard, Shield, Gavel, Calendar, CheckCircle2, ChevronRight, Wand2 } from 'lucide-react';

export default function Dashboard({ currentUser, cases, hearings, documents, onSwitchTab, onOpenOptimizer, onOpenNewCase, onOpenUpload, onOpenEChallan }) {
  const role = currentUser.role;

  // Filter cases for the current user
  const getFilteredCases = () => {
    if (['Admin', 'Clerk'].includes(role)) return cases;
    if (role === 'Judge') return cases.filter((c) => c.judgeId === currentUser.id);
    if (role === 'Lawyer') return cases.filter((c) => c.lawyerId === currentUser.id);
    if (role === 'Litigant') return cases.filter((c) => c.litigantId === currentUser.id);
    return [];
  };

  const userCases = getFilteredCases();
  const activeCases = userCases.filter(c => c.status !== 'Disposed');
  const highPriorityCases = userCases.filter(c => c.priority === 'High');
  const userHearings = hearings.filter(h => userCases.some(c => c.id === h.caseId));

  const StatCard = ({ title, value, icon, trend, trendColor = 'text-indigo-600 dark:text-indigo-400', bgClass = 'bg-indigo-50 dark:bg-indigo-950/40' }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${bgClass} text-slate-700 dark:text-slate-200`}>
          {icon}
        </div>
      </div>
      {trend && <div className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">{trend}</div>}
    </div>
  );

  const HeaderBanner = () => (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden border border-indigo-800/50">
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5">
            <Activity className="h-6 w-6 text-indigo-400 animate-pulse" /> Judicial Efficiency Monitor
          </h2>
          <p className="text-indigo-200/80 text-sm mt-1.5 font-medium">
            National Data Sync Tunnel: Active • Compliance: 94.2% (Article 21)
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="text-center bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/10 hidden sm:block">
            <p className="text-[10px] uppercase text-indigo-300 font-bold">Disposal Index</p>
            <p className="text-lg font-black text-emerald-400">+12.4%</p>
          </div>
          <div className="text-center bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/10 hidden sm:block">
            <p className="text-[10px] uppercase text-indigo-300 font-bold">Avg Pendency</p>
            <p className="text-lg font-black text-emerald-400">-4.2%</p>
          </div>
          {role === 'Admin' && (
            <button
              onClick={onOpenOptimizer}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer border border-indigo-500"
            >
              <Wand2 className="h-4 w-4" /> Optimize Benches
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const getBadgeColor = (type) => {
    const colors = {
      High: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
      'Time-bound': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
      Routine: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800',
      Pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
      'Pending Verification': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
      'Reserved for Orders': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30',
      Disposed: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
      Scheduled: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30',
      Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30'
    };
    return colors[type] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  // --- 1. SYSTEM ADMIN PANEL ---
  if (role === 'Admin') {
    return (
      <div className="space-y-6">
        <HeaderBanner />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Pendency" value={`${cases.length} Cases`} icon={<Briefcase className="h-5 w-5 text-indigo-600" />} trend="Synced with National Grid" />
          <StatCard title="Adjournment Rate" value="14.2%" icon={<Clock className="h-5 w-5 text-red-600" />} trend="Target limit: < 5.0%" bgClass="bg-red-50 dark:bg-red-950/30" />
          <StatCard title="Avg Disposal Time" value="420 Days" icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />} trend="-15 Days last month" bgClass="bg-emerald-50 dark:bg-emerald-950/30" />
          <StatCard title="Judge Allocation" value="98%" icon={<Users className="h-5 w-5 text-blue-600" />} trend="17 Active High Court Benches" bgClass="bg-blue-50 dark:bg-blue-950/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart area */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-600" /> Case Age Distribution (National Grid)
            </h3>
            <div className="flex items-end justify-between gap-6 h-48 pt-6">
              {[
                { label: '0-1 Year', count: 12, pct: 'height: 25%', color: 'bg-emerald-500' },
                { label: '1-3 Years', count: 28, pct: 'height: 55%', color: 'bg-amber-500' },
                { label: '3+ Years', count: 8, pct: 'height: 20%', color: 'bg-red-500' }
              ].map((bar, i) => (
                <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group">
                  <span className="text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{bar.count} Cases</span>
                  <div className={`${bar.color} w-full rounded-t-xl transition-all hover:brightness-110`} style={{ height: `${parseInt(bar.pct.split(' ')[1])}%` }} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency Alerts */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" /> Administrative Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/20 rounded-2xl">
                <p className="text-xs font-bold text-red-800 dark:text-red-400">Excessive Adjournments</p>
                <p className="text-[11px] text-red-600 dark:text-red-300 mt-1">Advocate Vikram Singh requested 7th adjournment in case DLND-2021.</p>
              </div>
              <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/20 rounded-2xl">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400">Bench Timeline Delay</p>
                <p className="text-[11px] text-amber-600 dark:text-amber-300 mt-1">Case KAEN-2026 reached trial stage without summons return validation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. JUDICIAL WORKBENCH (JUDGES) ---
  if (role === 'Judge') {
    return (
      <div className="space-y-6">
        <HeaderBanner />
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Presiding Officer Workbench</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage trial proceedings, verify court transcripts, and log verdicts.</p>
          </div>
          <button
            onClick={() => onSwitchTab('hearings')}
            className="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-xl border border-indigo-100 dark:border-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            Weekly Cause List
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Docket" value={`${activeCases.length} Cases`} icon={<Gavel className="h-5 w-5 text-indigo-600" />} />
          <StatCard title="Disposal Yield" value="84%" icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />} trend="+4% this quarter" bgClass="bg-emerald-50 dark:bg-emerald-950/30" />
          <StatCard title="Allowed Adjournments" value="2" icon={<Clock className="h-5 w-5 text-amber-600" />} trend="Limit: Max 3 per case" bgClass="bg-amber-50 dark:bg-amber-950/30" />
          <StatCard title="Active Injunctions" value="5" icon={<Shield className="h-5 w-5 text-blue-600" />} trend="Article 226/32 trials" bgClass="bg-blue-50 dark:bg-blue-950/30" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <h3 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Gavel className="h-5 w-5 text-indigo-600" /> Active Docket: Priority Tracking
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-slate-900/50">
                  <th className="p-4 pl-6">CNR / Party Name</th>
                  <th className="p-4">Track Priority</th>
                  <th className="p-4">Case Age</th>
                  <th className="p-4">Adjournments Granted</th>
                  <th className="p-4">Filing Date</th>
                  <th className="p-4 text-right pr-6">Workflow Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {userCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-6">
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">{c.cnr}</p>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium mt-0.5">{c.title}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${getBadgeColor(c.priority)}`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${getBadgeColor(c.ageCategory)}`}>
                        {c.ageCategory}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      <span className={c.adjournments >= 3 ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-350'}>
                        {c.adjournments}
                      </span>
                      <span className="text-[10px] text-slate-400"> / 3 allowed</span>
                    </td>
                    <td className="p-4 text-xs font-semibold text-slate-500">{c.filingDate}</td>
                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => onSwitchTab('docs')}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold text-xs bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900/60 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        Open File
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. REGISTRY CLERK CONSOLE ---
  if (role === 'Clerk') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Registry & intake Console</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Audit incoming petitions, process court fees, and generate legal notices.</p>
          </div>
          <button
            onClick={onOpenNewCase}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer border border-indigo-500"
          >
            + Register Case (Generate CNR)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Pending Vakalatnama" value="8 Files" icon={<FileSignature className="h-5 w-5 text-amber-600" />} bgClass="bg-amber-50 dark:bg-amber-950/30" />
          <StatCard title="Registry Fees Collected" value="₹45,200" icon={<CreditCard className="h-5 w-5 text-emerald-600" />} bgClass="bg-emerald-50 dark:bg-emerald-950/30" />
          <StatCard title="Summons to Issue" value="12 Orders" icon={<Gavel className="h-5 w-5 text-blue-600" />} bgClass="bg-blue-50 dark:bg-blue-950/30" />
          <StatCard title="Bail Bonds Audited" value="3 Files" icon={<Shield className="h-5 w-5 text-purple-600" />} bgClass="bg-purple-50 dark:bg-purple-950/30" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm">
          <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-600" /> Administrative Intake Queue
          </h3>
          <div className="space-y-4">
            {userCases.filter(c => c.status === 'Pending').map((c) => (
              <div key={c.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{c.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/20">{c.cnr}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Nature of Suit: {c.type} • Filed: {c.filingDate}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-xs font-bold transition-all cursor-pointer">
                    Issue Notice
                  </button>
                  <button
                    onClick={() => onSwitchTab('docs')}
                    className="flex-1 sm:flex-none px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Verify Files
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- 4. ADVOCATE PORTAL (LAWYERS) ---
  if (role === 'Lawyer') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Counsel Litigation Workbench</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">File new petitions, monitor active court hearings, and submit client affidavits.</p>
          </div>
          <button
            onClick={onOpenNewCase}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer border border-indigo-500"
          >
            + e-File New Suit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard title="Active Briefs" value={`${activeCases.length} Cases`} icon={<Briefcase className="h-5 w-5 text-indigo-600" />} />
              <StatCard title="Next Hearing Appearances" value={`${userHearings.length} Dates`} icon={<Calendar className="h-5 w-5 text-blue-600" />} bgClass="bg-blue-50 dark:bg-blue-950/30" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm">
              <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-indigo-600" /> Digital Filings & Case Intake
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onOpenUpload('Vakalatnama')}
                  className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-350 dark:hover:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-350 flex items-center gap-3 transition-all cursor-pointer text-left"
                >
                  <FileSignature className="h-5 w-5 text-slate-400" /> Upload Signed Vakalatnama
                </button>
                <button
                  onClick={() => onOpenUpload('Interim Application')}
                  className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-350 dark:hover:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-350 flex items-center gap-3 transition-all cursor-pointer text-left"
                >
                  <Briefcase className="h-5 w-5 text-slate-400" /> File Interim Petition
                </button>
                <button
                  onClick={() => onOpenUpload('Adjournment Request')}
                  className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-350 dark:hover:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-350 flex items-center gap-3 transition-all cursor-pointer text-left"
                >
                  <Clock className="h-5 w-5 text-slate-400" /> Log Adjournment Motion
                </button>
                <button
                  onClick={() => onOpenUpload('Evidence Submission')}
                  className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-350 dark:hover:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-350 flex items-center gap-3 transition-all cursor-pointer text-left"
                >
                  <FileSignature className="h-5 w-5 text-slate-400" /> Submit Documentary Evidence
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" /> Next Cause List Hearings
            </h3>
            <div className="space-y-4">
              {userHearings.map((h) => (
                <div key={h.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">{h.time} • {h.room}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getBadgeColor(h.status)}`}>{h.status}</span>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-white text-xs mt-3 truncate">{h.caseId}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Stage: {h.type}</p>
                </div>
              ))}
              {userHearings.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">No scheduled hearing dates found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 5. CITIZEN SERVICES (LITIGANTS) ---
  if (role === 'Litigant') {
    return (
      <div className="space-y-6">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">National Citizen Services Console</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access transparent case status, process legal fees, and request Legal Aid services under Art 21/NALSA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={onOpenEChallan}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl hover:border-indigo-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 group cursor-pointer"
          >
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-full text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <CreditCard className="h-6 w-6" />
            </div>
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Pay Court Filing Fee</span>
          </button>

          <a
            href="https://scourtapp.nic.in/lsams/nologin/applicationFiling.action?requestLocale=en"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl hover:border-indigo-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 group"
          >
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-full text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6" />
            </div>
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Request Free Legal Aid (NALSA)</span>
          </a>

          <button
            onClick={() => onSwitchTab('docs')}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl hover:border-indigo-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 group cursor-pointer"
          >
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-full text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <FileSignature className="h-6 w-6" />
            </div>
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Download Certified Orders</span>
          </button>
        </div>

        {userCases.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden shadow-sm">
            <div className="bg-slate-950 p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold">{c.title}</h3>
                <p className="text-slate-400 text-xs mt-1">CNR: {c.cnr} • Filing Date: {c.filingDate}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${getBadgeColor(c.status)}`}>
                {c.status}
              </span>
            </div>
            <div className="p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Court Proceeding Timeline</h4>
              <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 space-y-6">
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[7px] top-1" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Petition Registered in High Court Registry</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c.filingDate}</p>
                </div>
                {hearings.filter(h => h.caseId === c.id).map((h) => (
                  <div key={h.id} className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-indigo-400 rounded-full -left-[7px] top-1 animate-pulse" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Scheduled Hearing Date Appearances</p>
                    <p className="text-[10px] text-slate-400 mt-1">Date: {h.date} at {h.time} in {h.room} ({h.type})</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
