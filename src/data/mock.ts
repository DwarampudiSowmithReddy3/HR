import type { Candidate, Dept, Evaluation, ExitCase, NewJoiner } from './types';
import { novDay } from './types';

export const CANDIDATES: Candidate[] = [
  { id: 'c1', name: 'Ananya Sharma', phone: '+91 98450 22114', position: 'Collections Executive', dept: 'Collections', stage: 'hr-review', experience: '2 yrs — NBFC collections', expectedSalary: 32000, date: '18-Nov-26', rating: 4, resumeFile: 'ananya-sharma-cv.pdf', resumePages: 2, referrer: 'Walk-in (LinkedIn Ad)', languages: ['English', 'Hindi', 'Kannada'] },
  { id: 'c2', name: 'Rohit Banerjee', phone: '+91 90192 44731', position: 'vKYC Analyst', dept: 'vKYC', stage: 'selected', experience: '3 yrs — Banking back-office', expectedSalary: 41000, date: '16-Nov-26', rating: 5, resumeFile: 'rohit-banerjee-cv.pdf', resumePages: 3, referrer: 'Employee Referral — S. Iyer', languages: ['English', 'Hindi', 'Bengali'] },
  { id: 'c3', name: 'Divya Narayan', phone: '+91 88840 11209', position: 'Customer Support Associate', dept: 'Customer Support', stage: 'interviewing', experience: '1.5 yrs — E-commerce support', expectedSalary: 28000, date: '19-Nov-26', rating: null, resumeFile: 'divya-narayan-cv.pdf', resumePages: 2, referrer: 'Walk-in (Naukri)', languages: ['English', 'Tamil', 'Telugu'] },
  { id: 'c4', name: 'Imran Qureshi', phone: '+91 97401 77826', position: 'Tele-Sales Executive', dept: 'Tele-Sales', stage: 'walk-in', experience: 'Fresher — B.Com 2026', expectedSalary: 24000, date: '19-Nov-26', rating: null, resumeFile: 'imran-qureshi-cv.pdf', resumePages: 1, referrer: 'Walk-in (Campus Drive)', languages: ['English', 'Hindi', 'Kannada', 'Urdu'] },
  { id: 'c5', name: 'Kavya Reddy', phone: '+91 98861 30042', position: 'Tele-Sales Executive', dept: 'Tele-Sales', stage: 'selected', experience: '4 yrs — Insurance telesales', expectedSalary: 38000, date: '14-Nov-26', rating: 5, resumeFile: 'kavya-reddy-cv.pdf', resumePages: 2, referrer: 'Employee Referral — M. Farhan', languages: ['English', 'Telugu', 'Tamil', 'Hindi'] },
  { id: 'c6', name: 'Suresh Kumar M.', phone: '+91 82963 55017', position: 'Field Collections Officer', dept: 'Collections', stage: 'rejected', experience: '6 yrs — Microfinance field ops', expectedSalary: 45000, date: '12-Nov-26', rating: 2, resumeFile: 'suresh-kumar-cv.pdf', resumePages: 2, referrer: 'Walk-in (Poster)', languages: ['Kannada', 'Tamil'] },
  { id: 'c7', name: 'Meghna Iyer', phone: '+91 99860 64523', position: 'Customer Support Associate', dept: 'Customer Support', stage: 'hr-review', experience: '2.5 yrs — Telecom CRM', expectedSalary: 33000, date: '17-Nov-26', rating: 4, resumeFile: 'meghna-iyer-cv.pdf', resumePages: 3, referrer: 'Walk-in (Indeed)', languages: ['English', 'Kannada', 'Hindi', 'Tamil'] },
  { id: 'c8', name: 'Arjun Nair', phone: '+91 90080 91234', position: 'Front Office Executive', dept: 'Miscellaneous', stage: 'interviewing', experience: '1 yr — Hospitality front desk', expectedSalary: 26000, date: '18-Nov-26', rating: null, resumeFile: 'arjun-nair-cv.pdf', resumePages: 1, referrer: 'Walk-in (Referral)', languages: ['English', 'Malayalam', 'Hindi'] },
  { id: 'c9', name: 'Pooja Deshmukh', phone: '+91 89517 20443', position: 'vKYC Analyst', dept: 'vKYC', stage: 'walk-in', experience: '2 yrs — Fintech onboarding', expectedSalary: 35000, date: '19-Nov-26', rating: null, resumeFile: 'pooja-deshmukh-cv.pdf', resumePages: 2, referrer: 'Walk-in (Naukri)', languages: ['English', 'Hindi', 'Marathi'] },
  { id: 'c10', name: 'Vikram Singh Rathore', phone: '+91 96320 84157', position: 'Collections Team Lead', dept: 'Collections', stage: 'selected', experience: '7 yrs — Credit card collections', expectedSalary: 58000, date: '11-Nov-26', rating: 4, resumeFile: 'vikram-rathore-cv.pdf', resumePages: 4, referrer: 'Headhunter — TalentBridge', languages: ['English', 'Hindi'] },
  { id: 'c11', name: 'Sneha Kulkarni', phone: '+91 87922 51038', position: 'Customer Support Associate', dept: 'Customer Support', stage: 'rejected', experience: '8 months — BPO voice process', expectedSalary: 30000, date: '13-Nov-26', rating: 2, resumeFile: 'sneha-kulkarni-cv.pdf', resumePages: 1, referrer: 'Walk-in (Poster)', languages: ['English', 'Marathi', 'Hindi'] },
  { id: 'c12', name: 'Mohammed Faizan', phone: '+91 96633 78940', position: 'Tele-Sales Executive', dept: 'Tele-Sales', stage: 'walk-in', experience: '3 yrs — D2C inside sales', expectedSalary: 32000, date: '19-Nov-26', rating: null, resumeFile: 'faizan-tele-sales.pdf', resumePages: 2, referrer: 'Walk-in (LinkedIn Ad)', languages: ['English', 'Hindi', 'Telugu'] },
];

