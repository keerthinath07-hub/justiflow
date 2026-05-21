import React, { useState } from 'react';
import { dbService } from '../utilities/dbService';
import { Database, ShieldAlert, CheckCircle2, Copy, Sparkles, Wand2 } from 'lucide-react';

export default function SupabaseSetupInstructions() {
  const [copied, setCopied] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);
  const isOnline = dbService.isOnline();

  const sqlSchema = `-- JUSTIFLOW IN: DATABASE SEEDING SCHEMA
-- Copy and paste this directly in your Supabase SQL Editor

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- 2. Create Cases Table
CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  "filingDate" DATE NOT NULL,
  "judgeId" TEXT REFERENCES users(id),
  "lawyerId" TEXT REFERENCES users(id),
  "litigantId" TEXT REFERENCES users(id),
  priority TEXT NOT NULL,
  "predictedDays" INTEGER NOT NULL,
  "riskScore" INTEGER NOT NULL,
  cnr TEXT NOT NULL,
  adjournments INTEGER NOT NULL,
  "ageCategory" TEXT NOT NULL
);

-- 3. Create Hearings Table
CREATE TABLE IF NOT EXISTS hearings (
  id TEXT PRIMARY KEY,
  "caseId" TEXT REFERENCES cases(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL,
  room TEXT NOT NULL,
  type TEXT NOT NULL,
  stage TEXT NOT NULL
);

-- 4. Create Documents Table
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  "caseId" TEXT REFERENCES cases(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  "uploadedBy" TEXT REFERENCES users(id),
  date DATE NOT NULL,
  status TEXT NOT NULL
);
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await dbService.seedSupabase();
      setSeedResult(res);
    } catch (err) {
      setSeedResult({ success: false, message: err.message });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="h-6 w-6 text-indigo-600" /> Database Integrations Hub
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Connect and configure Supabase database schemas to store dockets and cases.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Connection status and seed (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-extrabold text-slate-900 dark:text-white">Connection Details</h3>

            <div className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
              isOnline
                ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/30'
                : 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30'
            }`}>
              {isOnline ? (
                <>
                  <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-sm">Supabase Database Connected</h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1 leading-relaxed">
                      Your application is authenticated and communicating directly with your live Supabase database tables!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-800 dark:text-amber-400 text-sm">Local Sandbox Mock Mode</h4>
                    <p className="text-xs text-amber-600 dark:text-amber-300 mt-1 leading-relaxed">
                      No environmental credentials found. The application is running in a persistent local sandbox mode using localStorage.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">How to connect:</h4>
              <ol className="list-decimal pl-4 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <li>Create a free project on <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold underline">Supabase</a>.</li>
                <li>Create the database tables using the SQL editor schema (on the right).</li>
                <li>Create a file named <code className="bg-slate-50 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono border border-slate-200 dark:border-slate-800">.env</code> in the project root directory.</li>
                <li>Add the following environment variables:</li>
              </ol>

              <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl text-[10px] font-mono text-slate-600 dark:text-slate-350 leading-relaxed overflow-x-auto">
                {`VITE_SUPABASE_URL=https://your-project-id.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-api-key`}
              </pre>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 mt-8 space-y-4">
            <button
              onClick={handleSeed}
              disabled={!isOnline || seeding}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-850 dark:disabled:text-slate-600 text-white font-bold py-3.5 rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
            >
              <Sparkles className="h-4 w-4" /> {seeding ? 'Seeding Tables...' : 'Seed Live Supabase Database'}
            </button>

            {seedResult && (
              <div className={`p-4 rounded-xl border text-xs font-semibold ${
                seedResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400'
                  : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400'
              }`}>
                {seedResult.message}
              </div>
            )}
          </div>
        </div>

        {/* SQL Script View (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 text-white rounded-3xl border border-slate-900 shadow-xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-900">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <Database className="h-4 w-4" /> SQL Editor Seeding Schema
              </span>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-800 cursor-pointer flex items-center gap-1"
              >
                <Copy className="h-3.5 w-3.5" /> {copied ? 'Copied!' : 'Copy SQL'}
              </button>
            </div>
            
            <pre className="font-mono text-[10px] text-slate-300 leading-relaxed overflow-y-auto max-h-[380px] bg-slate-950/40 p-2 rounded-xl">
              {sqlSchema}
            </pre>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed pt-6 border-t border-slate-900 mt-6">
            Note: Copy the script above and run it in the SQL Editor section of the Supabase dashboard. It sets up tables for Users, Cases, Hearings, and Documents, with correct relationships and foreign key integrity.
          </p>
        </div>

      </div>
    </div>
  );
}
