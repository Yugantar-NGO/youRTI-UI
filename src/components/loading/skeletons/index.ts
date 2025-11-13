/**
 * Skeleton components for loading states
 *
 * This module exports pre-configured skeleton components for common UI patterns.
 * Use these components to provide visual feedback during data loading.
 *
 * @example
 * ```tsx
 * import { CardSkeleton, TableSkeleton, TextSkeleton } from '@/components/loading/skeletons'
 *
 * function MyComponent() {
 *   if (isLoading) return <CardSkeleton lines={3} showImage />
 *   return <MyData />
 * }
 * ```
 */

export { CardSkeleton } from './CardSkeleton'
export type { CardSkeletonProps } from './CardSkeleton'

export { TableSkeleton } from './TableSkeleton'
export type { TableSkeletonProps } from './TableSkeleton'

export { TextSkeleton } from './TextSkeleton'
export type { TextSkeletonProps } from './TextSkeleton'
