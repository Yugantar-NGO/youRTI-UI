import styles from './ImpactMeter.module.css'

interface ImpactMeterProps {
  score: number // 0-100
  label?: string
  className?: string
}

/**
 * ImpactMeter Component
 *
 * A radial gauge (donut chart) showing the RTI Health Score.
 * Displays a percentage score with color coding.
 *
 * @example
 * <ImpactMeter score={78} label="RTI Health Score" />
 */
export function ImpactMeter({
  score,
  label = 'RTI Health Score',
  className = ''
}: ImpactMeterProps) {
  // Clamp score between 0 and 100
  const clampedScore = Math.max(0, Math.min(100, score))

  // Calculate the arc path for the donut
  const radius = 80
  const strokeWidth = 16
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference

  // Determine color based on score
  const getColor = () => {
    if (clampedScore >= 75) return '#16A34A' // green
    if (clampedScore >= 50) return '#FACC15' // yellow
    return '#EF4444' // red
  }

  const getLabel = () => {
    if (clampedScore >= 75) return 'Excellent'
    if (clampedScore >= 50) return 'Good'
    return 'Needs Attention'
  }

  return (
    <div className={`${styles.impactMeter} ${className}`}>
      <div className={styles.gaugeContainer}>
        <svg
          height={radius * 2}
          width={radius * 2}
          className={styles.gauge}
        >
          {/* Background circle */}
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={getColor()}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={styles.progressCircle}
          />
        </svg>

        <div className={styles.scoreContent}>
          <div className={styles.score}>{clampedScore}</div>
          <div className={styles.scoreLabel}>{getLabel()}</div>
        </div>
      </div>

      <div className={styles.meterLabel}>{label}</div>
    </div>
  )
}
