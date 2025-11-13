/**
 * Cache Strategy Pattern
 *
 * Provides abstraction for different caching mechanisms.
 * Allows easy switching between in-memory cache, localStorage, or SWR.
 */

/**
 * Cache entry with metadata
 */
export interface CacheEntry<T> {
  /**
   * The cached data
   */
  data: T
  /**
   * Timestamp when the entry was created
   */
  timestamp: number
  /**
   * Time-to-live in milliseconds
   */
  ttl: number
}

/**
 * Cache strategy interface
 *
 * @template T - The type of data to cache
 */
export interface CacheStrategy<T = any> {
  /**
   * Get data from cache
   *
   * @param key - The cache key
   * @returns The cached data or null if not found/expired
   */
  get(key: string): Promise<T | null>

  /**
   * Set data in cache
   *
   * @param key - The cache key
   * @param data - The data to cache
   * @param ttl - Time-to-live in milliseconds
   */
  set(key: string, data: T, ttl?: number): Promise<void>

  /**
   * Check if key exists in cache and is not expired
   *
   * @param key - The cache key
   */
  has(key: string): Promise<boolean>

  /**
   * Delete data from cache
   *
   * @param key - The cache key
   */
  delete(key: string): Promise<void>

  /**
   * Clear all cache entries
   */
  clear(): Promise<void>

  /**
   * Get cache statistics
   */
  getStats?(): Promise<{
    size: number
    hits: number
    misses: number
  }>
}

/**
 * In-memory cache strategy
 *
 * Fast, but data is lost on page refresh.
 * Best for temporary data that doesn't need persistence.
 *
 * @example
 * ```ts
 * const cache = new MemoryCacheStrategy({ defaultTTL: 5 * 60 * 1000 })
 * await cache.set('user:1', userData)
 * const user = await cache.get('user:1')
 * ```
 */
export class MemoryCacheStrategy<T = any> implements CacheStrategy<T> {
  private cache = new Map<string, CacheEntry<T>>()
  private stats = {
    hits: 0,
    misses: 0,
  }

  constructor(
    private options: {
      defaultTTL?: number
      maxSize?: number
    } = {}
  ) {}

  async get(key: string): Promise<T | null> {
    const entry = this.cache.get(key)

    if (!entry) {
      this.stats.misses++
      return null
    }

    // Check if expired
    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      this.stats.misses++
      return null
    }

    this.stats.hits++
    return entry.data
  }

  async set(key: string, data: T, ttl?: number): Promise<void> {
    // Enforce max size if specified
    if (this.options.maxSize && this.cache.size >= this.options.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value
      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl ?? this.options.defaultTTL ?? 5 * 60 * 1000, // 5 minutes default
    })
  }

  async has(key: string): Promise<boolean> {
    const data = await this.get(key)
    return data !== null
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key)
  }

  async clear(): Promise<void> {
    this.cache.clear()
    this.stats.hits = 0
    this.stats.misses = 0
  }

  async getStats() {
    return {
      size: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
    }
  }
}

/**
 * LocalStorage cache strategy
 *
 * Persists data across page refreshes.
 * Limited by localStorage size constraints (~5-10MB).
 *
 * @example
 * ```ts
 * const cache = new LocalStorageCacheStrategy({ prefix: 'app:' })
 * await cache.set('settings', userSettings)
 * ```
 */
export class LocalStorageCacheStrategy<T = any> implements CacheStrategy<T> {
  constructor(
    private options: {
      prefix?: string
      defaultTTL?: number
    } = {}
  ) {}

  private getStorageKey(key: string): string {
    return `${this.options.prefix ?? 'cache:'}${key}`
  }

  async get(key: string): Promise<T | null> {
    if (typeof window === 'undefined') {
      return null
    }

    try {
      const storageKey = this.getStorageKey(key)
      const item = localStorage.getItem(storageKey)

      if (!item) {
        return null
      }

      const entry: CacheEntry<T> = JSON.parse(item)

      // Check if expired
      const now = Date.now()
      if (now - entry.timestamp > entry.ttl) {
        localStorage.removeItem(storageKey)
        return null
      }

      return entry.data
    } catch (error) {
      console.error('LocalStorageCacheStrategy.get error:', error)
      return null
    }
  }

