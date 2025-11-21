'use client'

import { BaseProps, RTIStatus } from '@/types'
import styles from './SidebarOverviewCard.module.css'

interface SidebarOverviewCardProps extends BaseProps {
  status: RTIStatus
  referenceId: string
  title: string
  filedDate: string
  respondedDate?: string
  expectedDate?: string
  daysElapsed?: number
  daysRemaining?: number
  daysOverdue?: number
  completionPercentage?: number
  questionsAnswered?: number
  totalQuestions?: number
  department: string
  location: string
  state: string
  topics: string[]
  transferredFrom?: string
  transferredTo?: string
  transferReason?: string
}

/**
 * SidebarOverviewCard Component
 *
 * Displays RTI overview information in the sidebar.
 * Shows status, dates, completion (for partial), tags, and CTA button.
 *
 * @example
 * <SidebarOverviewCard status="answered" title="..." ... />
 */
export function SidebarOverviewCard({
  status,
  referenceId,
  title,
  filedDate,
  respondedDate,
  expectedDate,
  daysElapsed,
  daysRemaining,
  daysOverdue,
  completionPercentage,
  questionsAnswered,
  totalQuestions,
  department,
  location,
  state,
  topics,
  transferredFrom,
  transferredTo,
  transferReason,
  className = '',
}: SidebarOverviewCardProps) {
  const statusConfig: Record<string, any> = {
    answered: {
      badge: '✅ Answered',
      color: '#10B981',
      bg: '#DCFCE7',
      textColor: '#15803D',
      datesBg: '#F9FAFB',
      ctaText: '📝 File RTI on This Topic',
      ctaGradient: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
    },
    overdue: {
      badge: '⚠️ Overdue',
      color: '#EF4444',
      bg: '#FEE2E2',
      textColor: '#991B1B',
      datesBg: '#FEE2E2',
      ctaText: '⚖️ File First Appeal',
      ctaGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    },
    partial: {
      badge: '📋 Partial Response',
      color: '#F97316',
      bg: '#FFEDD5',
      textColor: '#9A3412',
      datesBg: '#FFEDD5',
      ctaText: '📝 Appeal for Complete Response',
      ctaGradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    },
    pending: {
      badge: '⏳ Pending',
      color: '#F59E0B',
      bg: '#FEF3C7',
      textColor: '#92400E',
      datesBg: '#FEF3C7',
      ctaText: '🔔 Send Reminder to Department',
      ctaGradient: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)',
    },
    transferred: {
      badge: '🔄 Transferred',
      color: '#8B5CF6',
      bg: '#EDE9FE',
      textColor: '#5B21B6',
      datesBg: '#EDE9FE',
      ctaText: '📝 Track Transfer',
      ctaGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    },
  }

  const config = statusConfig[status] || statusConfig.answered

  // Format date from ISO to readable format (e.g., "Sep 18, 2024")
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className={`${styles.card} ${className}`} style={{ borderColor: config.color }}>
      <div className={styles.header}>
        <div className={styles.statusBadge} style={{ background: config.bg, color: config.textColor }}>
          {config.badge}
        </div>
        <div className={styles.referenceId}>{referenceId}</div>
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.dates} style={{ background: config.datesBg }}>
        <div className={styles.dateItem}>
          <span>Filed:</span>
          <span className={styles.dateValue}>{formatDate(filedDate)}</span>
        </div>
        {respondedDate && (
          <div className={styles.dateItem}>
            <span>{status === 'transferred' ? 'Transferred:' : status === 'partial' ? 'Responded:' : 'Answered:'}</span>
            <span className={styles.dateValue}>{formatDate(respondedDate)}</span>
          </div>
        )}
        {expectedDate && !respondedDate && (
          <div className={styles.dateItem}>
            <span>{status === 'overdue' ? 'Due Date:' : 'Expected By:'}</span>
            <span className={`${styles.dateValue} ${status === 'overdue' ? styles.danger : styles.warning}`}>
              {formatDate(expectedDate)}
            </span>
          </div>
        )}
        {daysElapsed !== undefined && status !== 'overdue' && (
          <div className={styles.dateItem}>
            <span>{status === 'pending' ? 'Days Elapsed:' : 'Response Time:'}</span>
            <span className={styles.dateValue}>
              {status === 'pending' ? `${daysElapsed} of 30` : `${daysElapsed} days`}
            </span>
          </div>
        )}
        {daysOverdue !== undefined && daysOverdue > 0 && (
          <div className={styles.dateItem}>
            <span>Days Overdue:</span>
            <span className={`${styles.dateValue} ${styles.danger}`}>{daysOverdue} days</span>
          </div>
        )}
      </div>

      {/* Completion bar for partial status */}
      {status === 'partial' && completionPercentage !== undefined && (
        <div className={styles.completionBar}>
          <div className={styles.completionLabel}>
            <span className={styles.completionText}>Questions Answered</span>
            <span className={styles.completionPercent}>
              {questionsAnswered !== undefined && totalQuestions !== undefined
                ? `${questionsAnswered} of ${totalQuestions} (${completionPercentage}%)`
                : `${completionPercentage}%`}
            </span>
          </div>
          <div className={styles.completionProgress}>
            <div
              className={styles.completionFill}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Transfer info for transferred status */}
      {status === 'transferred' && transferredFrom && transferredTo && (
        <div className={styles.transferInfo}>
          <div className={styles.transferHeader}>
            <span>🔄</span>
            <span>Transfer Details</span>
          </div>
          <div className={styles.transferDetails}>
            <div className={styles.transferRow}>
              <span className={styles.transferLabel}>From:</span>
              <span className={styles.transferValue}>{transferredFrom}</span>
            </div>
            <div className={styles.transferRow}>
              <span className={styles.transferLabel}>To:</span>
              <span className={styles.transferValue}>{transferredTo}</span>
            </div>
            {transferReason && (
              <div className={styles.transferRow}>
                <span className={styles.transferLabel}>Reason:</span>
                <span className={styles.transferValue}>{transferReason}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className={styles.tagsSection}>
        <div className={styles.tagsTitle}>Related Topics</div>
        <div className={styles.tagsList}>
          <div className={`${styles.tag} ${styles.tagDepartment}`}>🏛️ {department}</div>
          <div className={`${styles.tag} ${styles.tagLocation}`}>
            📍 {location}, {state}
          </div>
          {topics.map((topic, index) => (
            <div key={index} className={`${styles.tag} ${styles.tagTopic}`}>
              🏷️ {topic}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className={styles.ctaWrapper}>
        <button className={styles.ctaBtn} style={{ background: config.ctaGradient }}>
          {config.ctaText}
        </button>
      </div>
    </div>
  )
}
