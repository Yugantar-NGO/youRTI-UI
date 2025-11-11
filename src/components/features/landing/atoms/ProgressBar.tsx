import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  percentage: number
  label?: string
  color?: 'success' | 'warning' | 'error' | 'neutral'
  showLabel?: boolean
  className?: string
}

/**
 * ProgressBar Component
 *
 * Visual progress/percentage bar for displaying metrics.
 * Used in department performance visualization.
 *
 * @example
 * <ProgressBar percentage={75} label="Health Dept" color="success" showLabel />
 */
export function ProgressBar({
  percentage,
  label,
  color = 'neutral',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  // Auto-determine color based on percentage if neutral
  const barColor = color === 'neutral' ? getColorFromPercentage(clampedPercentage) : color

  return (
    <div className={`${styles.progressBar} ${className}`}>
      {showLabel && label && <span className={styles.label}>{label}</span>}
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[barColor]}`}
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || `${clampedPercentage}% complete`}
        />
      </div>
      {showLabel && (
        <span className={styles.percentage}>{clampedPercentage}%</span>
      )}
    </div>
  )
}

/**
 * Determine color based on percentage thresholds
 */
function getColorFromPercentage(percentage: number): 'success' | 'warning' | 'error' {
  if (percentage >= 75) return 'success'
  if (percentage >= 50) return 'warning'
  return 'error'
}
