import React from 'react';
import { Scale, Github, Twitter, Database, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Scale className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                JustiFlow <span className="text-indigo-400">IN</span>
              </span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              Advancing the digitalization and throughput of Indian courtrooms through modern architecture, AI prioritization, and e-Governance integrations.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Impact Analysis</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ Support</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Developer Contact</a></li>
            </ul>
          </div>

          {/* Compliance */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Compliance</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>e-Governance NeGP Standards</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Database className="h-4 w-4 text-indigo-400" />
                <span>NJDG API Compliant</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} JustiFlow IN • Department of Justice, India. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Data Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
