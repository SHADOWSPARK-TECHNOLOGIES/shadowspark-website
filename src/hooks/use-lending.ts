'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { KycDocument, LoanApplication, Message } from '@/types/index'

type LoanFilters = { search?: string; status?: string; page?: number; limit?: number }
type Workflow = { id: string; name: string; status: string; version: number }
type Analytics = { volume: Array<{ date: string; amount: number }>; approvals: Record<string, number>; breakdown: Array<Record<string, string | number>> }
type Tenant = { name: string; slug: string; timezone: string; currency: string }
type TeamMember = { id: string; name: string; email: string; role: string; active: boolean }
type ApiKey = { id: string; name: string; preview: string; createdAt: string }

const queryString = (values: Record<string, string | number | undefined>) => {
  const params = new URLSearchParams()
  Object.entries(values).forEach(([key, value]) => { if (value !== undefined && value !== '') params.set(key, String(value)) })
  const value = params.toString()
  return value ? `?${value}` : ''
}

const defaults = { retry: 2, staleTime: 15_000 }

export const useLoans = (filters: LoanFilters = {}) => useQuery({ ...defaults, queryKey: ['loans', filters], queryFn: () => api.get<LoanApplication[]>(`/loans${queryString(filters)}`) })
export const useLoan = (id: string) => useQuery({ ...defaults, queryKey: ['loan', id], queryFn: () => api.get<LoanApplication>(`/loans/${id}`), enabled: Boolean(id) })
export const usePendingKyc = () => useQuery({ ...defaults, queryKey: ['kyc', 'pending'], queryFn: () => api.get<KycDocument[]>('/kyc/pending') })
export const useMessages = () => useQuery({ ...defaults, queryKey: ['messages'], queryFn: () => api.get<Message[]>('/messages/conversations'), refetchInterval: 5_000 })
export const useConversationMessages = (loanApplicationId?: string) => useQuery({ ...defaults, queryKey: ['messages', loanApplicationId], queryFn: () => api.get<Message[]>(`/messages${queryString({ loanApplicationId })}`), enabled: Boolean(loanApplicationId), refetchInterval: 5_000 })
export const useAnalytics = (from?: string, to?: string) => useQuery({ ...defaults, queryKey: ['analytics', from, to], queryFn: () => api.get<Analytics>(`/analytics${queryString({ from, to })}`) })
export const useWorkflows = () => useQuery({ ...defaults, queryKey: ['workflows'], queryFn: () => api.get<Workflow[]>('/workflows') })
export const useWorkflow = (id: string) => useQuery({ ...defaults, queryKey: ['workflow', id], queryFn: () => api.get<Workflow>(`/workflows/${id}`), enabled: Boolean(id) })
export const useTenant = () => useQuery({ ...defaults, queryKey: ['tenant'], queryFn: () => api.get<Tenant>('/tenant') })
export const useTeam = () => useQuery({ ...defaults, queryKey: ['tenant', 'team'], queryFn: () => api.get<TeamMember[]>('/tenant/team') })
export const useApiKeys = () => useQuery({ ...defaults, queryKey: ['tenant', 'api-keys'], queryFn: () => api.get<ApiKey[]>('/tenant/api-keys') })

export const useUpdateLoan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: { id: string; patch: Partial<LoanApplication> }) => api.patch<LoanApplication>(`/loans/${input.id}`, input.patch),
    onSuccess: (_, input) => Promise.all([queryClient.invalidateQueries({ queryKey: ['loans'] }), queryClient.invalidateQueries({ queryKey: ['loan', input.id] })]),
  })
}
export const useCreateLoan = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (body: FormData | Partial<LoanApplication>) => api.post<LoanApplication>('/loans', body), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['loans'] }) }) }
export const useDeleteLoan = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (id: string) => api.delete(`/loans/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['loans'] }) }) }
export const useAssignOfficer = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (input: { id: string; officerId: string }) => api.post(`/loans/${input.id}/assign`, { officerId: input.officerId }), onSuccess: (_, input) => queryClient.invalidateQueries({ queryKey: ['loan', input.id] }) }) }
export const useVerifyKyc = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (input: { id: string; action: 'verify' | 'request-info'; notes?: string }) => api.post(`/kyc/${input.id}/${input.action}`, input), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kyc'] }) }) }
export const useSendMessage = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (input: unknown) => api.post<Message>('/messages/send', input), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }) }) }
export const useCreateWorkflow = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (body: unknown) => api.post<Workflow>('/workflows', body), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workflows'] }) }) }
export const useUpdateWorkflow = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (input: { id: string; body: unknown }) => api.patch<Workflow>(`/workflows/${input.id}`, input.body), onSuccess: (_, input) => Promise.all([queryClient.invalidateQueries({ queryKey: ['workflows'] }), queryClient.invalidateQueries({ queryKey: ['workflow', input.id] })]) }) }
export const useExecuteWorkflow = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (id: string) => api.post(`/workflows/${id}/execute`, {}), onSuccess: (_, id) => queryClient.invalidateQueries({ queryKey: ['workflow', id] }) }) }
export const useUpdateTenant = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (body: Partial<Tenant>) => api.patch<Tenant>('/tenant', body), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tenant'] }) }) }
export const useInviteMember = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (body: unknown) => api.post('/tenant/team/invite', body), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tenant', 'team'] }) }) }
export const useCreateApiKey = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (body: unknown) => api.post<ApiKey>('/tenant/api-keys', body), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tenant', 'api-keys'] }) }) }
export const useRevokeApiKey = () => { const queryClient = useQueryClient(); return useMutation({ mutationFn: (id: string) => api.delete(`/tenant/api-keys/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tenant', 'api-keys'] }) }) }
