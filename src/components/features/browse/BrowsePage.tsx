'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { RTIResultCard } from './atoms/RTIResultCard'
import { ActiveFiltersStrip } from './molecules/ActiveFiltersStrip'
import { FilterSidebar } from './organisms/FilterSidebar'
import { MobileFilterDrawer } from './organisms/MobileFilterDrawer'
import { ActiveFilters, SortOption, RTIResultItem } from '@/types/dashboard'
import { dummyRTIResults, dummyFilterOptions } from '@/data/browseData'
import { TopNavigation } from '../landing/organisms/TopNavigation'
import styles from './BrowsePage.module.css'

/**
 * BrowsePage Component
 *
 * Main browse/filter page with sidebar filters, results grid, and URL parameter handling.
 */
export function BrowsePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize filters from URL params
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(() => {
    const topics = searchParams.get('topic')?.split(',').filter(Boolean) || []
    const states = searchParams.get('state')?.split(',').filter(Boolean) || []
    const cities = searchParams.get('city')?.split(',').filter(Boolean) || []
    const departments = searchParams.get('department')?.split(',').filter(Boolean) || []
    const status = (searchParams.get('status') as ActiveFilters['status']) || 'all'
    const dateRange = (searchParams.get('dateRange') as ActiveFilters['dateRange']) || 'all'

    return { topics, states, cities, departments, status, dateRange }
  })

  const [sortOption, setSortOption] = useState<SortOption>('most-recent')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 12

  // Filter and sort results
  const filteredResults = filterRTIResults(dummyRTIResults, activeFilters)
  const sortedResults = sortRTIResults(filteredResults, sortOption)
  const totalCount = sortedResults.length

  // Pagination
  const startIdx = (currentPage - 1) * resultsPerPage
  const endIdx = startIdx + resultsPerPage
  const paginatedResults = sortedResults.slice(startIdx, endIdx)
  const totalPages = Math.ceil(totalCount / resultsPerPage)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (activeFilters.topics.length > 0) {
      params.set('topic', activeFilters.topics.join(','))
    }
    if (activeFilters.states.length > 0) {
      params.set('state', activeFilters.states.join(','))
    }
    if (activeFilters.cities.length > 0) {
      params.set('city', activeFilters.cities.join(','))
    }
    if (activeFilters.departments.length > 0) {
      params.set('department', activeFilters.departments.join(','))
    }
    if (activeFilters.status !== 'all') {
      params.set('status', activeFilters.status)
    }
    if (activeFilters.dateRange !== 'all') {
      params.set('dateRange', activeFilters.dateRange)
    }

    const queryString = params.toString()
    router.replace(queryString ? `/browse?${queryString}` : '/browse', { scroll: false })
  }, [activeFilters, router])

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<ActiveFilters>) => {
    setActiveFilters((prev) => ({ ...prev, ...newFilters }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Handle individual filter removal
  const handleRemoveFilter = (
    filterId: string,
    category: 'topics' | 'states' | 'cities' | 'departments' | 'status' | 'dateRange'
  ) => {
    if (category === 'status') {
      setActiveFilters((prev) => ({ ...prev, status: 'all' }))
    } else if (category === 'dateRange') {
      setActiveFilters((prev) => ({ ...prev, dateRange: 'all' }))
    } else {
      setActiveFilters((prev) => ({
        ...prev,
        [category]: prev[category].filter((id: string) => id !== filterId),
      }))
    }
  }

  // Handle clear all filters
  const handleClearAll = () => {
    setActiveFilters({
      topics: [],
      states: [],
      cities: [],
      departments: [],
      status: 'all',
      dateRange: 'all',
    })
    setCurrentPage(1)
  }

  // Generate filter chips for active filters
  const filterChips = generateFilterChips(activeFilters, dummyFilterOptions)

  return (
    <div className={styles.pageContainer}>
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        {/* Desktop Sidebar */}
        <FilterSidebar
          filterOptions={dummyFilterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Results Area */}
        <main className={styles.resultsArea}>
          {/* Active Filters Strip */}
          {filterChips.length > 0 && (
            <ActiveFiltersStrip chips={filterChips} onRemove={handleRemoveFilter} onClearAll={handleClearAll} />
          )}

          {/* Results Header */}
          <div className={styles.resultsHeader}>
            <div className={styles.resultCount}>
              {totalCount.toLocaleString()} RTI{totalCount !== 1 ? 's' : ''} found
            </div>
            <div className={styles.sortWrapper}>
              <label htmlFor="sort-select" className={styles.sortLabel}>
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className={styles.sortSelect}
              >
                <option value="most-recent">Most Recent</option>
                <option value="oldest-first">Oldest First</option>
                <option value="response-time-fast">Response Time (Fast)</option>
                <option value="response-time-slow">Response Time (Slow)</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="most-viewed">Most Viewed</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {paginatedResults.length > 0 ? (
            <>
              <div className={styles.resultsGrid}>
                {paginatedResults.map((rti) => (
                  <RTIResultCard key={rti.id} rti={rti} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                    type="button"
                  >
                    ← Previous
                  </button>
                  <div className={styles.paginationInfo}>
                    Page {currentPage} of {totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                    type="button"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty state
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3 className={styles.emptyTitle}>No RTIs found matching filters</h3>
              <p className={styles.emptyText}>Try:</p>
              <ul className={styles.emptyList}>
                <li>Removing some filters</li>
                <li>Broadening your search</li>
                <li>Checking spelling</li>
              </ul>
              <button onClick={handleClearAll} className={styles.emptyClearButton} type="button">
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsFilterDrawerOpen(true)}
        className={styles.mobileFilterButton}
        aria-label="Open filters"
        type="button"
      >
        🔽 Filter
      </button>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filterOptions={dummyFilterOptions}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onApply={() => setIsFilterDrawerOpen(false)}
      />
    </div>
  )
}

// Helper functions

function filterRTIResults(results: RTIResultItem[], filters: ActiveFilters): RTIResultItem[] {
  return results.filter((rti) => {
    // Topic filter
    if (filters.topics.length > 0 && !filters.topics.includes(rti.topic)) {
      return false
    }

    // State filter
    const stateId = rti.state.toLowerCase().replace(/\s+/g, '-')
    if (filters.states.length > 0 && !filters.states.includes(stateId)) {
      return false
    }

    // City filter
    const cityId = rti.location.toLowerCase().replace(/\s+/g, '-')
    if (filters.cities.length > 0 && !filters.cities.includes(cityId)) {
      return false
    }

    // Department filter
    const deptId = rti.department.toLowerCase().replace(/\s+/g, '-')
    if (filters.departments.length > 0 && !filters.departments.some((d) => deptId.includes(d))) {
      return false
    }

    // Status filter
    if (filters.status !== 'all' && rti.status !== filters.status) {
      return false
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const filedDate = new Date(rti.filedDate)
      const now = new Date()
      const diffInDays = Math.floor((now.getTime() - filedDate.getTime()) / (1000 * 60 * 60 * 24))

      switch (filters.dateRange) {
        case 'last-7-days':
          if (diffInDays > 7) return false
          break
        case 'last-30-days':
          if (diffInDays > 30) return false
          break
        case 'last-90-days':
          if (diffInDays > 90) return false
          break
        case 'last-year':
          if (diffInDays > 365) return false
          break
      }
    }

    return true
  })
}

function sortRTIResults(results: RTIResultItem[], sortOption: SortOption): RTIResultItem[] {
  const sorted = [...results]

  switch (sortOption) {
    case 'most-recent':
      return sorted.sort((a, b) => new Date(b.filedDate).getTime() - new Date(a.filedDate).getTime())
    case 'oldest-first':
      return sorted.sort((a, b) => new Date(a.filedDate).getTime() - new Date(b.filedDate).getTime())
    case 'response-time-fast':
      return sorted.sort((a, b) => (a.responseDays || 9999) - (b.responseDays || 9999))
    case 'response-time-slow':
      return sorted.sort((a, b) => (b.responseDays || 0) - (a.responseDays || 0))
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'most-viewed':
      return sorted.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    default:
      return sorted
  }
}

function generateFilterChips(filters: ActiveFilters, filterOptions: typeof dummyFilterOptions) {
  const chips = []

  // Topic chips
  filters.topics.forEach((topicId) => {
    const topic = filterOptions.topics.find((t) => t.id === topicId)
    if (topic) {
      chips.push({ id: topicId, label: topic.name, category: 'topics' as const })
    }
  })

  // State chips
  filters.states.forEach((stateId) => {
    const state = filterOptions.states.find((s) => s.id === stateId)
    if (state) {
      chips.push({ id: stateId, label: state.name, category: 'states' as const })
    }
  })

  // City chips
  filters.cities.forEach((cityId) => {
    const city = filterOptions.cities.find((c) => c.id === cityId)
    if (city) {
      chips.push({ id: cityId, label: city.name, category: 'cities' as const })
    }
  })

  // Department chips
  filters.departments.forEach((deptId) => {
    const dept = filterOptions.departments.find((d) => d.id === deptId)
    if (dept) {
      chips.push({ id: deptId, label: dept.code, category: 'departments' as const })
    }
  })

  // Status chip
  if (filters.status !== 'all') {
    const status = filterOptions.statuses.find((s) => s.id === filters.status)
    if (status) {
      chips.push({ id: filters.status, label: status.label, category: 'status' as const })
    }
  }

  // Date range chip
  if (filters.dateRange !== 'all') {
    const dateLabels = {
      'last-7-days': 'Last 7 days',
      'last-30-days': 'Last 30 days',
      'last-90-days': 'Last 90 days',
      'last-year': 'Last year',
    }
    chips.push({
      id: filters.dateRange,
      label: dateLabels[filters.dateRange],
      category: 'dateRange' as const,
    })
  }

  return chips
}
