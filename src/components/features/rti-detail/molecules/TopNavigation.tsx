'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { BaseProps } from '@/types'
import styles from './TopNavigation.module.css'

interface TopNavigationProps extends BaseProps {
  onShareClick?: () => void
}

/**
 * TopNavigation Component
 *
 * Sticky top navigation bar with logo, links, search, and share button.
 * Uses dark theme consistent with landing and browse pages.
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
      <div className={styles.container}>
        {/* Left: Logo + Wordmark */}
        <Link href="/" className={styles.brand}>
          <div className={styles.logo}>RTI</div>
          <span className={styles.wordmark}>RTI Transparency Dashboard</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className={styles.navLinks}>
          <Link href="/browse" className={styles.navLink}>
            Browse
          </Link>
          <Link href="/file-rti" className={styles.navLink}>
            File RTI
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
        </nav>

        {/* Right: Search + Actions */}
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
            <button className={styles.shareBtn} onClick={handleShare} aria-label="Share this RTI">
              <span>↗</span>
              <span>Share</span>
            </button>
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
