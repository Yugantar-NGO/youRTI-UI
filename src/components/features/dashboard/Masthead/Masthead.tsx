/**
 * Masthead Component
 *
 * Top navigation with RTI logo, tagline, edition selectors, and global search
 */

'use client'

import { useEditionFilter } from '@/context/EditionContext'
import { EditionLevel } from '@/types/dashboard'
import styles from './Masthead.module.css'

export function Masthead() {
  const { filter, updateLevel, updateState } = useEditionFilter()

  const handleEditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value as EditionLevel
    updateLevel(level)
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateState(e.target.value)
  }

  return (
    <div className={styles.masthead}>
      <div className={styles.container}>
        {/* Top Strip */}
        <div className={styles.topStrip}>
          <div className={styles.branding}>
            <h1 className={styles.logo}>RTI TRANSPARENCY DASHBOARD</h1>
            <p className={styles.tagline}>"Tracking information, not rumours."</p>
          </div>
        </div>

        {/* Edition Bar */}
        <div className={styles.editionBar}>
          <div className={styles.editionSelectors}>
            <label className={styles.selectorLabel}>
              Edition:
              <select
                className={styles.select}
                value={filter.level}
                onChange={handleEditionChange}
              >
                <option value="national">National</option>
                <option value="state">State</option>
                <option value="district">District</option>
              </select>
            </label>

            {(filter.level === 'state' || filter.level === 'district') && (
              <label className={styles.selectorLabel}>
                State:
                <select
                  className={styles.select}
                  value={filter.state || ''}
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                </select>
              </label>
            )}

            {filter.level === 'district' && (
              <label className={styles.selectorLabel}>
                District:
                <select className={styles.select}>
                  <option value="">Select District</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </label>
            )}
          </div>

          <div className={styles.searchContainer}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search RTIs, topics, departments..."
            />
          </div>
        </div>

        {/* Section Navigation */}
        <nav className={styles.sectionNav}>
          <a href="#" className={styles.navLink}>🏠 Overview</a>
          <a href="#" className={styles.navLink}>🗺 By Region</a>
          <a href="#" className={styles.navLink}>🏢 Departments</a>
          <a href="#" className={styles.navLink}>📂 Topics</a>
          <a href="#" className={styles.navLink}>📚 How to File RTI</a>
          <a href="#" className={styles.navLink}>🔍 Advanced Search</a>
        </nav>
      </div>
    </div>
  )
}
