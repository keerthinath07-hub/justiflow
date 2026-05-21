export const MOCK_USERS = [
  { id: 'u1', name: 'System Admin (High Court)', role: 'Admin', email: 'admin@hc.gov.in' },
  { id: 'u2', name: 'Hon. Justice R. Sharma', role: 'Judge', email: 'rsharma@courts.gov.in' },
  { id: 'u3', name: 'Hon. Justice K. Iyer', role: 'Judge', email: 'kiyer@courts.gov.in' },
  { id: 'u7', name: 'Hon. Justice V. Desai', role: 'Judge', email: 'vdesai@courts.gov.in' }, 
  { id: 'u4', name: 'Adv. Vikram Singh', role: 'Lawyer', email: 'vikram@lawchambers.in' },
  { id: 'u5', name: 'Smt. Anjali (Registry)', role: 'Clerk', email: 'registry@courts.gov.in' },
  { id: 'u6', name: 'Rahul Johnson', role: 'Litigant', email: 'rahul@email.com' },
];

const currentYear = new Date().getFullYear();
const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

export const INITIAL_CASES = [
  { 
    id: 'MHBO010012342023', 
    title: 'State of MH vs. Sterling Corp', 
    type: 'Criminal (CrPC)', 
    status: 'Pending', 
    filingDate: '2023-10-15', 
    judgeId: 'u2', 
    lawyerId: 'u4', 
    litigantId: 'u6', 
    priority: 'High', 
    predictedDays: 180, 
    riskScore: 85, 
    cnr: 'MHBO010012342023', 
    adjournments: 2, 
    ageCategory: '1-3 Years' 
  },
  { 
    id: 'DLND020045672021', 
    title: 'Doe vs. Smith (Injunction)', 
    type: 'Civil (CPC)', 
    status: 'Reserved for Orders', 
    filingDate: '2021-11-20', 
    judgeId: 'u3', 
    lawyerId: 'u4', 
    litigantId: null, 
    priority: 'Time-bound', 
    predictedDays: 320, 
    riskScore: 45, 
    cnr: 'DLND020045672021', 
    adjournments: 7, 
    ageCategory: '3+ Years' 
  },
  { 
    id: 'KAEN030078902026', 
    title: 'Family Dispute - Johnson', 
    type: 'Family', 
    status: 'Scheduled', 
    filingDate: '2026-01-10', 
    judgeId: 'u2', 
    lawyerId: null, 
    litigantId: 'u6', 
    priority: 'Routine', 
    predictedDays: 90, 
    riskScore: 20, 
    cnr: 'KAEN030078902026', 
    adjournments: 0, 
    ageCategory: '0-1 Year' 
  },
  { 
    id: 'TNCH040099992026', 
    title: 'TechCorp Patent Infringement', 
    type: 'Civil (CPC)', 
    status: 'Pending', 
    filingDate: '2025-08-05', 
    judgeId: 'u3', 
    lawyerId: 'u4', 
    litigantId: null, 
    priority: 'High', 
    predictedDays: 450, 
    riskScore: 92, 
    cnr: 'TNCH040099992026', 
    adjournments: 1, 
    ageCategory: '0-1 Year' 
  },
  { 
    id: 'UPAL050011112026', 
    title: 'Municipal Corp vs. Builders', 
    type: 'Civil (CPC)', 
    status: 'Pending', 
    filingDate: '2026-02-01', 
    judgeId: 'u2', 
    lawyerId: null, 
    litigantId: null, 
    priority: 'Low', 
    predictedDays: 150, 
    riskScore: 30, 
    cnr: 'UPAL050011112026', 
    adjournments: 0, 
    ageCategory: '0-1 Year' 
  },
  { 
    id: 'MHBO010055552026', 
    title: 'Kumar vs. Singh Property Dispute', 
    type: 'Civil (CPC)', 
    status: 'Pending', 
    filingDate: '2026-01-20', 
    judgeId: 'u2', 
    lawyerId: null, 
    litigantId: null, 
    priority: 'Medium', 
    predictedDays: 200, 
    riskScore: 40, 
    cnr: 'MHBO010055552026', 
    adjournments: 1, 
    ageCategory: '0-1 Year' 
  },
  { 
    id: 'KAEN030044442026', 
    title: 'Rao Tax Evasion Petition', 
    type: 'Criminal (CrPC)', 
    status: 'Pending', 
    filingDate: '2026-02-15', 
    judgeId: 'u2', 
    lawyerId: null, 
    litigantId: null, 
    priority: 'Low', 
    predictedDays: 120, 
    riskScore: 25, 
    cnr: 'KAEN030044442026', 
    adjournments: 0, 
    ageCategory: '0-1 Year' 
  },
];

export const INITIAL_HEARINGS = [
  { 
    id: 'h1', 
    caseId: 'DLND020045672021', 
    date: `${currentYear}-${currentMonth}-10`, 
    time: '10:30 AM', 
    status: 'Confirmed', 
    room: 'Court Hall 1', 
    type: 'Final Arguments', 
    stage: 'Arguments' 
  },
  { 
    id: 'h2', 
    caseId: 'KAEN030078902026', 
    date: `${currentYear}-${currentMonth}-15`, 
    time: '02:00 PM', 
    status: 'Scheduled', 
    room: 'Family Court 3', 
    type: 'Mediation', 
    stage: 'Evidence' 
  },
  { 
    id: 'h3', 
    caseId: 'MHBO010012342023', 
    date: `${currentYear}-${currentMonth}-22`, 
    time: '11:00 AM', 
    status: 'Scheduled', 
    room: 'Court Hall 2', 
    type: 'Bail Hearing', 
    stage: 'Hearing' 
  },
];

export const INITIAL_DOCS = [
  { 
    id: 'd1', 
    caseId: 'DLND020045672021', 
    type: 'Vakalatnama', 
    name: 'Vakalatnama_Signed.pdf', 
    uploadedBy: 'u4', 
    date: '2026-02-15', 
    status: 'Verified' 
  },
  { 
    id: 'd2', 
    caseId: 'MHBO010012342023', 
    type: 'FIR Copy', 
    name: 'FIR_Attachment_A.pdf', 
    uploadedBy: 'u4', 
    date: '2026-03-01', 
    status: 'Pending Verification' 
  },
];
