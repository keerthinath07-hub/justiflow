import React, { useState } from 'react';
import { Upload, FileText, Wand2, ShieldCheck, Clock, Search, CheckCircle2 } from 'lucide-react';

export default function DocumentVault({ currentUser, documents, cases, onUploadDocument }) {
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [docType, setDocType] = useState('Vakalatnama');
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [summarizingId, setSummarizingId] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!selectedCaseId || !fileName) return;

    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newDoc = {
              id: 'd' + (documents.length + 1),
              caseId: selectedCaseId,
              type: docType,
              name: fileName,
              uploadedBy: currentUser.id,
              date: new Date().toISOString().split('T')[0],
              status: 'Pending Verification'
            };
            onUploadDocument(newDoc);
            setIsUploading(false);
            setFileName('');
            setSelectedCaseId('');
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const generateAISummary = (docId) => {
    setSummarizingId(docId);
    setSummaryText('');
    setTimeout(() => {
      const doc = documents.find(d => d.id === docId);
      const docName = doc ? doc.name : 'document';
      const cType = doc ? doc.type : 'Legal Petition';

      setSummaryText(
        `AI EXTRACTION REPORT: ${docName.toUpperCase()}\n\n` +
        `1. CASE RECORD: CNR matching ${doc?.caseId || 'Unknown Registry'}\n` +
        `2. CLASSIFICATION: ${cType} (e-Filing Intake standard)\n` +
        `3. KEY ARGUMENTS: Petitioner outlines violation of fundamental agreements under statutory sections, requesting immediate injunctive orders.\n` +
        `4. STATUTORY SECTIONS CITED: Section 9 Arbitration Act / Order 39 Rules 1-2 CPC.\n` +
        `5. PRIORITY INDEX: AI suggests High Priority Track based on immediate asset risk.`
      );
      setSummarizingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-600" /> Digital Case Vault & AI Intake
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload certified orders, pleadings, signed Vakalatnamas, and run AI summaries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Upload Panel (1 col) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white mb-6">Secure File Intake</h3>
            
            <form onSubmit={handleUploadSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Target Case</label>
                <select
                  required
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
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
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-350 outline-none"
                >
                  <option value="Vakalatnama">Vakalatnama</option>
                  <option value="FIR Copy">FIR Copy</option>
                  <option value="Writ Petition">Writ Petition</option>
                  <option value="Affidavit">Affidavit</option>
                  <option value="Interim Order">Interim Order</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select PDF File</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-all relative">
                  <input
                    required
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                  <span className="block text-xs font-bold text-slate-500 dark:text-slate-400">
                    {fileName ? fileName : 'Upload signed case PDF'}
                  </span>
                  <span className="block text-[9px] text-slate-400 mt-1">PDF format under 10MB</span>
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                    <span>Uploading cryptographic tunnel...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/55 text-white font-bold py-3 rounded-xl text-xs flex justify-center items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
              >
                Upload to Court Vault
              </button>
            </form>
          </div>
        </div>

        {/* Listings & AI Summaries (2 cols) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex-1">
            <h3 className="font-extrabold text-slate-900 dark:text-white mb-6">Vault Files Listings</h3>
            
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {documents.map((doc) => {
                const matchedCase = cases.find((c) => c.id === doc.caseId);
                return (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">{doc.name}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/20">{doc.type}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          Case: {matchedCase ? matchedCase.title : doc.caseId} • Filed: {doc.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => generateAISummary(doc.id)}
                        disabled={summarizingId !== null}
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Wand2 className="h-3.5 w-3.5 text-indigo-600" /> AI Summary
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI summaries viewport */}
          {summaryText && (
            <div className="bg-slate-950 text-slate-250 border border-slate-800 p-6 rounded-3xl font-mono text-xs space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> AI INTELI-SUMMARY EXTRACT
                </span>
                <button
                  onClick={() => setSummaryText('')}
                  className="text-slate-500 hover:text-white font-bold"
                >
                  Clear
                </button>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{summaryText}</pre>
            </div>
          )}

          {summarizingId && (
            <div className="bg-slate-950 text-slate-400 border border-slate-800 p-6 rounded-3xl font-mono text-xs text-center py-12">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent mr-2 align-middle" />
              Running NLP summarization on PDF tables...
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
