import { BaseProps } from '@/types'
import { Typography } from '@/components/ui/Typography'
import styles from './ProgressBar.module.css'

interface ProgressBarProps extends BaseProps {
  current: number
  total: number
  label?: string
  variant?: 'success' | 'warning' | 'danger' | 'info'
  showPercentage?: boolean
}

/**
 * ProgressBar Component
 *
 * Visual progress indicator with optional label and percentage.
 * Used in timeline sections to show days elapsed, response progress, etc.
 *
 * @example
 * <ProgressBar
 *   current={12}
 *   total={30}
 *   label="12 of 30 days elapsed (40%)"
 *   variant="warning"
 *   showPercentage={true}
 * />
 */
export function ProgressBar({
  current,
  total,
  label,
  variant = 'info',
  showPercentage = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100)
  const displayPercentage = Math.round(percentage)

  return (
    <div className={`${styles.progressBarContainer} ${className}`}>
      {label && (
        <Typography variant="body-text-small" className={styles.label}>
          {label}
        </Typography>
      )}
      <div className={styles.progressBarWrapper}>
        <div className={`${styles.progressBar} ${styles[variant]}`}>
          <div
            className={styles.progressFill}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={label || `${displayPercentage}% complete`}
          />
        </div>
        {showPercentage && (
          <Typography variant="mono-text-small" className={styles.percentage}>
            {displayPercentage}%
          </Typography>
        )}
      </div>
    </div>
  )
}
