/**
 * ChipStrip Atom
 * Scrollable horizontal chips container for topic summaries
 */

import React from 'react'
import styles from './ChipStrip.module.css'

interface ChipStripProps {
  chips: string[]
}

export const ChipStrip: React.FC<ChipStripProps> = ({ chips }) => {
  return (
    <div className={styles.chipStripContainer}>
      <div className={styles.chipStrip}>
        {chips.map((chip, index) => (
          <span key={index} className={styles.chip}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}
