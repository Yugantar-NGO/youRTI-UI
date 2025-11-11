/**
 * FilterPill Atom
 * Reusable filter/chip component for category selection
 */

import React from 'react'
import styles from './FilterPill.module.css'

interface FilterPillProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export const FilterPill: React.FC<FilterPillProps> = ({
  label,
  active = false,
  onClick
}) => {
  return (
    <button
      className={`${styles.filterPill} ${active ? styles.active : ''}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}
