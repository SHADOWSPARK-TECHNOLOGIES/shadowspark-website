import type { KycStatus, LoanStatus, RepaymentStatus } from '@/types/index'
export const statusTone = (status: string) => { if(['APPROVED','DISBURSED','CLOSED','VERIFIED','PAID'].includes(status)) return 'success'; if(['REJECTED','DEFAULTED','OVERDUE'].includes(status)) return 'danger'; if(['KYC_PENDING','PENDING','SUBMITTED','PARTIAL','CREDIT_CHECK'].includes(status)) return 'warning'; return 'neutral' }
export const statusLabel = (status:string) => status.replaceAll('_',' ').toLowerCase().replace(/(^|\s)\S/g,(m)=>m.toUpperCase())