export const INITIAL_EVALUATIONS: Evaluation = {
  c2: {
    interviewer: 'S. Karthik (HR Manager)',
    dateOfInterview: '2026-11-16',
    reference: 'Employee referral — S. Iyer, vKYC Team',
    languages: ['English', 'Hindi', 'Bengali'],
    experience: '3 years in banking back-office; handled aadhaar-based video KYC queues at HDFC vendor ops.',
    review: 'Confident communicator. Strong grasp of RBI KYC guidelines, PII redaction and turnaround-time discipline. Needs minor upskilling on our internal VVID tool.',
    reasonLeaving: 'Vendor contract ended; seeking a permanent payroll role.',
    previousSalary: '34,500',
    expectedSalary: '41,000',
    approvedSalary: '38,000',
    approvedBy: 'P. Deepak (Ops Director)',
    joiningDate: '2026-11-30',
    overallFeedback: 'Highly recommended for the vKYC Analyst II band. Verify HDFC relieving letter during document collection.',
    rating: 5,
    remarks: 'Notice period already served. Original PAN and aadhaar available for verification.',
    note: 'Negotiated ₹3,000 below expectation to fit band 2B.',
    signOff: { interviewer: 'signed', hr: 'approved', management: 'pending', interviewerAt: '16-Nov-26 · 4:42 PM' },
  },
  c1: {
    interviewer: 'A. Fernandes (Collections Lead)',
    dateOfInterview: '2026-11-18',
    reference: 'Walk-in — LinkedIn Ad campaign',
    languages: ['English', 'Hindi', 'Kannada'],
    experience: '2 years at Bajaj Finance recovery desk; early & late-stage bucket collections.',
    review: 'Assertive but polite on calls. Quoted recovery scripts accurately in roleplay. Slight hesitation on legal-section queries.',
    reasonLeaving: 'Relocation from Pune to Bengaluru.',
    previousSalary: '27,800',
    expectedSalary: '32,000',
    approvedSalary: '',
    approvedBy: '',
    joiningDate: '2026-12-01',
    overallFeedback: 'Good hire for collections. Recommend management sign-off at ₹30,000 fixed + ₹2,000 incentive.',
    rating: 4,
    remarks: 'Owns two-wheeler; can be assigned field buckets.',
    note: '',
    signOff: { interviewer: 'signed', hr: 'pending', management: 'pending', interviewerAt: '18-Nov-26 · 11:15 AM' },
  },
  c7: {
    interviewer: 'R. Meenakshi (HR Head)',
    dateOfInterview: '2026-11-17',
    reference: 'Walk-in — Indeed listing',
    languages: ['English', 'Kannada', 'Hindi', 'Tamil'],
    experience: '2.5 years telecom customer relations; retention queue specialist.',
    review: 'Excellent empathy and de-escalation. Typing 42 wpm. Very strong for support floor.',
    reasonLeaving: 'Rotational night shifts affecting health.',
    previousSalary: '29,000',
    expectedSalary: '33,000',
    approvedSalary: '31,000',
    approvedBy: 'R. Meenakshi (HR Head)',
    joiningDate: '2026-11-27',
    overallFeedback: 'Strong hire. Request COO approval to release offer letter this week.',
    rating: 4,
    remarks: 'Prefers day shift; roster to be flagged to floor manager.',
    note: 'CSAT 4.6 at previous employer per relieving letter.',
    signOff: { interviewer: 'signed', hr: 'approved', management: 'pending', interviewerAt: '17-Nov-26 · 2:05 PM' },
  },
};

