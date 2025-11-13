/**
 * Retry configuration options
 */
export interface RetryOptions {
  /**
   * Maximum number of retry attempts
   */
  maxAttempts?: number
  /**
   * Initial delay in milliseconds
   */
  initialDelay?: number
  /**
   * Maximum delay in milliseconds
   */
  maxDelay?: number
  /**
   * Backoff multiplier (exponential backoff)
   */
  backoffMultiplier?: number
  /**
   * Function to determine if an error should trigger a retry
   */
  shouldRetry?: (error: unknown, attempt: number) => boolean
  /**
   * Callback when a retry attempt is made
   */
  onRetry?: (error: unknown, attempt: number, delay: number) => void
}

/**
 * Default retry options
 */
const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 100,
  maxDelay: 5000,
  backoffMultiplier: 2,
  shouldRetry: (error: unknown) => {
    // Retry on network errors by default
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true
    }
    if (error instanceof Error && error.message.includes('network')) {
      return true
    }
    // Don't retry on client errors (4xx)
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as { status: number }).status
      return status >= 500 || status === 408 || status === 429
    }
    return false
  },
  onRetry: () => {},
}

/**
 * Retry an async operation with exponential backoff
 *
 * Implements exponential backoff retry logic with configurable options.
 * Useful for handling transient failures in API calls or network operations.
 *
 * @param operation - The async operation to retry
 * @param options - Retry configuration options
 * @returns Promise resolving to the operation result
 * @throws The last error encountered if all retry attempts fail
 *
 * @example
 * ```ts
 * const data = await retryWithBackoff(
 *   async () => fetch('/api/data').then(r => r.json()),
 *   {
 *     maxAttempts: 3,
 *     initialDelay: 200,
 *     onRetry: (error, attempt, delay) => {
 *       console.log(`Retry ${attempt} after ${delay}ms`)
 *     }
 *   }
 * )
 * ```
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options }

  let lastError: unknown
  let delay = config.initialDelay

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      // Check if we should retry this error
      if (!config.shouldRetry(error, attempt)) {
        throw error
      }

      // Don't retry on last attempt
      if (attempt === config.maxAttempts) {
        break
      }

      // Calculate delay with exponential backoff
      const currentDelay = Math.min(delay, config.maxDelay)

      // Call retry callback
      config.onRetry(error, attempt, currentDelay)

      // Wait before retrying
      await sleep(currentDelay)

      // Increase delay for next attempt
      delay *= config.backoffMultiplier
    }
  }

  throw lastError
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Retry with jitter to prevent thundering herd problem
 *
 * Adds randomness to the delay to spread out retry attempts
 * from multiple clients.
 *
 * @param operation - The async operation to retry
 * @param options - Retry configuration options
 * @returns Promise resolving to the operation result
 *
 * @example
 * ```ts
 * const data = await retryWithJitter(
 *   async () => fetch('/api/data').then(r => r.json()),
 *   { maxAttempts: 5 }
 * )
 * ```
 */
export async function retryWithJitter<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  return retryWithBackoff(operation, {
    ...options,
    onRetry: (error, attempt, delay) => {
      // Add jitter: delay + random(0, delay/2)
      const jitter = Math.random() * (delay / 2)
      const jitteredDelay = delay + jitter

      // Call original onRetry if provided
      if (options.onRetry) {
        options.onRetry(error, attempt, jitteredDelay)
      }
    },
  })
}

/**
 * Create a retry wrapper function for a given operation
 *
 * Useful for creating reusable retry-enabled functions.
 *
 * @param operation - The async operation to wrap
 * @param options - Retry configuration options
 * @returns A function that retries the operation
 *
 * @example
 * ```ts
 * const fetchWithRetry = withRetry(
 *   (url: string) => fetch(url).then(r => r.json()),
 *   { maxAttempts: 3 }
 * )
 *
 * const userData = await fetchWithRetry('/api/users/1')
 * const postData = await fetchWithRetry('/api/posts/1')
 * ```
 */
export function withRetry<TArgs extends unknown[], TResult>(
  operation: (...args: TArgs) => Promise<TResult>,
  options: RetryOptions = {}
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs) => {
    return retryWithBackoff(() => operation(...args), options)
  }
}
