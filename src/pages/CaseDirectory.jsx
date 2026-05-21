import React, { useState } from 'react';
import { Search, Briefcase, Plus, Filter, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CaseDirectory({ currentUser, cases, onOpenNewCase }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter conditions
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.cnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getBadgeColor = (type) => {
    const colors = {
      High: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
      'Time-bound': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
      Routine: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800',
      Pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
      'Reserved for Orders': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30',
      Disposed: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
      Scheduled: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30',
      '0-1 Year': 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
      '1-3 Years': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
      '3+ Years': 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30'
    };
    return colors[type] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-indigo-600" /> Court Case Registry Directory
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search, filter, and register CNR details across judicial benches.
          </p>
        </div>
        {['Admin', 'Clerk', 'Lawyer'].includes(currentUser.role) && (
          <button
            onClick={onOpenNewCase}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer border border-indigo-500"
          >
            <Plus className="h-4 w-4" /> e-File New Suit
          </button>
        )}
      </div>

      {/* Filter panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          
          {/* Search bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by CNR number or party case title..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
            />
          </div>

          {/* Priority dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Filter className="h-3 w-3" /> Priority</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
            >
              <option value="All">All Tracks</option>
              <option value="High">High</option>
              <option value="Time-bound">Time-bound</option>
              <option value="Routine">Routine</option>
            </select>
          </div>

          {/* Status dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Filter className="h-3 w-3" /> Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Reserved for Orders">Reserved for Orders</option>
              <option value="Disposed">Disposed</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-slate-900/50">
                <th className="p-4 pl-6">CNR Number</th>
                <th className="p-4">Case Title</th>
                <th className="p-4">Case Type</th>
                <th className="p-4">Track Priority</th>
                <th className="p-4">Age Category</th>
                <th className="p-4">Adjournments</th>
                <th className="p-4">Filing Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 pl-6 font-bold text-indigo-600 dark:text-indigo-400">{c.cnr}</td>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">{c.title}</td>
                  <td className="p-4 text-xs font-semibold text-slate-500">{c.type}</td>
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
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-350">{c.adjournments}</td>
                  <td className="p-4 text-xs font-semibold text-slate-500">{c.filingDate}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${getBadgeColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-12 text-center text-slate-400 font-medium">
                    No matching cases found in court registry directory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Fake pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center text-xs text-slate-400 font-bold">
          <span>Showing 1-{filteredCases.length} of {filteredCases.length} records</span>
          <div className="flex gap-2">
            <button disabled className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 opacity-55 cursor-not-allowed"><ChevronLeft className="h-4 w-4" /></button>
            <button disabled className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 opacity-55 cursor-not-allowed"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
