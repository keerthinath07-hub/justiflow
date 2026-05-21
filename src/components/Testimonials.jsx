import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Hon. Justice K. Narayanan',
      role: 'Retired High Court Judge',
      comment: 'JustiFlow IN completely transformed my courtroom experience. The AI priority engine accurately identifies time-sensitive cases. Our average disposal latency fell from 500 days to under 200.',
      avatar: 'N'
    },
    {
      name: 'Smt. P. Deshmukh',
      role: 'High Court Chief Registrar',
      comment: 'Summons dispatch and Vakalatnama validation used to consume hours of manual review. e-Filing intake with automatic CNR generation makes registry operations seamless and completely audit-proof.',
      avatar: 'D'
    },
    {
      name: 'Senior Adv. H. Salve',
      role: 'Advocate Chambers Lead',
      comment: 'As a lawyer, transparent tracking is key. Having the master cause list automatically integrated with client filings avoids scheduling conflicts. The public performance index increases transparency.',
      avatar: 'S'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Case Studies
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Trusted Across the Legal Spectrum
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Hear from the judges, registry officers, senior advocates, and legal professionals utilizing JustiFlow IN to speed up legal service delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-sm border border-indigo-200/20">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 dark:text-white text-sm">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {rev.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
