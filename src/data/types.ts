export type Stage = 'walk-in' | 'interviewing' | 'hr-review' | 'selected' | 'rejected';

export type Dept = 'Collections' | 'Customer Support' | 'vKYC' | 'Tele-Sales' | 'Miscellaneous';

export interface Candidate {
  id: string;
  name: string;
  phone: string;
  position: string;
  dept: Dept;
  stage: Stage;
  experience: string;
  expectedSalary: number;
  date: string;
  rating: number | null;
  resumeFile: string;
  resumePages: number;
  referrer: string;
  languages: string[];
}

export interface SignOffState {
  interviewer: 'pending' | 'signed';
  hr: 'pending' | 'approved';
  management: 'pending' | 'approved';
  interviewerAt?: string;
}

export interface Evaluation {
  [candidateId: string]: {
    interviewer: string;
    dateOfInterview: string;
    reference: string;
    languages: string[];
    experience: string;
    review: string;
    reasonLeaving: string;
    previousSalary: string;
    expectedSalary: string;
    approvedSalary: string;
    approvedBy: string;
    joiningDate: string;
    overallFeedback: string;
    rating: number | null;
    remarks: string;
    note: string;
    signOff: SignOffState;
  };
}

export interface NewJoiner {
  id: string;
  name: string;
  dept: Dept;
  role: string;
  joiningDate: string;
  kycDone: number;
  assetsDone: number;
  deptAssigned: boolean;
}

export interface ExitCase {
  id: string;
  name: string;
  dept: Dept;
  role: string;
  lastDay: string;
  itClearance: boolean;
  financeSettlement: boolean;
  managerHandover: boolean;
}

export const DEPARTMENTS: Dept[] = ['Collections', 'Customer Support', 'vKYC', 'Tele-Sales', 'Miscellaneous'];

export const STAGES: { id: Stage; label: string }[] = [
  { id: 'walk-in', label: 'Walk-In' },
  { id: 'interviewing', label: 'Interviewing' },
  { id: 'hr-review', label: 'HR Review' },
  { id: 'selected', label: 'Selected' },
  { id: 'rejected', label: 'Rejected' },
];

export const LANGUAGES = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Marathi', 'Malayalam', 'Bengali'];

export const APPROVERS = ['R. Meenakshi (HR Head)', 'A. Vaibhav (COO)', 'S. Karthik (HR Manager)', 'P. Deepak (Ops Director)'];

export const inr = (n: number) =>
  '₹' + n.toLocaleString('en-IN');

export const ratingTone = (r: number | null): string => {
  if (!r) return 'bg-slate-100 text-slate-500';
  if (r >= 4) return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (r === 3) return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
  return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
};

export const stageTone: Record<Stage, string> = {
  'walk-in': 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  interviewing: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  'hr-review': 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  selected: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  rejected: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
};

const day = (d: number) => `${String(d).padStart(2, '0')}-Nov-26`;

export const NOV_DAYS: string[] = Array.from({ length: 30 }, (_, i) => day(i + 1));
export { day as novDay };