export const NEW_JOINERS: NewJoiner[] = [
  { id: 'j1', name: 'Rohit Banerjee', dept: 'vKYC', role: 'vKYC Analyst II', joiningDate: '30-Nov-26', kycDone: 100, assetsDone: 60, deptAssigned: true },
  { id: 'j2', name: 'Kavya Reddy', dept: 'Tele-Sales', role: 'Senior Tele-Sales Executive', joiningDate: '25-Nov-26', kycDone: 100, assetsDone: 100, deptAssigned: true },
  { id: 'j3', name: 'Vikram Singh Rathore', dept: 'Collections', role: 'Collections Team Lead', joiningDate: '24-Nov-26', kycDone: 75, assetsDone: 30, deptAssigned: false },
  { id: 'j4', name: 'Aditi Ghosh', dept: 'Customer Support', role: 'Support Associate', joiningDate: '26-Nov-26', kycDone: 40, assetsDone: 0, deptAssigned: false },
  { id: 'j5', name: 'Naveen Kumar S.', dept: 'Collections', role: 'Collections Executive', joiningDate: '27-Nov-26', kycDone: 15, assetsDone: 0, deptAssigned: false },
];

export const EXIT_CASES: ExitCase[] = [
  { id: 'e1', name: 'Rahul Verma', dept: 'Tele-Sales', role: 'Tele-Sales Executive', lastDay: '28-Nov-26', itClearance: true, financeSettlement: true, managerHandover: false },
  { id: 'e2', name: 'Shruti Patel', dept: 'Customer Support', role: 'Support Associate', lastDay: '30-Nov-26', itClearance: true, financeSettlement: false, managerHandover: false },
  { id: 'e3', name: 'Ganesh Babu', dept: 'Collections', role: 'Field Collections Officer', lastDay: '21-Nov-26', itClearance: false, financeSettlement: false, managerHandover: true },
  { id: 'e4', name: 'Farhana Aziz', dept: 'vKYC', role: 'vKYC Analyst', lastDay: '27-Nov-26', itClearance: true, financeSettlement: true, managerHandover: true },
];

