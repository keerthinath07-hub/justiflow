import React, { useState } from 'react';
import { Scale, Moon, Sun, Menu, X, ArrowRight, User, LogOut, Layout } from 'lucide-react';

export default function Navbar({
  isDarkMode,
  toggleDarkMode,
  onLoginClick,
  currentUser,
  onDashboardClick,
  onLogout
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-600/20">
              <Scale className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              JustiFlow <span className="text-indigo-600 dark:text-indigo-400">IN</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Impact
            </a>
            <a href="#faq" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              FAQ
            </a>
            <a href="#contact" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop CTA & Controls */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onDashboardClick}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 hover:-translate-y-0.5 transition-all"
                >
                  <Layout className="h-4 w-4" /> Console
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Launch Console <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Features
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Impact
          </a>
          <a
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Contact
          </a>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onDashboardClick();
                  }}
                  className="w-full justify-center inline-flex items-center gap-2 px-4 py-2.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  <Layout className="h-4 w-4" /> Go to Console
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="w-full justify-center inline-flex items-center gap-2 px-4 py-2.5 text-base font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLoginClick();
                }}
                className="w-full justify-center inline-flex items-center gap-2 px-4 py-2.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                Launch Console <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
