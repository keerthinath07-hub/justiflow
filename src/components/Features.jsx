import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Brain, BarChart3, Database, ShieldAlert, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'AI Priority Categorization',
      description: 'Automatically analyzes filing details, nature of evidence, and complexity to assign case priorities (High, Time-bound, Routine) and predict disposal windows.'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: 'Bench Caseload Optimizer',
      description: 'Intelligent workload balancing algorithms suggest case transfers from overloaded judges to available benches, ensuring balanced judicial workload distribution.'
    },
    {
      icon: <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'NJDG Data Sync Integration',
      description: 'Seamless real-time synchronization with the National Judicial Data Grid database ensures accurate national statistics and compliance indexing.'
    },
    {
      icon: <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: 'Summons & e-Filing Workflow',
      description: 'Comprehensive administrative dashboard for registry clerks to process digital filings, verify signed Vakalatnamas, and issue automated court summons.'
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: 'Adjournment Enforcement Monitor',
      description: 'Strict monitoring of adjournment requests under O.17 CPC. Triggers visual alerts for court systems when threshold limits (e.g. max 3) are approached.'
    },
    {
      icon: <Sparkles className="h-6 w-6 text-pink-600 dark:text-pink-400" />,
      title: 'AI Legal Document Summarization',
      description: 'Extracts critical arguments, prayer outlines, statutory provisions, and deadline requirements from voluminous PDFs in under 2 seconds.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Judicial Architecture
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Designed for Modern Courtrooms
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminate operational delays, automate docket planning, and deliver transparent digital services to registry clerks, lawyers, judges, and citizens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
            >
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                <div className="group-hover:scale-110 group-hover:text-white transition-all duration-300">
                  {React.cloneElement(feature.icon, {
                    className: "h-6 w-6 text-slate-700 dark:text-slate-200 group-hover:text-white transition-all"
                  })}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mt-6 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