const DAILY = [
  // day, walkins, interviews, selected, rejected, joined
  [1, 4, 3, 1, 2, 0], [2, 5, 4, 2, 2, 1], [3, 3, 2, 0, 2, 0], [4, 0, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0],
  [6, 6, 5, 2, 3, 1], [7, 7, 6, 3, 3, 2], [8, 4, 3, 1, 2, 1], [9, 5, 4, 1, 3, 0], [10, 3, 3, 1, 2, 1],
  [11, 6, 5, 2, 3, 1], [12, 8, 6, 3, 3, 2], [13, 5, 4, 1, 3, 1], [14, 4, 4, 2, 2, 1], [15, 7, 6, 3, 3, 2],
  [16, 5, 4, 2, 2, 1], [17, 6, 5, 2, 3, 2], [18, 9, 7, 3, 4, 1], [19, 7, 5, 2, 3, 1], [20, 4, 3, 1, 2, 0],
  [21, 0, 0, 0, 0, 0], [22, 0, 0, 0, 0, 0], [23, 0, 0, 0, 0, 0], [24, 0, 0, 0, 0, 0], [25, 0, 0, 0, 0, 0],
  [26, 0, 0, 0, 0, 0], [27, 0, 0, 0, 0, 0], [28, 0, 0, 0, 0, 0], [29, 0, 0, 0, 0, 0], [30, 0, 0, 0, 0, 0],
];

const ONSITE = [
  // day, collections, cs, vkyc, telesales, misc, left
  [1, 1, 1, 0, 1, 0, 1], [2, 0, 1, 1, 0, 0, 0], [3, 1, 0, 0, 0, 0, 1], [4, 0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0, 0],
  [6, 1, 1, 0, 1, 0, 0], [7, 1, 2, 1, 0, 0, 1], [8, 0, 1, 0, 1, 1, 0], [9, 1, 0, 0, 0, 0, 0], [10, 0, 1, 1, 0, 0, 0],
  [11, 1, 0, 0, 1, 0, 0], [12, 2, 1, 0, 0, 0, 0], [13, 0, 1, 1, 0, 0, 1], [14, 1, 0, 0, 1, 0, 0], [15, 1, 2, 0, 0, 0, 1],
  [16, 0, 1, 1, 0, 0, 0], [17, 1, 0, 0, 2, 0, 0], [18, 2, 1, 0, 0, 1, 0], [19, 1, 1, 1, 0, 0, 0], [20, 0, 0, 0, 1, 0, 0],
  [21, 0, 0, 0, 0, 0, 1], [22, 0, 0, 0, 0, 0, 0], [23, 0, 0, 0, 0, 0, 0], [24, 0, 0, 0, 0, 0, 0], [25, 0, 0, 0, 0, 0, 0],
  [26, 0, 0, 0, 0, 0, 0], [27, 0, 0, 0, 0, 0, 0], [28, 0, 0, 0, 0, 0, 0], [29, 0, 0, 0, 0, 0, 0], [30, 0, 0, 0, 0, 0, 0],
];

export const RECRUIT_REPORT = DAILY.map(([d, w, i, s, r, j]) => ({
  date: novDay(d),
  walkins: w,
  interviews: i,
  selected: s,
  rejected: r,
  joined: j,
}));

export const DEPT_REPORT = ONSITE.map(([d, c, cs, v, t, m, l]) => ({
  date: novDay(d),
  collections: c,
  cs,
  vkyc: v,
  telesales: t,
  misc: m,
  left: l,
}));

export const SPARKS = {
  walkins: [3, 5, 4, 6, 5, 8, 7, 9, 6, 7, 9, 7],
  interviews: [2, 4, 3, 5, 4, 6, 5, 7, 5, 6, 7, 5],
  signoffs: [5, 4, 6, 3, 5, 4, 3, 2, 4, 3, 3, 4],
  onboarding: [1, 2, 2, 3, 2, 4, 3, 4, 5, 4, 5, 5],
};
