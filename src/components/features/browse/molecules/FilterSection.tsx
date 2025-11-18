'use client'

import { useState } from 'react'
import styles from './FilterSection.module.css'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterSectionProps {
  title: string
  options: FilterOption[]
  selectedValues: string[]
  onToggle: (optionId: string) => void
  showMoreThreshold?: number
  searchable?: boolean
  type?: 'checkbox' | 'radio'
  className?: string
}

/**
 * FilterSection Component
 *
 * Displays a filterable section with checkboxes or radio buttons.
 * Supports "show more" functionality and search.
 */
export function FilterSection({
  title,
  options,
  selectedValues,
  onToggle,
  showMoreThreshold = 5,
  searchable = false,
  type = 'checkbox',
  className = '',
}: FilterSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter options based on search query
  const filteredOptions = searchQuery
    ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  // Display options (with show more/less functionality)
  const displayOptions = showAll
    ? filteredOptions
    : filteredOptions.slice(0, showMoreThreshold)

  const hasMore = filteredOptions.length > showMoreThreshold

  return (
    <div className={`${styles.section} ${className}`}>
      <h3 className={styles.title}>{title}</h3>

      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      )}

      <div className={styles.optionsList}>
        {displayOptions.map((option) => {
          const isSelected = selectedValues.includes(option.id)

          return (
            <label key={option.id} className={styles.optionLabel}>
              <input
                type={type}
                checked={isSelected}
                onChange={() => onToggle(option.id)}
                className={styles.optionInput}
              />
              <span className={styles.optionText}>
                {option.label}
                {option.count !== undefined && (
                  <span className={styles.optionCount}>({option.count})</span>
                )}
              </span>
            </label>
          )
        })}
      </div>

      {hasMore && !searchQuery && (
        <button
          onClick={() => setShowAll(!showAll)}
          className={styles.showMoreButton}
          type="button"
        >
          {showAll ? 'Show less' : `+${filteredOptions.length - showMoreThreshold} more`}
        </button>
      )}
    </div>
  )
}
