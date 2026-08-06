export type LoanStatus = 'DRAFT' | 'SUBMITTED' | 'KYC_PENDING' | 'KYC_VERIFIED' | 'CREDIT_CHECK' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'DEFAULTED' | 'CLOSED'
export type KycStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED'
export type RepaymentStatus = 'PENDING' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'WAIVED'
export type MessageChannel = 'WHATSAPP' | 'SMS' | 'EMAIL' | 'TELEGRAM'
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'AGENT' | 'VIEWER'

export interface LoanApplication { id:string; applicantName:string; applicantPhone:string; applicantEmail?:string; loanAmount:number; loanPurpose?:string; status:LoanStatus; interestRate?:number; tenureMonths?:number; monthlyRepayment?:number; totalRepayable?:number; assignedOfficer?:{name:string; avatar?:string}; createdAt:string }
export interface KycDocument { id:string; loanId:string; applicantName:string; type:'NIN'|'DRIVERS_LICENSE'|'PASSPORT'|'UTILITY_BILL'|'BANK_STATEMENT'|'SELFIE'; status:KycStatus; fileUrl:string; ocrData?:Record<string,string>; reviewedAt?:string }
export interface Repayment { id:string; loanId:string; amount:number; dueDate:string; paidDate?:string; status:RepaymentStatus }
export interface Message { id:string; loanId:string; applicantName:string; channel:MessageChannel; direction:'INBOUND'|'OUTBOUND'; body:string; createdAt:string; unread?:boolean }
export interface User { id:string; email:string; firstName:string; lastName:string; role:UserRole }
export interface Tenant { id:string; name:string; slug:string; logoUrl?:string; plan:'STARTER'|'GROWTH'|'ENTERPRISE' }
export interface AuditEvent { id:string; loanId?:string; actor:string; action:string; createdAt:string; detail:string }
