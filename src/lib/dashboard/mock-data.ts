/* ShadowSpark Dashboard Mock Data */

export interface Loan {
  id: string;
  applicantName: string;
  phoneNumber: string;
  amount: number;
  status: 'pending' | 'approved' | 'disbursed' | 'repaying' | 'completed' | 'defaulted';
  kycStatus: 'pending' | 'verified' | 'rejected';
  approvalDate?: string;
  disbursalDate?: string;
  loanTerm: number; // in months
  interestRate: number;
  repaymentSchedule: 'weekly' | 'monthly' | 'bi-weekly';
  createdAt: string;
  lastActivity: string;
  repaidAmount?: number;
  documentsSubmitted?: number;
}

export interface KYCDocument {
  id: string;
  loanId: string;
  type: 'bvn' | 'nin' | 'passport' | 'bank_statement' | 'business_registration';
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface Message {
  id: string;
  loanId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'system';
}

export interface Repayment {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
}

export interface Analytics {
  totalLoans: number;
  totalVolume: number;
  pendingKYC: number;
  approvalRate: number;
  repaymentRate: number;
  averageKYCTime: number;
}

const NIGERIAN_NAMES = [
  'Chukwuemeka Okafor',
  'Adekunle Oluwaseun',
  'Zainab Mohammed',
  'Ngozi Okoro',
  'Tunde Adeyemi',
  'Amara Nwankwo',
  'Kayode Johnson',
  'Fatima Hassan',
  'Somto Eze',
  'Bolanle Oladimeji',
  'Ibrahim Sani',
  'Chioma Ibekwe',
  'Dapo Adebayo',
  'Maryam Abdulrahman',
  'Obinna Chukwu',
  'Yetunde Adeola',
  'Uche Okerie',
  'Aisha Hussain',
  'Emeka Nkwor',
  'Lola Akinbinni',
  'Hassan Aliyu',
  'Peace Okonkwo',
  'Victor Eze',
  'Afolake Bamigboye',
  'Malik Ahmed',
];

const LOAN_STATUSES: Array<Loan['status']> = [
  'pending',
  'approved',
  'disbursed',
  'repaying',
  'completed',
  'defaulted',
];

const KYC_STATUSES: Array<Loan['kycStatus']> = [
  'pending',
  'verified',
  'rejected',
];

function generatePhoneNumber(): string {
  const prefix = '+234803';
  const remaining = Math.random().toString().slice(2, 11).padStart(8, '0');
  return prefix + remaining;
}

function generateLoanAmount(): number {
  const amounts = [50000, 100000, 250000, 500000, 1000000, 2500000, 5000000];
  return amounts[Math.floor(Math.random() * amounts.length)];
}

export function generateMockLoans(): Loan[] {
  const loans: Loan[] = [];
  const now = new Date();

  for (let i = 0; i < 25; i++) {
    const createdDaysAgo = Math.floor(Math.random() * 90);
    const createdDate = new Date(now.getTime() - createdDaysAgo * 24 * 60 * 60 * 1000);

    const status = LOAN_STATUSES[Math.floor(Math.random() * LOAN_STATUSES.length)];
    const kycStatus = KYC_STATUSES[Math.floor(Math.random() * KYC_STATUSES.length)];

    const loan: Loan = {
      id: `LN-${String(i + 1).padStart(5, '0')}`,
      applicantName: NIGERIAN_NAMES[i % NIGERIAN_NAMES.length],
      phoneNumber: generatePhoneNumber(),
      amount: generateLoanAmount(),
      status,
      kycStatus,
      loanTerm: [3, 6, 12, 24][Math.floor(Math.random() * 4)],
      interestRate: Math.floor(Math.random() * 15) + 8, // 8-23%
      repaymentSchedule: ['weekly', 'bi-weekly', 'monthly'][Math.floor(Math.random() * 3)] as 'weekly' | 'bi-weekly' | 'monthly',
      createdAt: createdDate.toISOString().split('T')[0],
      lastActivity: new Date(now.getTime() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      repaidAmount: status === 'repaying' || status === 'completed' ? Math.floor(Math.random() * 50) * 10000 : undefined,
      documentsSubmitted: Math.floor(Math.random() * 5),
      approvalDate: status !== 'pending' ? new Date(createdDate.getTime() + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
      disbursalDate: status === 'disbursed' || status === 'repaying' || status === 'completed' ? new Date(createdDate.getTime() + Math.floor(Math.random() * 20) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
    };

    loans.push(loan);
  }

  return loans;
}

export function generateMockAnalytics(): Analytics {
  const loans = generateMockLoans();

  const totalLoans = loans.length;
  const totalVolume = loans.reduce((sum, l) => sum + l.amount, 0);
  const pendingKYC = loans.filter(l => l.kycStatus === 'pending').length;
  const approvedLoans = loans.filter(l => l.status !== 'pending' && l.status !== 'defaulted').length;
  const repayingLoans = loans.filter(l => l.status === 'repaying' || l.status === 'completed').length;

  return {
    totalLoans,
    totalVolume,
    pendingKYC,
    approvalRate: Math.round((approvedLoans / totalLoans) * 100),
    repaymentRate: Math.round((repayingLoans / approvedLoans) * 100) || 0,
    averageKYCTime: 3, // days
  };
}

export const MOCK_LOANS = generateMockLoans();
export const MOCK_ANALYTICS = generateMockAnalytics();

// Mock messages
export function generateMockMessages(loanId: string): Message[] {
  const messages: Message[] = [
    {
      id: `MSG-${Date.now()}-1`,
      loanId,
      senderId: 'officer-1',
      senderName: 'Stephen (You)',
      content: 'Hi, we received your documents. We\'re reviewing them now.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isRead: true,
      type: 'text',
    },
    {
      id: `MSG-${Date.now()}-2`,
      loanId,
      senderId: 'applicant',
      senderName: 'Applicant',
      content: 'Thank you! How long will the review take?',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isRead: true,
      type: 'text',
    },
    {
      id: `MSG-${Date.now()}-3`,
      loanId,
      senderId: 'officer-1',
      senderName: 'Stephen (You)',
      content: 'Usually 2-3 business days. You\'ll hear from us soon.',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      isRead: true,
      type: 'text',
    },
  ];

  return messages;
}

// Mock KYC documents
export function generateMockKYCDocuments(loanId: string): KYCDocument[] {
  const docTypes: Array<KYCDocument['type']> = ['bvn', 'nin', 'bank_statement', 'business_registration'];
  
  return docTypes.map((type, idx) => ({
    id: `DOC-${loanId}-${idx}`,
    loanId,
    type,
    status: ['verified', 'pending', 'rejected'][Math.floor(Math.random() * 3)] as 'verified' | 'pending' | 'rejected',
    uploadedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    verifiedAt: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  }));
}

// Mock repayments
export function generateMockRepayments(loanId: string, loanAmount: number): Repayment[] {
  const repayments: Repayment[] = [];
  const monthlyPayment = Math.floor(loanAmount / 12);

  for (let i = 0; i < 6; i++) {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + i);

    repayments.push({
      id: `REP-${loanId}-${i}`,
      loanId,
      amount: monthlyPayment,
      dueDate: dueDate.toISOString().split('T')[0],
      paidDate: i < 2 ? new Date(dueDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
      status: i < 2 ? 'paid' : new Date() > dueDate && i === 2 ? 'overdue' : 'pending',
    });
  }

  return repayments;
}
