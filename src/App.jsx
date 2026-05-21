import React, { useState, useEffect } from 'react';
import { dbService } from './utilities/dbService';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CaseDirectory from './pages/CaseDirectory';
import HearingCalendar from './pages/HearingCalendar';
import DocumentVault from './pages/DocumentVault';
import TransparencyPortal from './pages/TransparencyPortal';
import NJDGAnalytics from './pages/NJDGAnalytics';
import AdminControls from './pages/AdminControls';
import SupabaseSetupInstructions from './pages/SupabaseSetupInstructions';
import { Scale, LogOut, LayoutDashboard, Briefcase, Calendar, ShieldCheck, Compass, BarChart3, Settings, Database, User, X, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('justiflow_theme') === 'dark';
  });

  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('justiflow_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showLogin, setShowLogin] = useState(false);

  // Tab State
  const [currentTab, setCurrentTab] = useState('dashboard');

  // DB Data States
  const [users, setUsers] = useState([]);
  const [cases, setCases] = useState([]);
  const [hearings, setHearings] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Modal States
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [showHearingModal, setShowHearingModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showChallanModal, setShowChallanModal] = useState(false);
  const [presetUploadType, setPresetUploadType] = useState('');
  const [presetHearingDate, setPresetHearingDate] = useState('');

  // Form states inside modals
  const [newCaseForm, setNewCaseForm] = useState({ title: '', type: 'Civil (CPC)', priority: 'Routine' });
  const [newHearingForm, setNewHearingForm] = useState({ caseId: '', date: '', time: '10:00 AM', room: 'Court Hall 1', type: 'Hearing', stage: 'Hearing' });
  const [uploadForm, setUploadForm] = useState({ caseId: '', type: 'Vakalatnama', fileName: '' });
  const [challanForm, setChallanForm] = useState({ caseId: '', amount: '1500', cardNumber: '', expiry: '', cvv: '' });
  const [challanSuccess, setChallanSuccess] = useState(false);

  // Sync state on load
  useEffect(() => {
    const loadData = async () => {
      try {
        const u = await dbService.getUsers();
        const c = await dbService.getCases();
        const h = await dbService.getHearings();
        const d = await dbService.getDocuments();

        setUsers(u);
        setCases(c);
        setHearings(h);
        setDocuments(d);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    loadData();
  }, [currentUser]);

  // Sync theme class
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('justiflow_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('justiflow_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('justiflow_user', JSON.stringify(user));
    setShowLogin(false);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('justiflow_user');
    setCurrentTab('dashboard');
  };

  // Case updates / mutations
  const handleCreateCase = async (e) => {
    e.preventDefault();
    if (!newCaseForm.title) return;

    const statePrefixes = { 'Civil (CPC)': 'DLND', 'Criminal (CrPC)': 'MHBO', 'Family': 'KAEN' };
    const prefix = statePrefixes[newCaseForm.type] || 'DLND';
    const randNum = Math.floor(10000000 + Math.random() * 90000000);
    const generatedCNR = `${prefix}0200${randNum}2026`;

    const newCase = {
      id: generatedCNR,
      cnr: generatedCNR,
      title: newCaseForm.title,
      type: newCaseForm.type,
      status: 'Pending',
      filingDate: new Date().toISOString().split('T')[0],
      judgeId: 'u2', // Sharma default
      lawyerId: currentUser?.role === 'Lawyer' ? currentUser.id : null,
      litigantId: currentUser?.role === 'Litigant' ? currentUser.id : null,
      priority: newCaseForm.priority,
      predictedDays: newCaseForm.priority === 'High' ? 180 : newCaseForm.priority === 'Time-bound' ? 320 : 90,
      riskScore: newCaseForm.priority === 'High' ? 85 : newCaseForm.priority === 'Time-bound' ? 45 : 20,
      adjournments: 0,
      ageCategory: '0-1 Year'
    };

    try {
      const created = await dbService.createCase(newCase);
      setCases([created, ...cases]);
      setShowNewCaseModal(false);
      setNewCaseForm({ title: '', type: 'Civil (CPC)', priority: 'Routine' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCase = async (caseId, updates) => {
    try {
      const updated = await dbService.updateCase(caseId, updates);
      setCases(cases.map((c) => (c.id === caseId ? { ...c, ...updates } : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateHearing = async (e) => {
    e.preventDefault();
    if (!newHearingForm.caseId || !newHearingForm.date) return;

    const newHearing = {
      id: 'h' + (hearings.length + 1),
      caseId: newHearingForm.caseId,
      date: newHearingForm.date,
      time: newHearingForm.time,
      status: 'Confirmed',
      room: newHearingForm.room,
      type: newHearingForm.type,
      stage: newHearingForm.stage
    };

    try {
      const created = await dbService.createHearing(newHearing);
      setHearings([...hearings, created]);
      setShowHearingModal(false);
      setNewHearingForm({ caseId: '', date: '', time: '10:00 AM', room: 'Court Hall 1', type: 'Hearing', stage: 'Hearing' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateDocument = async (newDoc) => {
    try {
      const created = await dbService.createDocument(newDoc);
      setDocuments([created, ...documents]);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayChallan = (e) => {
    e.preventDefault();
    setChallanSuccess(true);
    setTimeout(() => {
      setChallanSuccess(false);
      setShowChallanModal(false);
      setChallanForm({ caseId: '', amount: '1500', cardNumber: '', expiry: '', cvv: '' });
    }, 2500);
  };

  // Nav side items list
  const getNavItems = () => {
    const items = [
      { id: 'dashboard', label: 'Console Home', icon: <LayoutDashboard className="h-4.5 w-4.5" /> },
      { id: 'cases', label: 'Case Registry', icon: <Briefcase className="h-4.5 w-4.5" /> },
      { id: 'hearings', label: 'Cause List Calendar', icon: <Calendar className="h-4.5 w-4.5" /> },
      { id: 'docs', label: 'Digital Case Vault', icon: <ShieldCheck className="h-4.5 w-4.5" /> },
      { id: 'transparency', label: 'Advocate Index', icon: <Compass className="h-4.5 w-4.5" /> },
      { id: 'analytics', label: 'NJDG Analytics', icon: <BarChart3 className="h-4.5 w-4.5" /> }
    ];

    if (currentUser?.role === 'Admin') {
      items.push({ id: 'admin', label: 'Admin Controls', icon: <Settings className="h-4.5 w-4.5" /> });
    }

    items.push({ id: 'supabase', label: 'Database Settings', icon: <Database className="h-4.5 w-4.5" /> });

    return items;
  };

  const renderActivePage = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <Dashboard
            currentUser={currentUser}
            cases={cases}
            hearings={hearings}
            documents={documents}
            onSwitchTab={setCurrentTab}
            onOpenOptimizer={() => setCurrentTab('admin')}
            onOpenNewCase={() => setShowNewCaseModal(true)}
            onOpenUpload={(type) => {
              setPresetUploadType(type);
              setUploadForm(prev => ({ ...prev, type }));
              setShowUploadModal(true);
            }}
            onOpenEChallan={() => setShowChallanModal(true)}
          />
        );
      case 'cases':
        return (
          <CaseDirectory
            currentUser={currentUser}
            cases={cases}
            onOpenNewCase={() => setShowNewCaseModal(true)}
          />
        );
      case 'hearings':
        return (
          <HearingCalendar
            currentUser={currentUser}
            hearings={hearings}
            cases={cases}
            onScheduleHearing={(date) => {
              setPresetHearingDate(date);
              setNewHearingForm(prev => ({ ...prev, date }));
              setShowHearingModal(true);
            }}
          />
        );
      case 'docs':
        return (
          <DocumentVault
            currentUser={currentUser}
            documents={documents}
            cases={cases}
            onUploadDocument={handleCreateDocument}
          />
        );
      case 'transparency':
        return <TransparencyPortal />;
      case 'analytics':
        return <NJDGAnalytics />;
      case 'admin':
        if (currentUser?.role === 'Admin') {
          return (
            <AdminControls
              users={users}
              cases={cases}
              onUpdateCase={handleUpdateCase}
            />
          );
        }
        return null;
      case 'supabase':
        return <SupabaseSetupInstructions />;
      default:
        return null;
    }
  };

  // --- LANDING PAGE STATE ---
  if (!currentUser && !showLogin) {
    return (
      <LandingPage
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onLoginClick={() => setShowLogin(true)}
        currentUser={null}
        onDashboardClick={null}
        onLogout={null}
      />
    );
  }

  // --- LOGIN PAGE STATE ---
  if (!currentUser && showLogin) {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setShowLogin(false)}
      />
    );
  }

  // --- LOGGED IN WORKSPACE SHELL ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Side Bar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex flex-col justify-between shrink-0">
        
        {/* Logo and Nav links */}
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Scale className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight">
              JustiFlow <span className="text-indigo-600 dark:text-indigo-400">IN</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {getNavItems().map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-slate-200'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-xs border border-indigo-200/20">
                <User className="h-4 w-4" />
              </div>
              <div className="max-w-[120px]">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{currentUser.name.split(' ').pop()}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{currentUser.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-200/40 dark:border-slate-800/40">
            <span>Database:</span>
            {dbService.isOnline() ? (
              <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live</span>
            ) : (
              <span className="text-amber-500">Sandbox</span>
            )}
          </div>
        </div>

      </aside>

      {/* Main Viewport Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 px-6 sm:px-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-400 rounded-lg">
              {currentUser.role} Workspace
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <span className="text-xs font-bold">☀️ Light</span> : <span className="text-xs font-bold">🌙 Dark</span>}
            </button>
            <button
              onClick={() => {
                setCurrentUser(null);
                setShowLogin(false);
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Portal View
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>

      </div>

      {/* --- 1. MODAL: REGISTER NEW CASE --- */}
      {showNewCaseModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setShowNewCaseModal(false)} className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"><X className="h-4 w-4" /></button>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600" /> Digital Suit e-Filing Intake
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Create a case, assign tracking tags, and generate CNR number.</p>

            <form onSubmit={handleCreateCase} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Case Suit Title</label>
                <input
                  required
                  type="text"
                  value={newCaseForm.title}
                  onChange={(e) => setNewCaseForm({ ...newCaseForm, title: e.target.value })}
                  placeholder="e.g. State of KA vs. ABC Ltd"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Case Type</label>
                  <select
                    value={newCaseForm.type}
                    onChange={(e) => setNewCaseForm({ ...newCaseForm, type: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
                  >
                    <option value="Civil (CPC)">Civil (CPC)</option>
                    <option value="Criminal (CrPC)">Criminal (CrPC)</option>
                    <option value="Family">Family</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Docket Track Priority</label>
                  <select
                    value={newCaseForm.priority}
                    onChange={(e) => setNewCaseForm({ ...newCaseForm, priority: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
                  >
                    <option value="Routine">Routine</option>
                    <option value="Time-bound">Time-bound</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
              >
                Issue CNR and Register Docket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- 2. MODAL: SCHEDULE HEARING --- */}
      {showHearingModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setShowHearingModal(false)} className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"><X className="h-4 w-4" /></button>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" /> Schedule Cause List Hearing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Assign date, time slot, and court hall room for trial appearance.</p>

            <form onSubmit={handleCreateHearing} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Target Case CNR</label>
                <select
                  required
                  value={newHearingForm.caseId}
                  onChange={(e) => setNewHearingForm({ ...newHearingForm, caseId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
                >
                  <option value="">Choose Case</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} ({c.cnr})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Hearing Date</label>
                  <input
                    required
                    type="date"
                    value={newHearingForm.date}
                    onChange={(e) => setNewHearingForm({ ...newHearingForm, date: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Time Slot</label>
                  <input
                    required
                    type="text"
                    value={newHearingForm.time}
                    onChange={(e) => setNewHearingForm({ ...newHearingForm, time: e.target.value })}
                    placeholder="e.g. 10:30 AM"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Courtroom Hall</label>
                  <input
                    required
                    type="text"
                    value={newHearingForm.room}
                    onChange={(e) => setNewHearingForm({ ...newHearingForm, room: e.target.value })}
                    placeholder="e.g. Court Hall 2"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Hearing Type/Stage</label>
                  <select
                    value={newHearingForm.stage}
                    onChange={(e) => setNewHearingForm({ ...newHearingForm, stage: e.target.value, type: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
                  >
                    <option value="Hearing">Trial Hearing</option>
                    <option value="Arguments">Final Arguments</option>
                    <option value="Mediation">Mediation Date</option>
                    <option value="Orders">Orders/Verdict</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
              >
                Log Hearing in Master Registry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- 3. MODAL: UPLOAD FILE --- */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setShowUploadModal(false)} className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"><X className="h-4 w-4" /></button>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600" /> Secure Case Document Upload
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Upload signed Vakalatnama, interim petition, or evidence affidavit.</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!uploadForm.caseId || !uploadForm.fileName) return;
              handleCreateDocument({
                id: 'd' + (documents.length + 1),
                caseId: uploadForm.caseId,
                type: uploadForm.type,
                name: uploadForm.fileName,
                uploadedBy: currentUser.id,
                date: new Date().toISOString().split('T')[0],
                status: 'Pending Verification'
              });
              setShowUploadModal(false);
              setUploadForm({ caseId: '', type: 'Vakalatnama', fileName: '' });
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Target Case</label>
                <select
                  required
                  value={uploadForm.caseId}
                  onChange={(e) => setUploadForm({ ...uploadForm, caseId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
                >
                  <option value="">Select Case CNR</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} ({c.cnr})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Document Type</label>
                <select
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
                >
                  <option value="Vakalatnama">Vakalatnama</option>
                  <option value="Interim Application">Interim Application</option>
                  <option value="Adjournment Request">Adjournment Request</option>
                  <option value="Evidence Submission">Evidence Submission</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">File Name</label>
                <input
                  required
                  type="text"
                  value={uploadForm.fileName}
                  onChange={(e) => setUploadForm({ ...uploadForm, fileName: e.target.value })}
                  placeholder="e.g. Vakalatnama_Signed.pdf"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
              >
                Upload File
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- 4. MODAL: E-CHALLAN PAYMENT --- */}
      {showChallanModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setShowChallanModal(false)} className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"><X className="h-4 w-4" /></button>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Database className="h-5 w-5 text-indigo-600" /> Court e-Challan Fee intake
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Pay case filing fees securely. Simulates e-Challan transaction.</p>

            <form onSubmit={handlePayChallan} className="space-y-4">
              {challanSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5" /> e-Challan paid successfully! Receipt sent to registry.
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Case</label>
                <select
                  required
                  value={challanForm.caseId}
                  onChange={(e) => setChallanForm({ ...challanForm, caseId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
                >
                  <option value="">Select Case CNR</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} ({c.cnr})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Filing Fee Amount (INR)</label>
                <input
                  required
                  disabled
                  type="text"
                  value="₹1,500"
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-500 font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Mock Debit/Credit Card Number</label>
                <input
                  required
                  type="text"
                  value={challanForm.cardNumber}
                  onChange={(e) => setChallanForm({ ...challanForm, cardNumber: e.target.value })}
                  placeholder="4111 2222 3333 4444"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Expiry Date</label>
                  <input
                    required
                    type="text"
                    value={challanForm.expiry}
                    onChange={(e) => setChallanForm({ ...challanForm, expiry: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">CVV</label>
                  <input
                    required
                    type="password"
                    value={challanForm.cvv}
                    onChange={(e) => setChallanForm({ ...challanForm, cvv: e.target.value })}
                    placeholder="•••"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={challanSuccess}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
              >
                {challanSuccess ? 'Processing e-Challan...' : 'Pay ₹1,500 Court Fee'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
