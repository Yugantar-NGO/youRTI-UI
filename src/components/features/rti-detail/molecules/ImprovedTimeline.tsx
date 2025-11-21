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

interface Transfer {
  fromDepartment: string
  toDepartment: string
  transferDate: string
  reason: string
  newPIO?: string
  newDeadline?: string
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
  questionsAnswered?: number
  totalQuestions?: number
  documentsCount?: number
  transfers?: Transfer[]
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
  questionsAnswered,
  totalQuestions,
  documentsCount,
  transfers,
  className = '',
}: ImprovedTimelineProps) {
  // Check if we have multiple transfers
  const hasMultipleTransfers = transfers && transfers.length > 1
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
      durationLabel: `${daysElapsed} days total`,
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
      title: hasMultipleTransfers ? 'Multi-Transfer Timeline' : 'Transfer Timeline',
      progressColor: '#8B5CF6',
      borderColor: '#DDD6FE',
      durationLabel: hasMultipleTransfers
        ? `${transfers?.length} transfers in ${daysElapsed} days`
        : `Transferred after ${daysElapsed} days`,
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
    progressPercentage = 73 // Match HTML - partial response at 73%
  } else if (status === 'overdue') {
    progressPercentage = 100
  } else if (status === 'pending') {
    progressPercentage = (daysElapsed / 30) * 100
  } else if (status === 'transferred' && transferDate) {
    progressPercentage = 50 // Transfer point at center
  }

  // Default timeline events
  const defaultEvents: TimelineEvent[] = []

  if (status === 'transferred') {
    // Format dates for transferred status
    const formatDate = (dateStr: string) => {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    // Get short department name (last part after comma or full name if no comma)
    const getShortDept = (dept: string) => {
      const parts = dept.split(',')
      return parts.length > 1 ? parts[parts.length - 1].trim() : dept.split(' ').slice(0, 2).join(' ')
    }

    if (hasMultipleTransfers && transfers) {
      // Build events from multiple transfers
      defaultEvents.push(
        { date: formatDate(filedDate), label: 'Filed', description: getShortDept(transfers[0].fromDepartment) }
      )

      transfers.forEach((transfer, index) => {
        defaultEvents.push({
          date: formatDate(transfer.transferDate),
          label: `Transfer ${index + 1}`,
          description: getShortDept(transfer.toDepartment),
          isTransfer: true,
        })
      })

      defaultEvents.push(
        { date: formatDate(expectedDate || ''), label: 'Due Date', description: 'Current Deadline' }
      )
    } else {
      // Single transfer
      defaultEvents.push(
        { date: formatDate(filedDate), label: 'Filed', description: 'Original Dept' },
        { date: formatDate(transferDate || ''), label: 'Transferred', description: 'New Dept', isTransfer: true },
        { date: formatDate(expectedDate || ''), label: 'Due Date', description: 'New Deadline' }
      )
    }
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
      { date: reminderDateFormatted, label: 'Reminder Sent' },
      { date: formatDate(respondedDate || ''), label: status === 'partial' ? 'Partial Response' : 'Answered' }
    )
  } else {
    // Format dates consistently for pending/overdue status
    const formatDate = (dateStr: string) => {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    // Get today's date formatted
    const today = new Date()
    const todayFormatted = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    if (status === 'overdue') {
      // For overdue: Filed, Due Date (Missed), Today
      defaultEvents.push(
        { date: formatDate(filedDate), label: 'Filed' },
        { date: formatDate(expectedDate || ''), label: 'Due Date', description: '(Missed)' },
        { date: todayFormatted, label: 'Today' }
      )
    } else {
      // For pending: Filed, Today, Due Date
      defaultEvents.push(
        { date: formatDate(filedDate), label: 'Filed', description: 'Day 0' },
        { date: todayFormatted, label: 'Today' },
        { date: formatDate(expectedDate || ''), label: 'Due Date' }
      )
    }
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

      {/* Scrollable timeline for multiple transfers */}
      {hasMultipleTransfers ? (
        <div className={styles.scrollContainer}>
          <div
            className={styles.scrollContent}
            style={{ minWidth: `${Math.max(timelineEvents.length * 120, 600)}px` }}
          >
            <div className={styles.line} />
            <div
              className={styles.progress}
              style={{
                background: config.progressColor,
                width: `${((timelineEvents.length - 1) / timelineEvents.length) * 100}%`,
              }}
            />

            {timelineEvents.map((event, index) => {
              // For multiple transfers, distribute events evenly
              const position = (index / (timelineEvents.length - 1)) * 100
              const isTransfer = event.isTransfer
              const isLastEvent = index === timelineEvents.length - 1
              const isFuture = isLastEvent // Due date is future

              return (
                <div key={index} className={styles.eventNode}>
                  <div
                    className={`${styles.dot} ${isFuture ? styles.dotFuture : ''} ${
                      isTransfer ? styles.dotTransfer : ''
                    }`}
                    style={{
                      left: `${position}%`,
                      borderColor: isFuture ? '#D1D5DB' : config.progressColor,
                    }}
                  />
                  <div
                    className={styles.label}
                    style={{
                      left: `${position}%`,
                      transform: index === 0 ? 'translateX(0%)' : isLastEvent ? 'translateX(-100%)' : 'translateX(-50%)',
                      textAlign: index === 0 ? 'left' : isLastEvent ? 'right' : 'center',
                    }}
                  >
                    <div className={styles.labelDate}>{event.date}</div>
                    <div className={styles.labelText}>{event.label}</div>
                    {event.description && <div className={styles.labelDesc}>{event.description}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
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
            // Calculate position based on status
            let position = 0
            if (status === 'answered' && timelineEvents.length === 3) {
              // For answered status with 3 events: 0%, 43%, 66% (matching HTML exactly)
              position = index === 0 ? 0 : index === 1 ? 43 : 66
            } else if (status === 'partial' && timelineEvents.length === 3) {
              // For partial status with 3 events: 0%, 53%, 73% (matching HTML exactly)
              position = index === 0 ? 0 : index === 1 ? 53 : 73
            } else if (status === 'pending' && timelineEvents.length === 3) {
              // For pending status: Filed at 0%, Today at progress%, Due Date at 100%
              // Ensure middle point is at least 40% to prevent overlap
              const middlePosition = Math.max(progressPercentage, 40)
              position = index === 0 ? 0 : index === 1 ? middlePosition : 100
            } else if (status === 'overdue' && timelineEvents.length === 3) {
              // For overdue status: Filed at 0%, Due Date (Missed) at 62%, Today at 100%
              position = index === 0 ? 0 : index === 1 ? 62 : 100
            } else if (status === 'transferred' && timelineEvents.length === 3) {
              // For transferred status: Filed at 0%, Transferred at 50%, Due Date at 100%
              position = index === 0 ? 0 : index === 1 ? 50 : 100
            } else {
              position = index === 0 ? 0 : index === timelineEvents.length - 1 ? 100 : progressPercentage
            }
            // For pending: Due Date (last) is future. For overdue: nothing is future (all passed)
            const isFuture = status === 'pending' && index === timelineEvents.length - 1
            const isTransfer = event.isTransfer
            const isLastEvent = index === timelineEvents.length - 1
            const isFirstEvent = index === 0

            // Determine label alignment for edge cases
            const labelStyle: React.CSSProperties = {
              left: `${position}%`,
            }
            // Adjust alignment based on position
            if (isFirstEvent) {
              labelStyle.transform = 'translateX(0%)'
              labelStyle.textAlign = 'left'
            } else if (isLastEvent) {
              labelStyle.transform = 'translateX(-100%)'
              labelStyle.textAlign = 'right'
            } else {
              labelStyle.transform = 'translateX(-50%)'
              labelStyle.textAlign = 'center'
            }

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
                <div className={styles.label} style={labelStyle}>
                  <div className={styles.labelDate}>{event.date}</div>
                  <div className={styles.labelText}>{event.label}</div>
                  {event.description && <div className={styles.labelDesc}>{event.description}</div>}
                </div>
              </div>
            )
          })}
        </div>
      )}

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
        {status === 'partial' && (
          <>
            <div className={styles.metaItem}>
              <span>📋</span>
              <span>Completion:</span>
              <span className={styles.metaValue}>
                {questionsAnswered !== undefined && totalQuestions !== undefined
                  ? `${Math.round((questionsAnswered / totalQuestions) * 100)}% of questions answered`
                  : 'Partially answered'}
              </span>
            </div>
            {currentPIO && (
              <div className={styles.metaItem}>
                <span>👤</span>
                <span>PIO:</span>
                <span className={styles.metaValue}>{currentPIO}</span>
              </div>
            )}
            <div className={styles.metaItem}>
              <span>📄</span>
              <span>Documents:</span>
              <span className={styles.metaValue}>{documentsCount || 3} files provided</span>
            </div>
          </>
        )}
        {status === 'transferred' && (
          <>
            <div className={styles.metaItem}>
              <span>⏱️</span>
              <span>Status:</span>
              <span className={styles.metaValue}>Awaiting response from new department</span>
            </div>
            {currentPIO && (
              <div className={styles.metaItem}>
                <span>👤</span>
                <span>New PIO:</span>
                <span className={styles.metaValue}>{currentPIO}</span>
              </div>
            )}
            {daysRemaining !== undefined && (
              <div className={styles.metaItem}>
                <span>📅</span>
                <span>Days Remaining:</span>
                <span className={styles.metaValue}>{daysRemaining} days</span>
              </div>
            )}
          </>
        )}
        {status !== 'answered' && status !== 'partial' && status !== 'transferred' && (
          <>
            <div className={styles.metaItem}>
              <span>⏱️</span>
              <span>Status:</span>
              <span className={styles.metaValue}>
                {status === 'overdue'
                  ? 'Deadline passed'
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
