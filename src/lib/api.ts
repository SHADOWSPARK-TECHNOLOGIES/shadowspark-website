export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly requestId?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type ApiEnvelope<T> = { data?: T; result?: T; code?: string; message?: string }
type RequestOptions = RequestInit & { retry?: number; idempotencyKey?: string }

const RETRYABLE_METHODS = new Set(['GET', 'HEAD'])
const retryDelay = (attempt: number) => 350 * 2 ** attempt

function makeIdempotencyKey() {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const baseUrl = (process.env.NEXT_PUBLIC_API_URL || '/api/v1').replace(/\/$/, '')
const tenantCookie = 'shadowspark_tenant'

function getTenantSlug() {
  if (typeof document === 'undefined') return process.env.NEXT_PUBLIC_TENANT_SLUG || ''
  const cookie = document.cookie.split('; ').find((entry) => entry.startsWith(`${tenantCookie}=`))
  return cookie?.split('=').slice(1).join('=') || process.env.NEXT_PUBLIC_TENANT_SLUG || ''
}

function getErrorMessage(payload: unknown) {
  if (typeof payload === 'object' && payload !== null) {
    const value = payload as ApiEnvelope<unknown>
    if (typeof value.message === 'string') return value.message
  }
  return 'The request could not be completed.'
}

async function parsePayload<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T
  const contentType = response.headers.get('content-type') || ''
  const body = await response.text()
  if (!body.trim()) return undefined as T
  if (!contentType.includes('application/json')) return body as T
  const payload = JSON.parse(body) as ApiEnvelope<T> | T
  if (payload && typeof payload === 'object' && ('data' in payload || 'result' in payload)) {
    const envelope = payload as ApiEnvelope<T>
    return (envelope.data ?? envelope.result) as T
  }
  return payload as T
}

async function request<T>(path: string, init: RequestOptions = {}, attempt = 0): Promise<T> {
  const requestId = crypto.randomUUID()
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  headers.set('X-Request-ID', requestId)
  const method = (init.method || 'GET').toUpperCase()
  if (init.idempotencyKey && !RETRYABLE_METHODS.has(method)) headers.set('Idempotency-Key', init.idempotencyKey)
  const tenant = getTenantSlug()
  // Routing hint only: backend authorization must derive tenant access from the authenticated session.
  if (tenant) headers.set('X-Tenant-Slug', tenant)
  if (init.body && !(init.body instanceof FormData)) headers.set('Content-Type', 'application/json')

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    credentials: 'include',
    signal: init.signal ?? AbortSignal.timeout(15_000),
  })

  if (response.status === 401 && typeof window !== 'undefined' && !path.startsWith('/auth/')) {
    window.location.assign('/login')
  }

  if (!response.ok) {
    let payload: unknown
    try { payload = await response.json() } catch { payload = undefined }
    const retryable = response.status === 408 || response.status === 429 || response.status >= 500
    const maxRetries = init.retry ?? 2
    if (retryable && RETRYABLE_METHODS.has(method) && attempt < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay(attempt)))
      return request<T>(path, init, attempt + 1)
    }
    throw new ApiError(response.status, (payload as ApiEnvelope<unknown>)?.code || 'REQUEST_FAILED', getErrorMessage(payload), response.headers.get('X-Request-ID') || requestId)
  }

  return parsePayload<T>(response)
}

export const api = {
  get: <T>(path: string, init?: RequestOptions) => request<T>(path, init),
  post: <T>(path: string, body?: unknown, init: RequestOptions = {}) => request<T>(path, { ...init, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: unknown, init: RequestOptions = {}) => request<T>(path, { ...init, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body ?? {}) }),
  delete: <T>(path: string, init?: RequestOptions) => request<T>(path, { ...init, method: 'DELETE' }),
  setTenant: (slug: string) => { if (typeof document !== 'undefined') document.cookie = `${tenantCookie}=${encodeURIComponent(slug)}; Path=/; SameSite=Lax` },
}
