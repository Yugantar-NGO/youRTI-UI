'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import styles from './TopNavigation.module.css'

interface TopNavigationProps {
  className?: string
}

/**
 * TopNavigation Component
 *
 * Per TODO Spec Section 2.1: Sticky top navigation bar with filters and search.
 * Full-width header with logo, global filters, and search functionality.
 *
 * @example
 * <TopNavigation />
 */
export function TopNavigation({ className = '' }: TopNavigationProps) {
  const [timeRange, setTimeRange] = useState('30 days')
  const [region, setRegion] = useState('India')

  return (
    <nav className={`${styles.topNav} ${className}`}>
      <div className={styles.container}>
        {/* Left: Logo + Wordmark */}
        <div className={styles.brand}>
          <div className={styles.logo}>RTI</div>
          <span className={styles.wordmark}>RTI Transparency Dashboard</span>
        </div>

        {/* Center: Global Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Time range:</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={styles.filterChip}
            >
              <option value="This week">This week</option>
              <option value="30 days">30 days</option>
              <option value="12 months">12 months</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Region:</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={styles.filterChip}
            >
              <option value="India">India</option>
              <option value="State">State</option>
              <option value="District">District</option>
            </select>
          </div>
        </div>

        {/* Right: Search + Icons */}
        <div className={styles.actions}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="search"
              placeholder="Search RTIs, topics, departments…"
              className={styles.searchInput}
            />
          </div>

          <div className={styles.iconButtons}>
            <button className={styles.iconButton} aria-label="Switch language">
              <span>EN</span>
            </button>
            <button className={styles.iconButton} aria-label="Help">
              <span>?</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
