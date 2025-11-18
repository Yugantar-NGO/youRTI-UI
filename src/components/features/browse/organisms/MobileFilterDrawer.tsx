'use client'

import { FilterSection } from '../molecules/FilterSection'
import { ActiveFilters, FilterOptions } from '@/types/dashboard'
import { RTIStatus } from '@/types'
import styles from './MobileFilterDrawer.module.css'

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filterOptions: FilterOptions
  activeFilters: ActiveFilters
  onFilterChange: (filters: Partial<ActiveFilters>) => void
  onApply: () => void
}

/**
 * MobileFilterDrawer Component
 *
 * Bottom drawer for mobile with all filter sections.
 * Slides up from bottom when opened.
 */
export function MobileFilterDrawer({
  isOpen,
  onClose,
  filterOptions,
  activeFilters,
  onFilterChange,
  onApply,
}: MobileFilterDrawerProps) {
  const handleTopicToggle = (topicId: string) => {
    const newTopics = activeFilters.topics.includes(topicId)
      ? activeFilters.topics.filter((id) => id !== topicId)
      : [...activeFilters.topics, topicId]

    onFilterChange({ topics: newTopics })
  }

  const handleStateToggle = (stateId: string) => {
    const newStates = activeFilters.states.includes(stateId)
      ? activeFilters.states.filter((id) => id !== stateId)
      : [...activeFilters.states, stateId]

    onFilterChange({ states: newStates })
  }

  const handleCityToggle = (cityId: string) => {
    const newCities = activeFilters.cities.includes(cityId)
      ? activeFilters.cities.filter((id) => id !== cityId)
      : [...activeFilters.cities, cityId]

    onFilterChange({ cities: newCities })
  }

  const handleDepartmentToggle = (deptId: string) => {
    const newDepartments = activeFilters.departments.includes(deptId)
      ? activeFilters.departments.filter((id) => id !== deptId)
      : [...activeFilters.departments, deptId]

    onFilterChange({ departments: newDepartments })
  }

  const handleStatusChange = (statusId: string) => {
    onFilterChange({ status: statusId as RTIStatus | 'all' })
  }

  const handleDateRangeChange = (rangeId: string) => {
    onFilterChange({
      dateRange: rangeId as ActiveFilters['dateRange'],
    })
  }

  const handleClearAll = () => {
    onFilterChange({
      topics: [],
      states: [],
      cities: [],
      departments: [],
      status: 'all',
      dateRange: 'all',
    })
  }

  // Get cities for selected states only
  const availableCities =
    activeFilters.states.length > 0
      ? filterOptions.cities.filter((city) => activeFilters.states.includes(city.stateId))
      : []

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Drawer */}
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Filters</h2>
          <div className={styles.headerButtons}>
            <button onClick={handleClearAll} className={styles.clearButton} type="button">
              Clear All
            </button>
            <button onClick={onClose} className={styles.closeButton} type="button">
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Topic Filter */}
          <FilterSection
            title="TOPIC"
            options={filterOptions.topics.map((t) => ({
              id: t.id,
              label: t.name,
              count: t.count,
            }))}
            selectedValues={activeFilters.topics}
            onToggle={handleTopicToggle}
            showMoreThreshold={5}
          />

          {/* Location Filter - State */}
          <FilterSection
            title="LOCATION"
            options={filterOptions.states.map((s) => ({
              id: s.id,
              label: `📍 ${s.name}`,
              count: s.count,
            }))}
            selectedValues={activeFilters.states}
            onToggle={handleStateToggle}
            showMoreThreshold={5}
          />

          {/* Location Filter - City */}
          {activeFilters.states.length > 0 && availableCities.length > 0 && (
            <FilterSection
              title="CITY"
              options={availableCities.map((c) => ({
                id: c.id,
                label: `🏙️ ${c.name}`,
                count: c.count,
              }))}
              selectedValues={activeFilters.cities}
              onToggle={handleCityToggle}
              showMoreThreshold={5}
            />
          )}

          {/* Status Filter */}
          <div className={styles.radioSection}>
            <h3 className={styles.radioTitle}>STATUS</h3>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="mobile-status"
                value="all"
                checked={activeFilters.status === 'all'}
                onChange={() => handleStatusChange('all')}
                className={styles.radioInput}
              />
              <span>All</span>
            </label>
            {filterOptions.statuses.map((status) => (
              <label key={status.id} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="mobile-status"
                  value={status.id}
                  checked={activeFilters.status === status.id}
                  onChange={() => handleStatusChange(status.id)}
                  className={styles.radioInput}
                />
                <span>
                  {status.label} ({status.count})
                </span>
              </label>
            ))}
          </div>

          {/* Department Filter */}
          <FilterSection
            title="DEPARTMENT"
            options={filterOptions.departments.map((d) => ({
              id: d.id,
              label: d.code,
              count: d.count,
            }))}
            selectedValues={activeFilters.departments}
            onToggle={handleDepartmentToggle}
            showMoreThreshold={5}
            searchable
          />

          {/* Date Range Filter */}
          <div className={styles.selectSection}>
            <h3 className={styles.selectTitle}>DATE RANGE</h3>
            <select
              value={activeFilters.dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className={styles.selectInput}
            >
              <option value="all">All time</option>
              <option value="last-7-days">Last 7 days</option>
              <option value="last-30-days">Last 30 days</option>
              <option value="last-90-days">Last 90 days</option>
              <option value="last-year">Last year</option>
            </select>
          </div>
        </div>

        {/* Apply button (sticky at bottom) */}
        <div className={styles.footer}>
          <button onClick={onApply} className={styles.applyButton} type="button">
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}
