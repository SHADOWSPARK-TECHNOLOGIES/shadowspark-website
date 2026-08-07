'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { LoanApplication, KycDocument, Message } from '@/types/index'
export const useLoans=(filters?:{search?:string;status?:string})=>useQuery({queryKey:['loans',filters],queryFn:()=>api.get<LoanApplication[]>(`/loans?${new URLSearchParams(filters as Record<string,string>)}`),retry:2})
export const useLoan=(id:string)=>useQuery({queryKey:['loan',id],queryFn:()=>api.get<LoanApplication>(`/loans/${id}`),enabled:Boolean(id),retry:2})
export const usePendingKyc=()=>useQuery({queryKey:['kyc','pending'],queryFn:()=>api.get<KycDocument[]>('/kyc/pending'),retry:2})
export const useMessages=()=>useQuery({queryKey:['messages'],queryFn:()=>api.get<Message[]>('/messages/conversations'),refetchInterval:5000,retry:2})
export const useAnalytics=(from?:string,to?:string)=>useQuery({queryKey:['analytics',from,to],queryFn:()=>api.get(`/analytics?from=${from||''}&to=${to||''}`),retry:2})
export const useUpdateLoan=()=>{const queryClient=useQueryClient();return useMutation({mutationFn:(input:{id:string;patch:Partial<LoanApplication>})=>api.patch<LoanApplication>(`/loans/${input.id}`,input.patch),onSuccess:(_,input)=>queryClient.invalidateQueries({queryKey:['loans']}).then(()=>queryClient.invalidateQueries({queryKey:['loan',input.id]}))})}
export const useVerifyKyc=()=>{const queryClient=useQueryClient();return useMutation({mutationFn:(input:{id:string;action:'verify'|'request-info';notes?:string})=>api.post(`/kyc/${input.id}/${input.action}`,input),onSuccess:()=>queryClient.invalidateQueries({queryKey:['kyc']})})}
export const useSendMessage=()=>{const queryClient=useQueryClient();return useMutation({mutationFn:(input:unknown)=>api.post<Message>('/messages/send',input),onSuccess:()=>queryClient.invalidateQueries({queryKey:['messages']})})}
export const useWorkflows=()=>useQuery({queryKey:['workflows'],queryFn:()=>api.get('/workflows'),retry:2})
