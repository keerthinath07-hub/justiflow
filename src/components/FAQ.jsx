import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: 'What is a Case Number Record (CNR) and how is it generated?',
      a: 'The CNR is a unique 16-digit alphanumeric key assigned to every case registered in Indian courts. JustiFlow IN automatically generates this number based on State, District, Court Code, Case Type, and Filing Year upon submission of e-Filing forms.'
    },
    {
      q: 'How does AI Priority Categorization predict case durations?',
      a: 'The AI engine evaluates historical disposal rates, nature of petitions (e.g. Criminal, Civil, Family), caseload of the presiding judge, and complexity factors (like witness count or documentary volume) to classify cases into High, Time-bound, or Routine tracks, predicting a realistic disposal timeline.'
    },
    {
      q: 'Can lawyers and registries upload documents securely?',
      a: 'Yes. All uploads (e.g. Vakalatnamas, petitions, evidence transcripts) are processed via secure cryptographic tunnels. Documents are verified by registry clerks or judges, and stored with unique secure hashes, supporting both PDF and DOCX formats.'
    },
    {
      q: 'How is the Bench caseload optimized?',
      a: 'Under overloaded court scenarios, the platform runs an optimization algorithm. It compares active judge dockets, target averages, and case types, suggesting re-allocations (transfer of low-risk, non-urgent pending files) from overloaded courts to underutilized judges.'
    },
    {
      q: 'Does this platform integrate with the National Judicial Data Grid (NJDG)?',
      a: 'Yes, the analytics screen simulates sync tunnels using local parameters and API endpoints, guaranteeing compliance with judicial data standards, national disposal indexing, and clearance rates (Clearance Index targeting > 100%).'
    }
  ];

  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-base font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            FAQ
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Answers to common questions regarding operations, data compliance, and the AI engine.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all bg-slate-50 dark:bg-slate-950"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-indigo-600 shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-indigo-600 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4 bg-white dark:bg-slate-900/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
