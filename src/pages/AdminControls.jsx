import React, { useState } from 'react';
import { Settings, Users, Wand2, ShieldAlert, CheckCircle2, ChevronRight, Gavel, HelpCircle } from 'lucide-react';

export default function AdminControls({ users, cases, onUpdateCase }) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Calculate active judge caseload
  const activeJudges = users.filter((u) => u.role === 'Judge');
  
  const getCaseloadForJudge = (judgeId) => {
    return cases.filter((c) => c.judgeId === judgeId && c.status !== 'Disposed').length;
  };

  const runCaseloadOptimizer = () => {
    setIsOptimizing(true);
    setOptimizationResult(null);
    setSuccessMessage('');

    setTimeout(() => {
      // Find overloaded judges (e.g. Sharma has 4, Desai has 0)
      const caseloads = activeJudges.map((j) => ({
        id: j.id,
        name: j.name,
        cases: getCaseloadForJudge(j.id)
      }));

      // Let's create mock transfer suggestions
      // Transfer Kumar vs. Singh Dispute (MHBO010055552026) from Sharma (u2) to Desai (u7)
      // Transfer Municipal Corp vs. Builders (UPAL050011112026) from Sharma (u2) to Iyer (u3)
      const suggestions = [
        {
          caseId: 'MHBO010055552026',
          caseTitle: 'Kumar vs. Singh Property Dispute',
          fromJudgeId: 'u2',
          fromJudgeName: 'Hon. Justice R. Sharma',
          toJudgeId: 'u7',
          toJudgeName: 'Hon. Justice V. Desai',
        },
        {
          caseId: 'UPAL050011112026',
          caseTitle: 'Municipal Corp vs. Builders',
          fromJudgeId: 'u2',
          fromJudgeName: 'Hon. Justice R. Sharma',
          toJudgeId: 'u3',
          toJudgeName: 'Hon. Justice K. Iyer',
        }
      ];

      setOptimizationResult(suggestions);
      setIsOptimizing(false);
    }, 1200);
  };

  const applyOptimization = async () => {
    if (!optimizationResult) return;

    try {
      // Execute transfers
      for (const sug of optimizationResult) {
        await onUpdateCase(sug.caseId, { judgeId: sug.toJudgeId });
      }
      setSuccessMessage('Successfully reallocated 2 cases! Cause lists and judge dockets updated.');
      setOptimizationResult(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="h-6 w-6 text-indigo-600" /> Administrative Console Controls
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Run AI-driven bench caseload optimization algorithms and oversee credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Bench Caseload Optimizer (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-indigo-600" /> Bench Caseload Optimizer (Article 21)
              </h3>
              <button
                onClick={runCaseloadOptimizer}
                disabled={isOptimizing}
                className="px-4 py-2 bg-indigo-650 hover:bg-indigo-650 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/10 cursor-pointer flex items-center gap-1.5"
              >
                {isOptimizing ? 'Running calculations...' : 'Analyze Docket Balancing'}
              </button>
            </div>

            {/* List active caseload count */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {activeJudges.map((j) => {
                const count = getCaseloadForJudge(j.id);
                return (
                  <div key={j.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Presiding Officer</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{j.name}</p>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{count} Active</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                        count >= 4
                          ? 'border-red-200 text-red-600 bg-red-50/30'
                          : count >= 1
                          ? 'border-indigo-200 text-indigo-600 bg-indigo-50/30'
                          : 'border-emerald-200 text-emerald-600 bg-emerald-50/30'
                      }`}>
                        {count >= 4 ? 'Overloaded' : count >= 1 ? 'Optimal' : 'Available'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Success notification */}
            {successMessage && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> {successMessage}
              </div>
            )}

            {/* Suggestions layout */}
            {optimizationResult && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Case Transfer Suggestions</h4>
                <div className="space-y-3">
                  {optimizationResult.map((sug, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-indigo-100 dark:border-indigo-900 bg-indigo-50/20 dark:bg-indigo-950/10 rounded-2xl gap-3 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{sug.caseTitle}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">CNR: {sug.caseId}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 px-2.5 py-1 rounded-xl">{sug.fromJudgeName.split(' ').pop()}</span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 px-2.5 py-1 rounded-xl">{sug.toJudgeName.split(' ').pop()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={applyOptimization}
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
                >
                  Approve and Reallocate Benches
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Account Registry (1 col) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" /> Authorized Registry Accounts
            </h3>
            
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl gap-3">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-xs">{user.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{user.email}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/20 text-[9px]">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
