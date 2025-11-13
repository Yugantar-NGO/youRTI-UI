import { errorLogger } from '@/services/errorLogging'

/**
 * Repository Error class for data layer errors
 */
export class RepositoryError extends Error {
  constructor(
    message: string,
    public readonly originalError?: unknown,
    public readonly context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'RepositoryError'
  }
}

/**
 * Options for repository operations
 */
export interface RepositoryOptions {
  /**
   * Whether to use cache
   */
  useCache?: boolean
  /**
   * Cache key
   */
  cacheKey?: string
  /**
   * Cache TTL in milliseconds
   */
  cacheTTL?: number
  /**
   * Whether to retry on failure
   */
  retry?: boolean
  /**
   * Number of retry attempts
   */
  retryAttempts?: number
}

/**
 * Abstract BaseRepository class providing common functionality for data repositories
 *
 * Features:
 * - Error handling and logging
 * - Retry logic with exponential backoff
 * - Type-safe operations
 * - Extensible for custom behavior
 *
 * @example
 * ```ts
 * class UserRepository extends BaseRepository<User> {
 *   async fetchUsers(): Promise<User[]> {
 *     return this.withErrorHandling(
 *       async () => {
 *         const response = await fetch('/api/users')
 *         return response.json()
 *       },
 *       'UserRepository.fetchUsers'
 *     )
 *   }
 * }
 * ```
 */
export abstract class BaseRepository<T> {
  /**
   * Repository name for logging
   */
  protected abstract readonly repositoryName: string

  /**
   * Wrap async operations with error handling
   *
   * @param operation - The async operation to execute
   * @param context - Context information for error logging
   * @param options - Repository operation options
   */
  protected async withErrorHandling<R>(
    operation: () => Promise<R>,
    context: string,
    options: RepositoryOptions = {}
  ): Promise<R> {
    try {
      const result = await this.executeWithRetry(operation, options)
      return result
    } catch (error) {
      const repositoryError = new RepositoryError(
        `Failed to execute ${context}`,
        error,
        {
          repositoryName: this.repositoryName,
          context,
          options,
        }
      )

      // Log the error
      errorLogger.logError(repositoryError, `${this.repositoryName}.${context}`)

      throw repositoryError
    }
  }

  /**
   * Execute operation with retry logic
   */
  private async executeWithRetry<R>(
    operation: () => Promise<R>,
    options: RepositoryOptions
  ): Promise<R> {
    const { retry = false, retryAttempts = 3 } = options

    if (!retry) {
      return operation()
    }

    let lastError: unknown
    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error

        // Don't retry on last attempt
        if (attempt === retryAttempts) {
          break
        }

        // Exponential backoff: 2^attempt * 100ms
        const delay = Math.pow(2, attempt) * 100
        await this.sleep(delay)

        errorLogger.logMessage(
          `Retry attempt ${attempt}/${retryAttempts} after ${delay}ms`,
          'info'
        )
      }
    }

    throw lastError
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Validate data against a schema or predicate
   *
   * @param data - The data to validate
   * @param validator - Validation function
   * @param errorMessage - Error message if validation fails
   */
  protected validate<D>(
    data: D,
    validator: (data: D) => boolean,
    errorMessage: string
  ): void {
    if (!validator(data)) {
      throw new RepositoryError(errorMessage, undefined, {
        data,
        repositoryName: this.repositoryName,
      })
    }
  }

  /**
   * Transform data using a transformation function with error handling
   *
   * @param data - The data to transform
   * @param transformer - Transformation function
   * @param context - Context for error logging
   */
  protected transform<D, R>(
    data: D,
    transformer: (data: D) => R,
    context: string
  ): R {
    try {
      return transformer(data)
    } catch (error) {
      const transformError = new RepositoryError(
        `Failed to transform data in ${context}`,
        error,
        {
          repositoryName: this.repositoryName,
          context,
        }
      )

      errorLogger.logError(transformError, `${this.repositoryName}.transform`)
      throw transformError
    }
  }

  /**
   * Helper to check if error is a network error
   */
  protected isNetworkError(error: unknown): boolean {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true
    }
    if (error instanceof Error && error.message.includes('network')) {
      return true
    }
    return false
  }

  /**
   * Helper to check if error is a timeout error
   */
  protected isTimeoutError(error: unknown): boolean {
    if (error instanceof Error && error.message.includes('timeout')) {
      return true
    }
    return false
  }

  /**
   * Log info message
   */
  protected logInfo(message: string, data?: Record<string, unknown>): void {
    errorLogger.logMessage(
      `[${this.repositoryName}] ${message}`,
      'info'
    )
  }

  /**
   * Log warning message
   */
  protected logWarning(message: string, data?: Record<string, unknown>): void {
    errorLogger.logMessage(
      `[${this.repositoryName}] ${message}`,
      'warn'
    )
  }

  /**
   * Log error message
   */
  protected logError(message: string, error?: Error): void {
    errorLogger.logMessage(
      `[${this.repositoryName}] ${message}${error ? `: ${error.message}` : ''}`,
      'error'
    )
  }
}
