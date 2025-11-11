/**
 * TopicTile Atom
 * A colored tile with an icon representing a topic category
 */

import React from 'react'
import styles from './TopicTile.module.css'

interface TopicTileProps {
  icon: string
  color: string
  label: string
}

export const TopicTile: React.FC<TopicTileProps> = ({ icon, color, label }) => {
  return (
    <div
      className={styles.topicTile}
      style={{ backgroundColor: color }}
      aria-label={label}
    >
      <span className={styles.icon}>{icon}</span>
    </div>
  )
}
