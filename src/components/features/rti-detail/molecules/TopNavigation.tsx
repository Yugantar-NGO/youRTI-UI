'use client'

import { BaseProps } from '@/types'
import styles from './TopNavigation.module.css'

interface TopNavigationProps extends BaseProps {
  onShareClick?: () => void
}

/**
 * TopNavigation Component
 *
 * Sticky top navigation bar with logo, links, search, and share button.
 * Matches the new RTI detail page design.
 *
 * @example
 * <TopNavigation />
 */
export function TopNavigation({ className = '', onShareClick }: TopNavigationProps) {
  const handleShare = () => {
    if (onShareClick) {
      onShareClick()
    } else {
      // Default share functionality
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href,
        }).catch(() => {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(window.location.href)
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
      }
    }
  }

  return (
    <nav className={`${styles.topNav} ${className}`}>
      <div className={styles.navLeft}>
        <a href="/" className={styles.logo}>
          yourRTI
        </a>
        <div className={styles.navLinks}>
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
        </div>
      </div>
      <div className={styles.navRight}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search RTIs..."
        />
        <button className={styles.shareBtn} onClick={handleShare}>
          <span>↗</span>
          <span>Share</span>
        </button>
      </div>
    </nav>
  )
}
