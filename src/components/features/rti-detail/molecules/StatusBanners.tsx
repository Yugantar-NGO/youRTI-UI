'use client'

import { BaseProps, RTIStatus } from '@/types'
import styles from './StatusBanners.module.css'

interface StatusBannerProps extends BaseProps {
  status: RTIStatus
  message: string
  details?: string
  transferredFrom?: string
  transferredTo?: string
}

/**
 * StatusBanners Component
 *
 * Displays prominent status-specific banner messages at the top of main content.
 * Used for overdue, partial, and transferred statuses.
 *
 * @example
 * <StatusBanner status="overdue" message="..." />
 */
export function StatusBanner({
  status,
  message,
  details,
  transferredFrom,
  transferredTo,
  className = '',
}: StatusBannerProps) {
  if (status === 'answered' || status === 'pending') {
    // No banner needed for these statuses
    return null
  }

  const bannerConfig = {
    overdue: {
      icon: '⚠️',
      title: 'Response Overdue',
      gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
      border: '#EF4444',
      iconBg: '#EF4444',
      titleColor: '#991B1B',
      textColor: '#B91C1C',
    },
    partial: {
      icon: '⚠️',
      title: 'Partial Response Received',
      gradient: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
      border: '#F97316',
      iconBg: '#F97316',
      titleColor: '#9A3412',
      textColor: '#C2410C',
    },
    transferred: {
      icon: '🔄',
      title: 'RTI Transferred to Appropriate Authority',
      gradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
      border: '#8B5CF6',
      iconBg: '#8B5CF6',
      titleColor: '#5B21B6',
      textColor: '#6B21A8',
    },
  }

  const config = bannerConfig[status as 'overdue' | 'partial' | 'transferred']

  return (
    <div
      className={`${styles.banner} ${className}`}
      style={{
        background: config.gradient,
        borderColor: config.border,
      }}
    >
      <div className={styles.icon} style={{ background: config.iconBg }}>
        {config.icon}
      </div>
      <div className={styles.content}>
        <div className={styles.title} style={{ color: config.titleColor }}>
          {config.title}
        </div>
        <div className={styles.text} style={{ color: config.textColor }}>
          {message}
        </div>
        {details && (
          <div className={styles.details} style={{ color: config.textColor }}>
            {details}
          </div>
        )}
        {status === 'transferred' && transferredFrom && transferredTo && (
          <div className={styles.transferInfo}>
            <span className={styles.transferLabel}>From:</span>
            <span className={styles.transferValue}>{transferredFrom}</span>
            <span className={styles.transferArrow}>→</span>
            <span className={styles.transferLabel}>To:</span>
            <span className={styles.transferValue}>{transferredTo}</span>
          </div>
        )}
      </div>
    </div>
  )
}
