/**
 * WinCard Molecule
 * Individual win story card with topic tile and impact strip
 */

import React from 'react'
import Link from 'next/link'
import { TopicTile } from '../atoms/TopicTile'
import { ImpactMetric } from '../atoms/ImpactMetric'
import type { WinStory } from '@/types/dashboard'
import styles from './WinCard.module.css'

interface WinCardProps {
  story: WinStory
}

export const WinCard: React.FC<WinCardProps> = ({ story }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <Link href={story.link} className={styles.winCard}>
      <div className={styles.header}>
        <TopicTile
          icon={story.topicIcon}
          color={story.topicColor}
          label={story.topic}
        />
        <div className={styles.topicInfo}>
          <div className={styles.topic}>{story.topic}</div>
          <div className={styles.meta}>
            {story.state} • {formatDate(story.date)}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{story.title}</h3>
        <p className={styles.hookLine}>{story.hookLine}</p>
      </div>

      <div className={styles.impactStrip}>
        {story.impactMetrics.map((metric, index) => (
          <ImpactMetric
            key={index}
            icon={metric.icon}
            value={metric.value}
            label={metric.label}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.department}>{story.department}</span>
      </div>
    </Link>
  )
}
