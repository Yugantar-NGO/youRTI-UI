/**
 * Retry Logic Tests
 *
 * Tests cover:
 * - Retry with exponential backoff
 * - Retry with jitter
 * - Retry conditions
 * - Max attempts
 * - Error handling
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { retryWithBackoff, retryWithJitter, withRetry } from '../retryLogic'

describe('retryWithBackoff', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Success Cases', () => {
    it('should return result on first success', async () => {
      const operation = jest.fn(async () => 'success')

      const result = await retryWithBackoff(operation)

      expect(result).toBe('success')
      expect(operation).toHaveBeenCalledTimes(1)
    })

    it('should succeed after retries', async () => {
      let attempts = 0
      const operation = jest.fn(async () => {
        attempts++
        if (attempts < 3) {
          throw new Error('Temporary failure')
        }
        return 'success'
      })

      const result = await retryWithBackoff(operation, {
        maxAttempts: 3,
        initialDelay: 10,
      })

      expect(result).toBe('success')
      expect(operation).toHaveBeenCalledTimes(3)
    })
  })

  describe('Failure Cases', () => {
    it('should throw after max attempts', async () => {
      const operation = jest.fn(async () => {
        throw new Error('Persistent failure')
      })

      await expect(
        retryWithBackoff(operation, {
          maxAttempts: 3,
          initialDelay: 10,
        })
      ).rejects.toThrow('Persistent failure')

      expect(operation).toHaveBeenCalledTimes(3)
    })

    it('should not retry on non-retryable errors', async () => {
      const operation = jest.fn(async () => {
        const error: any = new Error('Client error')
        error.status = 400
        throw error
      })

      await expect(
        retryWithBackoff(operation, {
          maxAttempts: 3,
          shouldRetry: (error: any) => {
            return error.status >= 500
          },
        })
      ).rejects.toThrow('Client error')

      expect(operation).toHaveBeenCalledTimes(1)
    })
  })

  describe('Backoff Behavior', () => {
    it('should implement exponential backoff', async () => {
      const delays: number[] = []
      let attempts = 0

      const operation = async () => {
        attempts++
        if (attempts < 4) {
          throw new Error('Fail')
        }
        return 'success'
      }

      await retryWithBackoff(operation, {
        maxAttempts: 4,
        initialDelay: 100,
        backoffMultiplier: 2,
        onRetry: (_error, _attempt, delay) => {
          delays.push(delay)
        },
      })

      // Delays should follow exponential pattern: 100, 200, 400
      expect(delays).toEqual([100, 200, 400])
    })

    it('should respect max delay', async () => {
      const delays: number[] = []
      let attempts = 0

      const operation = async () => {
        attempts++
        if (attempts < 4) {
          throw new Error('Fail')
        }
        return 'success'
      }

      await retryWithBackoff(operation, {
        maxAttempts: 4,
        initialDelay: 1000,
        maxDelay: 2000,
        backoffMultiplier: 2,
        onRetry: (_error, _attempt, delay) => {
          delays.push(delay)
        },
      })

      // All delays should be capped at 2000
      expect(delays.every((d) => d <= 2000)).toBe(true)
    })
  })

  describe('Retry Conditions', () => {
    it('should retry on network errors by default', async () => {
      const networkError = new TypeError('fetch failed')
      let attempts = 0

      const operation = async () => {
        attempts++
        if (attempts < 3) {
          throw networkError
        }
        return 'success'
      }

      const result = await retryWithBackoff(operation, {
        maxAttempts: 3,
        initialDelay: 10,
      })

      expect(result).toBe('success')
      expect(attempts).toBe(3)
    })

    it('should use custom shouldRetry function', async () => {
      const operation = jest.fn(async () => {
        throw new Error('Custom error')
      })

      const shouldRetry = jest.fn(() => false)

      await expect(
        retryWithBackoff(operation, {
          maxAttempts: 3,
          shouldRetry,
        })
      ).rejects.toThrow()

      expect(operation).toHaveBeenCalledTimes(1)
      expect(shouldRetry).toHaveBeenCalled()
    })
  })

  describe('Callbacks', () => {
    it('should call onRetry callback', async () => {
      let attempts = 0
      const operation = async () => {
        attempts++
        if (attempts < 3) {
          throw new Error('Fail')
        }
        return 'success'
      }

      const onRetry = jest.fn()

      await retryWithBackoff(operation, {
        maxAttempts: 3,
        initialDelay: 10,
        onRetry,
      })

      expect(onRetry).toHaveBeenCalledTimes(2) // Called on 2nd and 3rd attempts
    })
  })
})

describe('retryWithJitter', () => {
  it('should add jitter to delays', async () => {
    const delays: number[] = []
    let attempts = 0

    const operation = async () => {
      attempts++
      if (attempts < 3) {
        throw new Error('Fail')
      }
      return 'success'
    }

    await retryWithJitter(operation, {
      maxAttempts: 3,
      initialDelay: 100,
      onRetry: (_error, _attempt, delay) => {
        delays.push(delay)
      },
    })

    // Delays should have jitter added (will be different from exact exponential)
    // Just verify we got some delays
    expect(delays.length).toBe(2)
    delays.forEach((delay) => {
      expect(delay).toBeGreaterThan(0)
    })
  })
})

describe('withRetry', () => {
  it('should create a retryable function', async () => {
    let attempts = 0
    const operation = async (value: number) => {
      attempts++
      if (attempts < 3) {
        throw new Error('Fail')
      }
      return value * 2
    }

    const retryableOperation = withRetry(operation, {
      maxAttempts: 3,
      initialDelay: 10,
    })

    const result = await retryableOperation(5)

    expect(result).toBe(10)
    expect(attempts).toBe(3)
  })

  it('should preserve function arguments', async () => {
    const operation = jest.fn(async (a: number, b: string) => `${a}-${b}`)

    const retryableOperation = withRetry(operation, {
      maxAttempts: 1,
    })

    const result = await retryableOperation(42, 'test')

    expect(result).toBe('42-test')
    expect(operation).toHaveBeenCalledWith(42, 'test')
  })

  it('should be reusable', async () => {
    const operation = jest.fn(async () => 'success')

    const retryableOperation = withRetry(operation, {
      maxAttempts: 2,
      initialDelay: 10,
    })

    await retryableOperation()
    await retryableOperation()

    expect(operation).toHaveBeenCalledTimes(2)
  })
})
