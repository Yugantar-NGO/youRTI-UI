'use client'

import styles from './ActiveFiltersStrip.module.css'

interface FilterChip {
  id: string
  label: string
  category: 'topics' | 'states' | 'cities' | 'departments' | 'status' | 'dateRange'
}

interface ActiveFiltersStripProps {
  chips: FilterChip[]
  onRemove: (chipId: string, category: FilterChip['category']) => void
  onClearAll: () => void
  className?: string
}

/**
 * ActiveFiltersStrip Component
 *
 * Displays currently active filters as removable chips.
 * Shows "Clear all" button when filters are active.
 */
export function ActiveFiltersStrip({
  chips,
  onRemove,
  onClearAll,
  className = '',
}: ActiveFiltersStripProps) {
  if (chips.length === 0) {
    return null
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.chipsWrapper}>
        {chips.map((chip) => (
          <div key={`${chip.category}-${chip.id}`} className={styles.chip}>
            <span className={styles.chipLabel}>{chip.label}</span>
            <button
              onClick={() => onRemove(chip.id, chip.category)}
              className={styles.chipRemove}
              aria-label={`Remove ${chip.label} filter`}
              type="button"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button onClick={onClearAll} className={styles.clearAllButton} type="button">
        Clear all
      </button>
    </div>
  )
}
