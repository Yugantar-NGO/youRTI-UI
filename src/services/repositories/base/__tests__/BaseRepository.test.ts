/**
 * BaseRepository Tests
 *
 * Tests cover:
 * - Error handling
 * - Retry logic
 * - Validation
 * - Transformation
 * - Logging
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { BaseRepository, RepositoryError } from '../BaseRepository'
import { errorLogger } from '@/services/errorLogging'

// Mock error logger
jest.mock('@/services/errorLogging', () => ({
  errorLogger: {
    log: jest.fn(),
    logError: jest.fn(),
    logMessage: jest.fn(),
  },
}))

// Test implementation of BaseRepository
class TestRepository extends BaseRepository<string> {
  protected readonly repositoryName = 'TestRepository'

  async testWithErrorHandling<R>(
    operation: () => Promise<R>,
    options = {}
  ): Promise<R> {
    return this.withErrorHandling(operation, 'testOperation', options)
  }

  testValidate<D>(data: D, validator: (data: D) => boolean, message: string): void {
    return this.validate(data, validator, message)
  }

  testTransform<D, R>(data: D, transformer: (data: D) => R): R {
    return this.transform(data, transformer, 'testTransform')
  }
}

describe('BaseRepository', () => {
  let repository: TestRepository

  beforeEach(() => {
    repository = new TestRepository()
    jest.clearAllMocks()
  })

  describe('Error Handling', () => {
    it('should handle successful operations', async () => {
      const operation = jest.fn(async () => 'success')

      const result = await repository.testWithErrorHandling(operation)

      expect(result).toBe('success')
      expect(operation).toHaveBeenCalledTimes(1)
    })

    it('should catch and wrap errors', async () => {
      const testError = new Error('Test error')
      const operation = jest.fn(async () => {
        throw testError
      })

      await expect(
        repository.testWithErrorHandling(operation)
      ).rejects.toThrow(RepositoryError)

      expect(errorLogger.logError).toHaveBeenCalled()
    })

    it('should include context in error', async () => {
      const operation = jest.fn(async () => {
        throw new Error('Test error')
      })

      try {
        await repository.testWithErrorHandling(operation)
      } catch (error) {
        expect(error).toBeInstanceOf(RepositoryError)
        const repoError = error as RepositoryError
        expect(repoError.context).toMatchObject({
          repositoryName: 'TestRepository',
          context: 'testOperation',
        })
      }
    })
  })

  describe('Retry Logic', () => {
    it('should retry on failure when retry is enabled', async () => {
      let attempts = 0
      const operation = jest.fn(async () => {
        attempts++
        if (attempts < 3) {
          throw new Error('Temporary failure')
        }
        return 'success'
      })

      const result = await repository.testWithErrorHandling(operation, {
        retry: true,
        retryAttempts: 3,
      })

      expect(result).toBe('success')
      expect(operation).toHaveBeenCalledTimes(3)
    })

    it('should not retry when retry is disabled', async () => {
      const operation = jest.fn(async () => {
        throw new Error('Failure')
      })

      await expect(
        repository.testWithErrorHandling(operation, { retry: false })
      ).rejects.toThrow()

      expect(operation).toHaveBeenCalledTimes(1)
    })

    it('should throw after max retry attempts', async () => {
      const operation = jest.fn(async () => {
        throw new Error('Persistent failure')
      })

      await expect(
        repository.testWithErrorHandling(operation, {
          retry: true,
          retryAttempts: 2,
        })
      ).rejects.toThrow()

      expect(operation).toHaveBeenCalledTimes(2)
    })
  })

  describe('Validation', () => {
    it('should pass validation for valid data', () => {
      expect(() => {
        repository.testValidate('test', (data) => data.length > 0, 'Must not be empty')
      }).not.toThrow()
    })

    it('should throw RepositoryError for invalid data', () => {
      expect(() => {
        repository.testValidate('', (data) => data.length > 0, 'Must not be empty')
      }).toThrow(RepositoryError)
    })

    it('should include custom error message', () => {
      const message = 'Custom validation error'

      try {
        repository.testValidate(null, (data) => data !== null, message)
      } catch (error) {
        expect(error).toBeInstanceOf(RepositoryError)
        expect((error as RepositoryError).message).toBe(message)
      }
    })
  })

  describe('Transformation', () => {
    it('should transform data successfully', () => {
      const data = { value: 10 }
      const transformer = (d: typeof data) => d.value * 2

      const result = repository.testTransform(data, transformer)

      expect(result).toBe(20)
    })

    it('should catch transformation errors', () => {
      const data = 'test'
      const transformer = () => {
        throw new Error('Transform error')
      }

      expect(() => {
        repository.testTransform(data, transformer)
      }).toThrow(RepositoryError)

      expect(errorLogger.logError).toHaveBeenCalled()
    })
  })

  describe('Logging', () => {
    it('should log info messages', () => {
      repository['logInfo']('Test info message')

      expect(errorLogger.logMessage).toHaveBeenCalledWith(
        '[TestRepository] Test info message',
        'info'
      )
    })

    it('should log warning messages', () => {
      repository['logWarning']('Test warning')

      expect(errorLogger.logMessage).toHaveBeenCalledWith(
        '[TestRepository] Test warning',
        'warn'
      )
    })

    it('should log error messages', () => {
      const error = new Error('Test error')
      repository['logError']('Test error message', error)

      expect(errorLogger.logMessage).toHaveBeenCalledWith(
        '[TestRepository] Test error message: Test error',
        'error'
      )
    })
  })

  describe('Error Type Checking', () => {
    it('should identify network errors', () => {
      const networkError = new TypeError('fetch failed')
      expect(repository['isNetworkError'](networkError)).toBe(true)

      const regularError = new Error('regular error')
      expect(repository['isNetworkError'](regularError)).toBe(false)
    })

    it('should identify timeout errors', () => {
      const timeoutError = new Error('Request timeout')
      expect(repository['isTimeoutError'](timeoutError)).toBe(true)

      const regularError = new Error('regular error')
      expect(repository['isTimeoutError'](regularError)).toBe(false)
    })
  })
})
