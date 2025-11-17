'use client'

import { Search } from 'lucide-react'
import styles from './TopNavigation.module.css'

interface TopNavigationProps {
  className?: string
}

/**
 * TopNavigation Component
 *
 * Sticky top navigation bar with navigation links and search.
 * Full-width header with logo, navigation links, and search functionality.
 *
 * @example
 * <TopNavigation />
 */
export function TopNavigation({ className = '' }: TopNavigationProps) {

  return (
    <nav className={`${styles.topNav} ${className}`}>
      <div className={styles.container}>
        {/* Left: Logo + Wordmark */}
        <div className={styles.brand}>
          <div className={styles.logo}>RTI</div>
          <span className={styles.wordmark}>RTI Transparency Dashboard</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className={styles.navLinks}>
          <a href="/browse" className={styles.navLink}>
            Browse
          </a>
          <a href="/analytics" className={styles.navLink}>
            Analytics
          </a>
          <a href="/file-rti" className={styles.navLink}>
            File RTI
          </a>
          <a href="/about" className={styles.navLink}>
            About
          </a>
        </nav>

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
