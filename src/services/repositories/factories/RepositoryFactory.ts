import { CacheStrategy, MemoryCacheStrategy } from '../base/CacheStrategy'
import { DataTransformationStrategy, IdentityTransformationStrategy } from '../strategies/DataTransformationStrategy'

/**
 * Repository configuration options
 */
export interface RepositoryConfig<TRaw, TTransformed> {
  /**
   * Cache strategy to use
   */
  cacheStrategy?: CacheStrategy<TTransformed>
  /**
   * Data transformation strategy
   */
  transformationStrategy?: DataTransformationStrategy<TRaw, TTransformed>
  /**
   * Enable retry on failures
   */
  enableRetry?: boolean
  /**
   * Number of retry attempts
   */
  retryAttempts?: number
  /**
   * Base URL for API requests
   */
  baseUrl?: string
  /**
   * Default headers for requests
   */
  defaultHeaders?: Record<string, string>
}

/**
 * Repository Factory
 *
 * Centralized factory for creating repository instances with consistent configuration.
 * Implements the Factory pattern to encapsulate repository creation logic.
 *
 * @example
 * ```ts
 * const factory = RepositoryFactory.getInstance()
 *
 * // Create repository with defaults
 * const userRepo = factory.createRepository('users', {
 *   transformationStrategy: new UserTransformationStrategy()
 * })
 *
 * // Create repository with custom cache
 * const postRepo = factory.createRepository('posts', {
 *   cacheStrategy: new LocalStorageCacheStrategy({ prefix: 'posts:' }),
 *   enableRetry: true
 * })
 * ```
 */
export class RepositoryFactory {
  private static instance: RepositoryFactory
  private repositories = new Map<string, any>()
  private defaultConfig: Partial<RepositoryConfig<any, any>> = {
    cacheStrategy: new MemoryCacheStrategy({ defaultTTL: 5 * 60 * 1000 }),
    transformationStrategy: new IdentityTransformationStrategy(),
    enableRetry: true,
    retryAttempts: 3,
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
  }

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): RepositoryFactory {
    if (!RepositoryFactory.instance) {
      RepositoryFactory.instance = new RepositoryFactory()
    }
    return RepositoryFactory.instance
  }

  /**
   * Set default configuration for all repositories
   *
   * @param config - Default configuration
   */
  setDefaultConfig(config: Partial<RepositoryConfig<any, any>>): void {
    this.defaultConfig = {
      ...this.defaultConfig,
      ...config,
    }
  }

  /**
   * Get default configuration
   */
  getDefaultConfig(): Partial<RepositoryConfig<any, any>> {
    return { ...this.defaultConfig }
  }

  /**
   * Register a repository instance
   *
   * @param key - Unique identifier for the repository
   * @param repository - The repository instance
   */
  register<T>(key: string, repository: T): void {
    this.repositories.set(key, repository)
  }

  /**
   * Get a registered repository
   *
   * @param key - Unique identifier for the repository
   * @returns The repository instance or undefined
   */
  get<T>(key: string): T | undefined {
    return this.repositories.get(key)
  }

  /**
   * Check if a repository is registered
   *
   * @param key - Unique identifier for the repository
   */
  has(key: string): boolean {
    return this.repositories.has(key)
  }

  /**
   * Unregister a repository
   *
   * @param key - Unique identifier for the repository
   */
  unregister(key: string): void {
    this.repositories.delete(key)
  }

  /**
   * Clear all registered repositories
   */
  clear(): void {
    this.repositories.clear()
  }

  /**
   * Get merged configuration (default + custom)
   *
   * @param customConfig - Custom configuration to merge
   * @returns Merged configuration
   */
  getMergedConfig<TRaw, TTransformed>(
    customConfig?: Partial<RepositoryConfig<TRaw, TTransformed>>
  ): RepositoryConfig<TRaw, TTransformed> {
    return {
      ...this.defaultConfig,
      ...customConfig,
    } as RepositoryConfig<TRaw, TTransformed>
  }

  /**
   * Create repository configuration builder
   *
   * Provides a fluent API for configuring repositories.
   *
   * @example
   * ```ts
   * const config = factory.configBuilder()
   *   .withCache(new MemoryCacheStrategy())
   *   .withTransformation(new UserTransformationStrategy())
   *   .withRetry(3)
   *   .build()
   * ```
   */
  configBuilder<TRaw, TTransformed>(): RepositoryConfigBuilder<
    TRaw,
    TTransformed
  > {
    return new RepositoryConfigBuilder<TRaw, TTransformed>(this.defaultConfig)
  }
}

/**
 * Fluent builder for repository configuration
 */
export class RepositoryConfigBuilder<TRaw, TTransformed> {
  private config: Partial<RepositoryConfig<TRaw, TTransformed>>

  constructor(defaultConfig: Partial<RepositoryConfig<any, any>>) {
    this.config = { ...defaultConfig }
  }

  /**
   * Set cache strategy
   */
  withCache(strategy: CacheStrategy<TTransformed>): this {
    this.config.cacheStrategy = strategy
    return this
  }

  /**
   * Set transformation strategy
   */
  withTransformation(
    strategy: DataTransformationStrategy<TRaw, TTransformed>
  ): this {
    this.config.transformationStrategy = strategy
    return this
  }

  /**
   * Enable/disable retry
   */
  withRetry(enabled: boolean, attempts?: number): this {
    this.config.enableRetry = enabled
    if (attempts !== undefined) {
      this.config.retryAttempts = attempts
    }
    return this
  }

  /**
   * Set base URL
   */
  withBaseUrl(url: string): this {
    this.config.baseUrl = url
    return this
  }

  /**
   * Set default headers
   */
  withHeaders(headers: Record<string, string>): this {
    this.config.defaultHeaders = {
      ...this.config.defaultHeaders,
      ...headers,
    }
    return this
  }

  /**
   * Add a single header
   */
  addHeader(key: string, value: string): this {
    this.config.defaultHeaders = {
      ...this.config.defaultHeaders,
      [key]: value,
    }
    return this
  }

  /**
   * Build the configuration
   */
  build(): RepositoryConfig<TRaw, TTransformed> {
    return this.config as RepositoryConfig<TRaw, TTransformed>
  }
}

/**
 * Global repository factory instance
 *
 * Export a singleton instance for convenient access throughout the application.
 */
export const repositoryFactory = RepositoryFactory.getInstance()
