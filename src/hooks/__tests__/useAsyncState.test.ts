/**
 * useAsyncState Hook Tests
 *
 * Tests cover:
 * - State transitions (idle -> loading -> success/error)
 * - Data and error handling
 * - Reset functionality
 * - Immediate execution
 * - Cleanup on unmount
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { useAsyncState, useMultipleAsyncStates } from '../useAsyncState'

describe('useAsyncState', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should start in idle state', () => {
      const { result } = renderHook(() =>
        useAsyncState(async () => 'data')
      )

      expect(result.current.state.status).toBe('idle')
      expect(result.current.isIdle).toBe(true)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isSuccess).toBe(false)
      expect(result.current.isError).toBe(false)
      expect(result.current.data).toBeNull()
      expect(result.current.error).toBeNull()
    })

    it('should execute immediately when immediate flag is true', async () => {
      const asyncFn = jest.fn(async () => 'data')

      renderHook(() => useAsyncState(asyncFn, true))

      await waitFor(() => {
        expect(asyncFn).toHaveBeenCalled()
      })
    })

    it('should not execute immediately when immediate flag is false', () => {
      const asyncFn = jest.fn(async () => 'data')

      renderHook(() => useAsyncState(asyncFn, false))

      expect(asyncFn).not.toHaveBeenCalled()
    })
  })

  describe('Loading State', () => {
    it('should transition to loading state when execute is called', async () => {
      const { result } = renderHook(() =>
        useAsyncState(async () => {
          await new Promise((resolve) => setTimeout(resolve, 100))
          return 'data'
        })
      )

      act(() => {
        result.current.execute()
      })

      expect(result.current.state.status).toBe('loading')
      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toBeNull()
      expect(result.current.error).toBeNull()
    })
  })

  describe('Success State', () => {
    it('should transition to success state on successful execution', async () => {
      const { result } = renderHook(() =>
        useAsyncState(async () => 'test data')
      )

      await act(async () => {
        await result.current.execute()
      })

      expect(result.current.state.status).toBe('success')
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toBe('test data')
      expect(result.current.error).toBeNull()
    })

    it('should return data from execute function', async () => {
      const { result } = renderHook(() =>
        useAsyncState(async () => 'test data')
      )

      let returnedData: string | null = null

      await act(async () => {
        returnedData = await result.current.execute()
      })

      expect(returnedData).toBe('test data')
    })

    it('should handle complex data types', async () => {
      const testData = { id: 1, name: 'Test', items: [1, 2, 3] }

      const { result } = renderHook(() =>
        useAsyncState(async () => testData)
      )

      await act(async () => {
        await result.current.execute()
      })

      expect(result.current.data).toEqual(testData)
    })
  })

  describe('Error State', () => {
    it('should transition to error state on failed execution', async () => {
      const testError = new Error('Test error')

      const { result } = renderHook(() =>
        useAsyncState(async () => {
          throw testError
        })
      )

      await act(async () => {
        await result.current.execute()
      })

      expect(result.current.state.status).toBe('error')
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(testError)
      expect(result.current.data).toBeNull()
    })

    it('should convert non-Error rejections to Error objects', async () => {
      const { result } = renderHook(() =>
        useAsyncState(async () => {
          throw 'String error'
        })
      )

      await act(async () => {
        await result.current.execute()
      })

      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.error?.message).toBe('String error')
    })

    it('should return null from execute on error', async () => {
      const { result } = renderHook(() =>
        useAsyncState(async () => {
          throw new Error('Test error')
        })
      )

      let returnedData: string | null = 'initial'

      await act(async () => {
        returnedData = await result.current.execute()
      })

      expect(returnedData).toBeNull()
    })
  })

  describe('Reset Functionality', () => {
    it('should reset to idle state', async () => {
      const { result } = renderHook(() =>
        useAsyncState(async () => 'data')
      )

      // Execute to get data
      await act(async () => {
        await result.current.execute()
      })

      expect(result.current.isSuccess).toBe(true)

      // Reset
      act(() => {
        result.current.reset()
      })

      expect(result.current.state.status).toBe('idle')
      expect(result.current.isIdle).toBe(true)
      expect(result.current.data).toBeNull()
      expect(result.current.error).toBeNull()
    })

    it('should reset from error state', async () => {
      const { result } = renderHook(() =>
        useAsyncState(async () => {
          throw new Error('Test error')
        })
      )

      await act(async () => {
        await result.current.execute()
      })

      expect(result.current.isError).toBe(true)

      act(() => {
        result.current.reset()
      })

      expect(result.current.isIdle).toBe(true)
      expect(result.current.error).toBeNull()
    })
  })

  describe('Function Parameters', () => {
    it('should pass parameters to async function', async () => {
      const asyncFn = jest.fn(async (id: number, name: string) => ({
        id,
        name,
      }))

      const { result } = renderHook(() => useAsyncState(asyncFn))

      await act(async () => {
        await result.current.execute(123, 'test')
      })

      expect(asyncFn).toHaveBeenCalledWith(123, 'test')
      expect(result.current.data).toEqual({ id: 123, name: 'test' })
    })
  })

  describe('Cleanup on Unmount', () => {
    it('should not update state after unmount', async () => {
      const { result, unmount } = renderHook(() =>
        useAsyncState(async () => {
          await new Promise((resolve) => setTimeout(resolve, 100))
          return 'data'
        })
      )

      act(() => {
        result.current.execute()
      })

      // Unmount before async operation completes
      unmount()

      // Wait for async operation to complete
      await new Promise((resolve) => setTimeout(resolve, 150))

      // State should still be loading since component was unmounted
      // No error should be thrown
    })
  })
})

describe('useMultipleAsyncStates', () => {
  it('should manage multiple async states', async () => {
    const { result } = renderHook(() =>
      useMultipleAsyncStates({
        users: async () => ['user1', 'user2'],
        posts: async () => ['post1', 'post2'],
      })
    )

    expect(result.current.users.isIdle).toBe(true)
    expect(result.current.posts.isIdle).toBe(true)

    await act(async () => {
      await result.current.users.execute()
    })

    expect(result.current.users.isSuccess).toBe(true)
    expect(result.current.users.data).toEqual(['user1', 'user2'])
    expect(result.current.posts.isIdle).toBe(true)

    await act(async () => {
      await result.current.posts.execute()
    })

    expect(result.current.posts.isSuccess).toBe(true)
    expect(result.current.posts.data).toEqual(['post1', 'post2'])
  })

  it('should handle independent errors', async () => {
    const { result } = renderHook(() =>
      useMultipleAsyncStates({
        success: async () => 'data',
        failure: async () => {
          throw new Error('Failed')
        },
      })
    )

    await act(async () => {
      await result.current.success.execute()
      await result.current.failure.execute()
    })

    expect(result.current.success.isSuccess).toBe(true)
    expect(result.current.success.data).toBe('data')
    expect(result.current.failure.isError).toBe(true)
    expect(result.current.failure.error?.message).toBe('Failed')
  })
})
