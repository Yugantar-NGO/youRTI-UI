/**
 * Repository pattern types and interfaces
 * Abstracts data access layer for easy swapping between mock and API data
 */

import { EditionFilter } from '@/types/dashboard'

/**
 * Generic Repository Interface
 * Defines basic CRUD operations for data access
 */
export interface Repository<T> {
  getAll(): T[]
  getById(id: string): T | undefined
  filter(predicate: (item: T) => boolean): T[]
}

/**
 * Edition Filterable Interface
 * For repositories that support edition-based filtering
 */
export interface EditionFilterable {
  applyEditionFilter(filter: EditionFilter): this
}

/**
 * Sortable Interface
 * For repositories that support sorting
 */
export interface Sortable<T> {
  sortBy(key: keyof T, order?: 'asc' | 'desc'): T[]
}

/**
 * Paginatable Interface
 * For repositories that support pagination
 */
export interface Paginatable<T> {
  paginate(page: number, perPage: number): {
    data: T[]
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}
