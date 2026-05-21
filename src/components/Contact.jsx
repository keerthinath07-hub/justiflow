import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Side (4 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 rounded-3xl bg-indigo-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-850 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight">Connect with Us</h2>
                <p className="text-sm text-indigo-200 leading-relaxed">
                  Have questions about court onboarding, registry training, or database API setups? Get in touch with our team.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-300 font-bold uppercase">Email Support</p>
                    <p className="text-sm font-semibold">support@justiflow.gov.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-300 font-bold uppercase">Phone Hotline</p>
                    <p className="text-sm font-semibold">+91 (11) 2338-4444</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-300 font-bold uppercase">Headquarters</p>
                    <p className="text-sm font-semibold">Department of Justice, Jaisalmer House, New Delhi</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-indigo-300/80 pt-8 border-t border-white/10 relative z-10 mt-12">
              National e-Governance Plan (NeGP) Compliant Suite.
            </p>
          </div>

          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter name"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@agency.gov.in"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Integration setup"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Explain your query..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white transition-all outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-emerald-600 rounded-xl shadow-lg shadow-indigo-600/10 transition-all cursor-pointer"
              >
                {submitted ? (
                  'Message Received! We will respond shortly.'
                ) : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
