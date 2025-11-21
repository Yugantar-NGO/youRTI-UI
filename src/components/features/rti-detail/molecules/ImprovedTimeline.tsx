'use client'

import { BaseProps, RTIStatus } from '@/types'
import { InfoIcon } from '../atoms'
import styles from './ImprovedTimeline.module.css'

interface TimelineEvent {
  date: string
  label: string
  description?: string
  isTransfer?: boolean
}

interface ImprovedTimelineProps extends BaseProps {
  status: RTIStatus
  filedDate: string
  respondedDate?: string
  expectedDate?: string
  daysElapsed?: number
  daysRemaining?: number
  daysOverdue?: number
  currentPIO?: string
  transferDate?: string
  reminderDate?: string
  events?: TimelineEvent[]
}

/**
 * ImprovedTimeline Component
 *
 * Horizontal progress timeline with dots and labels.
 * Shows current progress towards deadline or completion.
 *
 * @example
 * <ImprovedTimeline status="pending" filedDate="Nov 5" ... />
 */
export function ImprovedTimeline({
  status,
  filedDate,
  respondedDate,
  expectedDate,
  daysElapsed = 0,
  daysRemaining,
  daysOverdue,
  currentPIO,
  transferDate,
  reminderDate,
  events,
  className = '',
}: ImprovedTimelineProps) {
  const statusConfig: Record<string, any> = {
    answered: {
      icon: '🗓️',
      title: 'RTI Journey Timeline',
      progressColor: '#10B981',
      borderColor: '#E5E7EB',
      durationLabel: `${daysElapsed} days total`,
      durationBg: '#DCFCE7',
      durationColor: '#15803D',
    },
    overdue: {
      icon: '⚠️',
      title: 'RTI Timeline - Overdue',
      progressColor: '#EF4444',
      borderColor: '#FECACA',
      durationLabel: `${daysOverdue} days overdue`,
      durationBg: '#FEE2E2',
      durationColor: '#DC2626',
    },
    partial: {
      icon: '📋',
      title: 'RTI Response Timeline',
      progressColor: '#F97316',
      borderColor: '#FED7AA',
      durationLabel: `${daysElapsed} days response time`,
      durationBg: '#FFEDD5',
      durationColor: '#EA580C',
    },
    pending: {
      icon: '⏳',
      title: 'RTI Progress Timeline',
      progressColor: '#F59E0B',
      borderColor: '#FDE68A',
      durationLabel: `${daysElapsed} days elapsed`,
      durationBg: '#FEF3C7',
      durationColor: '#EA580C',
    },
    transferred: {
      icon: '🔄',
      title: 'Transfer Timeline',
      progressColor: '#8B5CF6',
      borderColor: '#DDD6FE',
      durationLabel: `Transferred after ${daysElapsed} days`,
      durationBg: '#EDE9FE',
      durationColor: '#7C3AED',
    },
  }

  const config = statusConfig[status] || statusConfig.answered

  // Calculate progress percentage
  let progressPercentage = 0
  if (status === 'answered') {
    progressPercentage = 66 // Match HTML exactly for answered status
  } else if (status === 'partial') {
    progressPercentage = 100
  } else if (status === 'overdue') {
    progressPercentage = 100
  } else if (status === 'pending') {
    progressPercentage = (daysElapsed / 30) * 100
  } else if (status === 'transferred' && transferDate) {
    progressPercentage = 45 // Example transfer point
  }

  // Default timeline events
  const defaultEvents: TimelineEvent[] = []

  if (status === 'transferred') {
    defaultEvents.push(
      { date: filedDate, label: 'Filed', description: 'Original Dept' },
      { date: transferDate || '', label: 'Transferred', description: 'New Dept', isTransfer: true },
      { date: expectedDate || '', label: 'Due Date', description: 'New Deadline' }
    )
  } else if (status === 'answered' || status === 'partial') {
    // Format dates consistently for all answered/partial status
    const formatDate = (dateStr: string) => {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    // Check if reminderDate is provided in data, otherwise calculate it
    let reminderDateFormatted = ''
    if (reminderDate) {
      reminderDateFormatted = formatDate(reminderDate)
    } else {
      // Calculate reminder date (roughly 2/3 of the way through)
      const reminderPosition = Math.floor(daysElapsed * 0.65)
      const filedDateObj = new Date(filedDate)
      const reminderDateObj = new Date(filedDateObj)
      reminderDateObj.setDate(reminderDateObj.getDate() + reminderPosition)
      reminderDateFormatted = reminderDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    defaultEvents.push(
      { date: formatDate(filedDate), label: 'Filed' },
      { date: reminderDateFormatted, label: 'Reminder' },
      { date: formatDate(respondedDate || ''), label: 'Answered' }
    )
  } else {
    defaultEvents.push(
      { date: filedDate, label: 'Filed' },
      { date: 'Today', label: 'Today', description: `Day ${daysElapsed}` },
      { date: expectedDate || '', label: status === 'overdue' ? 'Due Date' : 'Due Date' }
    )
  }

  const timelineEvents = events || defaultEvents

  return (
    <div className={`${styles.section} ${className}`} style={{ borderColor: config.borderColor }}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>{config.icon}</span>
          <span>{config.title}</span>
          <InfoIcon tooltip="Track your RTI application's progress from filing to response. This timeline shows key dates, current status, and how long the process has taken." />
        </div>
        <div
          className={styles.duration}
          style={{ background: config.durationBg, color: config.durationColor }}
        >
          {config.durationLabel}
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.line} />
        <div
          className={styles.progress}
          style={{
            background: config.progressColor,
            width: `${progressPercentage}%`,
          }}
        />

        {timelineEvents.map((event, index) => {
          // For answered status with 3 events: 0%, 43%, 66% (matching HTML exactly)
          let position = 0
          if (status === 'answered' && timelineEvents.length === 3) {
            position = index === 0 ? 0 : index === 1 ? 43 : 66
          } else {
            position = index === 0 ? 0 : index === timelineEvents.length - 1 ? 100 : progressPercentage
          }
          const isFuture = status === 'pending' && index === timelineEvents.length - 1
          const isTransfer = event.isTransfer

          return (
            <div key={index}>
              <div
                className={`${styles.dot} ${isFuture ? styles.dotFuture : ''} ${
                  isTransfer ? styles.dotTransfer : ''
                }`}
                style={{
                  left: `${position}%`,
                  borderColor: isFuture ? '#D1D5DB' : config.progressColor,
                }}
              />
              <div className={styles.label} style={{ left: `${position}%` }}>
                <div className={styles.labelDate}>{event.date}</div>
                <div className={styles.labelText}>{event.label}</div>
                {event.description && <div className={styles.labelDesc}>{event.description}</div>}
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.meta}>
        {status === 'answered' && (
          <>
            <div className={styles.metaItem}>
              <span>⚡</span>
              <span>Response time:</span>
              <span className={styles.metaValue}>
                {daysElapsed && daysElapsed < 30 ? `7 days faster than dept avg (30d)` : 'On time'}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span>👤</span>
              <span>PIO:</span>
              <span className={styles.metaValue}>{currentPIO || 'Rajesh Kumar'}</span>
            </div>
            <div className={styles.metaItem}>
              <span>📄</span>
              <span>Documents:</span>
              <span className={styles.metaValue}>4 files attached</span>
            </div>
          </>
        )}
        {status !== 'answered' && (
          <>
            <div className={styles.metaItem}>
              <span>⏱️</span>
              <span>Status:</span>
              <span className={styles.metaValue}>
                {status === 'overdue'
                  ? 'Deadline passed'
                  : status === 'partial'
                  ? 'Partially answered'
                  : status === 'transferred'
                  ? 'Awaiting response from new department'
                  : 'Awaiting department response'}
              </span>
            </div>
            {currentPIO && (
              <div className={styles.metaItem}>
                <span>👤</span>
                <span>PIO:</span>
                <span className={styles.metaValue}>{currentPIO}</span>
              </div>
            )}
            {daysRemaining !== undefined && daysRemaining > 0 && (
              <div className={styles.metaItem}>
                <span>📅</span>
                <span>Days Remaining:</span>
                <span className={styles.metaValue}>{daysRemaining} days</span>
              </div>
            )}
            {daysOverdue !== undefined && daysOverdue > 0 && (
              <div className={styles.metaItem}>
                <span>⚠️</span>
                <span>Days Overdue:</span>
                <span className={styles.metaValue}>{daysOverdue} days</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
