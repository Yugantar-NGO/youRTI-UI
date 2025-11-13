import { errorLogger } from '../errorLogging'

/**
 * Request interceptor function type
 */
export type RequestInterceptor = (
  url: string,
  options: RequestInit
) => Promise<{ url: string; options: RequestInit }> | { url: string; options: RequestInit }

/**
 * Response interceptor function type
 */
export type ResponseInterceptor = (response: Response) => Promise<Response> | Response

/**
 * Error interceptor function type
 */
export type ErrorInterceptor = (error: unknown) => Promise<never> | never

/**
 * Interceptor Manager
 *
 * Manages request and response interceptors for HTTP requests.
 * Allows adding middleware-like functionality to fetch operations.
 *
 * @example
 * ```ts
 * const interceptors = new InterceptorManager()
 *
 * // Add auth header to all requests
 * interceptors.request.use((url, options) => {
 *   return {
 *     url,
 *     options: {
 *       ...options,
 *       headers: {
 *         ...options.headers,
 *         Authorization: `Bearer ${getToken()}`
 *       }
 *     }
 *   }
 * })
 *
 * // Log all responses
 * interceptors.response.use((response) => {
 *   console.log('Response:', response.status)
 *   return response
 * })
 * ```
 */
export class InterceptorManager {
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private errorInterceptors: ErrorInterceptor[] = []

  /**
   * Request interceptor API
   */
  request = {
    use: (interceptor: RequestInterceptor): number => {
      return this.requestInterceptors.push(interceptor) - 1
    },
    eject: (id: number): void => {
      this.requestInterceptors.splice(id, 1)
    },
    clear: (): void => {
      this.requestInterceptors = []
    },
  }

  /**
   * Response interceptor API
   */
  response = {
    use: (interceptor: ResponseInterceptor): number => {
      return this.responseInterceptors.push(interceptor) - 1
    },
    eject: (id: number): void => {
      this.responseInterceptors.splice(id, 1)
    },
    clear: (): void => {
      this.responseInterceptors = []
    },
  }

  /**
   * Error interceptor API
   */
  error = {
    use: (interceptor: ErrorInterceptor): number => {
      return this.errorInterceptors.push(interceptor) - 1
    },
    eject: (id: number): void => {
      this.errorInterceptors.splice(id, 1)
    },
    clear: (): void => {
      this.errorInterceptors = []
    },
  }

  /**
   * Execute all request interceptors
   */
  async executeRequestInterceptors(
    url: string,
    options: RequestInit
  ): Promise<{ url: string; options: RequestInit }> {
    let result = { url, options }

    for (const interceptor of this.requestInterceptors) {
      result = await interceptor(result.url, result.options)
    }

    return result
  }

  /**
   * Execute all response interceptors
   */
  async executeResponseInterceptors(response: Response): Promise<Response> {
    let result = response

    for (const interceptor of this.responseInterceptors) {
      result = await interceptor(result)
    }

    return result
  }

  /**
   * Execute all error interceptors
   */
  async executeErrorInterceptors(error: unknown): Promise<never> {
    for (const interceptor of this.errorInterceptors) {
      await interceptor(error)
    }

    throw error
  }

  /**
   * Clear all interceptors
   */
  clearAll(): void {
    this.request.clear()
    this.response.clear()
    this.error.clear()
  }
}

/**
 * Global interceptor manager instance
 */
export const globalInterceptors = new InterceptorManager()

/**
 * Common request interceptors
 */

/**
 * Add authentication token to requests
 */
export function authInterceptor(getToken: () => string | null): RequestInterceptor {
  return (url, options) => {
    const token = getToken()

    if (token) {
      return {
        url,
        options: {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        },
      }
    }

    return { url, options }
  }
}

/**
 * Add request ID for tracking
 */
export function requestIdInterceptor(): RequestInterceptor {
  return (url, options) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      url,
      options: {
        ...options,
        headers: {
          ...options.headers,
          'X-Request-ID': requestId,
        },
      },
    }
  }
}

/**
 * Log all requests
 */
export function loggingInterceptor(): RequestInterceptor {
  return (url, options) => {
    errorLogger.logMessage(
      `HTTP Request: ${options.method || 'GET'} ${url}`,
      'info'
    )
    return { url, options }
  }
}

/**
 * Add custom headers to all requests
 */
export function headerInterceptor(headers: Record<string, string>): RequestInterceptor {
  return (url, options) => {
    return {
      url,
      options: {
        ...options,
        headers: {
          ...options.headers,
          ...headers,
        },
      },
    }
  }
}

/**
 * Common response interceptors
 */

/**
 * Parse JSON responses automatically
 */
export function jsonResponseInterceptor(): ResponseInterceptor {
  return async (response) => {
    if (response.headers.get('content-type')?.includes('application/json')) {
      const clone = response.clone()
      try {
        const data = await clone.json()
        // Attach parsed data to response for easy access
        ;(response as any)._parsedData = data
      } catch (error) {
        // Invalid JSON, ignore
      }
    }
    return response
  }
}

/**
 * Log response status and timing
 */
export function responseLoggingInterceptor(): ResponseInterceptor {
  return (response) => {
    errorLogger.logMessage(
      `HTTP Response: ${response.status} ${response.url}`,
      response.ok ? 'info' : 'warn'
    )
    return response
  }
}

/**
 * Validate response status
 */
export function statusValidationInterceptor(): ResponseInterceptor {
  return (response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return response
  }
}

/**
 * Common error interceptors
 */

/**
 * Log all errors
 */
export function errorLoggingInterceptor(): ErrorInterceptor {
  return (error) => {
    if (error instanceof Error) {
      errorLogger.logError(error, 'API Error')
    } else {
      errorLogger.logMessage(`API Error: ${String(error)}`, 'error')
    }
    throw error
  }
}

/**
 * Enhanced fetch with interceptors
 *
 * Wraps the native fetch API with interceptor support.
 *
 * @example
 * ```ts
 * const response = await fetchWithInterceptors('/api/users', {
 *   method: 'GET'
 * }, interceptorManager)
 * ```
 */
export async function fetchWithInterceptors(
  url: string,
  options: RequestInit = {},
  interceptors: InterceptorManager = globalInterceptors
): Promise<Response> {
  try {
    // Execute request interceptors
    const { url: interceptedUrl, options: interceptedOptions } =
      await interceptors.executeRequestInterceptors(url, options)

    // Make the request
    const response = await fetch(interceptedUrl, interceptedOptions)

    // Execute response interceptors
    const interceptedResponse = await interceptors.executeResponseInterceptors(response)

    return interceptedResponse
  } catch (error) {
    // Execute error interceptors
    await interceptors.executeErrorInterceptors(error)
    throw error // This line won't be reached, but TypeScript needs it
  }
}