  async set(key: string, data: T, ttl?: number): Promise<void> {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const storageKey = this.getStorageKey(key)
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttl ?? this.options.defaultTTL ?? 24 * 60 * 60 * 1000, // 24 hours default
      }

      localStorage.setItem(storageKey, JSON.stringify(entry))
    } catch (error) {
      console.error('LocalStorageCacheStrategy.set error:', error)
      // Handle quota exceeded error
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded, clearing old entries')
        await this.clear()
      }
    }
  }

  async has(key: string): Promise<boolean> {
    const data = await this.get(key)
    return data !== null
  }

  async delete(key: string): Promise<void> {
    if (typeof window === 'undefined') {
      return
    }

    const storageKey = this.getStorageKey(key)
    localStorage.removeItem(storageKey)
  }

  async clear(): Promise<void> {
    if (typeof window === 'undefined') {
      return
    }

    const prefix = this.options.prefix ?? 'cache:'
    const keysToRemove: string[] = []

    // Find all keys with our prefix
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key)
      }
    }

    // Remove them
    keysToRemove.forEach((key) => localStorage.removeItem(key))
  }
}

/**
 * No-op cache strategy
 *
 * Disables caching. Useful for testing or debugging.
 *
 * @example
 * ```ts
 * const cache = new NoOpCacheStrategy()
 * ```
 */
export class NoOpCacheStrategy<T = any> implements CacheStrategy<T> {
  async get(_key: string): Promise<T | null> {
    return null
  }

  async set(_key: string, _data: T, _ttl?: number): Promise<void> {
    // No-op
  }

  async has(_key: string): Promise<boolean> {
    return false
  }

  async delete(_key: string): Promise<void> {
    // No-op
  }

  async clear(): Promise<void> {
    // No-op
  }
}

/**
 * Composite cache strategy
 *
 * Uses multiple cache strategies in a layered approach (L1, L2, etc.).
 * Tries L1 first (fast, in-memory), falls back to L2 (persistent).
 *
 * @example
 * ```ts
 * const cache = new CompositeCacheStrategy([
 *   new MemoryCacheStrategy(), // L1: Fast
 *   new LocalStorageCacheStrategy() // L2: Persistent
 * ])
 * ```
 */
export class CompositeCacheStrategy<T = any> implements CacheStrategy<T> {
  constructor(private strategies: CacheStrategy<T>[]) {
    if (strategies.length === 0) {
      throw new Error('CompositeCacheStrategy requires at least one strategy')
    }
  }

  async get(key: string): Promise<T | null> {
    // Try each strategy in order
    for (const strategy of this.strategies) {
      const data = await strategy.get(key)
      if (data !== null) {
        // Backfill earlier caches
        await this.backfill(key, data)
        return data
      }
    }

    return null
  }

  async set(key: string, data: T, ttl?: number): Promise<void> {
    // Set in all strategies
    await Promise.all(
      this.strategies.map((strategy) => strategy.set(key, data, ttl))
    )
  }

  async has(key: string): Promise<boolean> {
    // Check if any strategy has the key
    for (const strategy of this.strategies) {
      if (await strategy.has(key)) {
        return true
      }
    }
    return false
  }

  async delete(key: string): Promise<void> {
    // Delete from all strategies
    await Promise.all(this.strategies.map((strategy) => strategy.delete(key)))
  }

  async clear(): Promise<void> {
    // Clear all strategies
    await Promise.all(this.strategies.map((strategy) => strategy.clear()))
  }

  /**
   * Backfill earlier cache layers when data is found in a later layer
   */
  private async backfill(key: string, data: T): Promise<void> {
    // Set in all strategies that don't have it yet
    for (const strategy of this.strategies) {
      if (!(await strategy.has(key))) {
        await strategy.set(key, data)
      } else {
        break // Stop at first strategy that has it
      }
    }
  }
}
