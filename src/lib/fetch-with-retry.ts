/**
 * Resilient HTTP client with exponential backoff and circuit-breaker logic.
 *
 * Use for every outbound integration that must not fail on transient errors:
 * GitHub API, Meta Graph API, Moonshot AI streams, Resend, Paystack, etc.
 */

type RetryableMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchWithRetryOptions extends Omit<RequestInit, "method"> {
  method?: RetryableMethod;
  retries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  retryOn?: number[]; // HTTP status codes that should trigger a retry
  timeoutMs?: number;
  circuitBreaker?: {
    failureThreshold: number;
    resetTimeoutMs: number;
  };
}

class InMemoryCircuitBreaker {
  private failures = 0;
  private lastFailureAt = 0;
  private readonly threshold: number;
  private readonly resetTimeoutMs: number;

  constructor(threshold: number, resetTimeoutMs: number) {
    this.threshold = threshold;
    this.resetTimeoutMs = resetTimeoutMs;
  }

  isOpen(): boolean {
    if (this.failures < this.threshold) return false;
    if (Date.now() - this.lastFailureAt > this.resetTimeoutMs) {
      this.failures = 0;
      return false;
    }
    return true;
  }

  recordFailure() {
    this.failures += 1;
    this.lastFailureAt = Date.now();
  }

  recordSuccess() {
    this.failures = 0;
  }
}

const circuitBreakers = new Map<string, InMemoryCircuitBreaker>();

function getBreaker(url: string, options?: FetchWithRetryOptions["circuitBreaker"]) {
  if (!options) return null;
  const key = new URL(url).origin;
  if (!circuitBreakers.has(key)) {
    circuitBreakers.set(
      key,
      new InMemoryCircuitBreaker(options.failureThreshold, options.resetTimeoutMs),
    );
  }
  return circuitBreakers.get(key)!;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch with retries, timeouts, and circuit breaker.
 *
 * By default retries on 429, 502, 503, 504, and network errors.
 */
export async function fetchWithRetry(
  url: string,
  options: FetchWithRetryOptions = {},
): Promise<Response> {
  const {
    retries = 3,
    baseDelayMs = 250,
    maxDelayMs = 10_000,
    retryOn = [429, 502, 503, 504],
    timeoutMs = 30_000,
    circuitBreaker,
    ...fetchOptions
  } = options;

  const breaker = getBreaker(url, circuitBreaker);
  if (breaker?.isOpen()) {
    throw new Error(`Circuit breaker open for ${new URL(url).origin}`);
  }

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok && retryOn.includes(response.status) && attempt < retries) {
        lastError = new Error(`HTTP ${response.status} from ${url}`);
        const delay = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
        await sleep(delay);
        continue;
      }

      breaker?.recordSuccess();
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = err;

      const isRetryable =
        err instanceof Error &&
        (err.name === "AbortError" || err.message?.includes("fetch failed"));

      if (!isRetryable || attempt >= retries) break;

      const delay = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
      await sleep(delay);
    }
  }

  breaker?.recordFailure();
  throw lastError;
}
