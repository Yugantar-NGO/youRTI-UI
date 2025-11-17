import { TopicStatistics } from '@/types/dashboard'
import styles from './TopicCard.module.css'

interface TopicCardProps {
  topic: TopicStatistics
  className?: string
}

/**
 * TopicCard Component
 *
 * Displays aggregated statistics for a specific RTI topic category.
 * Shows response rates, average response times, trending data, and latest question.
 *
 * @example
 * <TopicCard topic={topicStats} />
 */
export function TopicCard({ topic, className = '' }: TopicCardProps) {
  const changeIcon = topic.countChange >= 0 ? '↑' : '↓'
  const changeClass = topic.countChange >= 0 ? styles.positive : styles.negative

  return (
    <div className={`${styles.card} ${className}`}>
      {/* Header with icon and topic name */}
      <div className={styles.header}>
        <span className={styles.icon} aria-label={topic.name}>
          {topic.icon}
        </span>
        <h3 className={styles.topicName}>{topic.name}</h3>
      </div>

      {/* Count and trend */}
      <div className={styles.countSection}>
        <div className={styles.count}>{topic.count.toLocaleString()}</div>
        <div className={`${styles.change} ${changeClass}`}>
          {changeIcon}
          {Math.abs(topic.countChange)}%
        </div>
      </div>

      {/* Response rate */}
      <div className={styles.stat}>
        <span className={styles.statIcon}>✓</span>
        <div className={styles.statLabel}>Response:</div>
        <div className={styles.statValue}>{topic.responseRate}%</div>
      </div>

      {/* Average response time */}
      <div className={styles.stat}>
        <span className={styles.statIcon}>⏱</span>
        <div className={styles.statLabel}>Avg time:</div>
        <div className={styles.statValue}>{topic.avgResponseDays} days</div>
      </div>

      {/* Top department */}
      <div className={styles.stat}>
        <span className={styles.statIcon}>🏛</span>
        <div className={styles.statLabel}>Top dept:</div>
        <div className={styles.statValue}>{topic.topDepartmentCode}</div>
      </div>

      {/* Latest question preview */}
      <div className={styles.latest}>
        <div className={styles.latestLabel}>LATEST:</div>
        <div className={styles.latestQuestion}>{topic.latestQuestion}</div>
        <div className={styles.latestMeta}>
          {topic.latestQuestionLocation} • {topic.latestQuestionAge}
        </div>
      </div>

      {/* Progress bar for response rate */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${topic.responseRate}%` }}
        />
      </div>

      {/* Answered/Pending/Overdue counts */}
      <div className={styles.badges}>
        <div className={`${styles.badge} ${styles.answeredBadge}`}>
          <span className={styles.badgeCount}>{topic.answeredCount}</span> Answered
        </div>
        <div className={`${styles.badge} ${styles.pendingBadge}`}>
          <span className={styles.badgeCount}>{topic.pendingCount}</span> Pending
        </div>
        <div className={`${styles.badge} ${styles.overdueBadge}`}>
          <span className={styles.badgeCount}>{topic.overdueCount}</span> Overdue
        </div>
      </div>

      {/* View All RTIs Button */}
      <a href={topic.link} className={styles.viewAllButton}>
        View All RTIs →
      </a>
    </div>
  )
}
