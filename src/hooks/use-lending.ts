'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { loans, kycDocuments, messages } from '@/data/mock'
export const useLoans = (filters?:{search?:string;status?:string}) => useQuery({queryKey:['loans',filters],queryFn:async()=>loans.filter(l=>(!filters?.search||l.applicantName.toLowerCase().includes(filters.search.toLowerCase())||l.id.includes(filters.search))&&(!filters?.status||l.status===filters.status))})
export const useLoan = (id:string) => useQuery({queryKey:['loan',id],queryFn:async()=>loans.find(l=>l.id===id)})
export const usePendingKyc = () => useQuery({queryKey:['kyc','pending'],queryFn:async()=>kycDocuments.filter(d=>d.status==='PENDING')})
export const useMessages = () => useQuery({queryKey:['messages'],queryFn:async()=>messages})
export const useUpdateLoan = () => useMutation({mutationFn:async(input:unknown)=>input})
export const useVerifyKyc = () => useMutation({mutationFn:async(input:unknown)=>input})
export const useSendMessage = () => useMutation({mutationFn:async(input:unknown)=>input})
