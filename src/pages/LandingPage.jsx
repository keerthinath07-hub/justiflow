import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { ArrowUp } from 'lucide-react';

export default function LandingPage({
  isDarkMode,
  toggleDarkMode,
  onLoginClick,
  currentUser,
  onDashboardClick,
  onLogout
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onLoginClick={onLoginClick}
        currentUser={currentUser}
        onDashboardClick={onDashboardClick}
        onLogout={onLogout}
      />
      <main className="flex-1">
        <Hero
          onLoginClick={onLoginClick}
          currentUser={currentUser}
          onDashboardClick={onDashboardClick}
        />
        <Features />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all z-40 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
