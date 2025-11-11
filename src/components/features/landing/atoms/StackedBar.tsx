import styles from './StackedBar.module.css'

interface StackedSegment {
  label: string
  value: number
  color: string
}

interface StackedBarProps {
  data: Array<{ label: string; segments: StackedSegment[] }>
  height?: number
  className?: string
}

/**
 * StackedBar Component
 *
 * A stacked horizontal bar chart showing multiple segments.
 * Useful for showing composition and categories.
 *
 * @example
 * <StackedBar data={[{
 *   label: 'Q1',
 *   segments: [
 *     { label: 'Approved', value: 30, color: '#16A34A' },
 *     { label: 'Pending', value: 20, color: '#FACC15' }
 *   ]
 * }]} />
 */
export function StackedBar({
  data,
  height = 150,
  className = ''
}: StackedBarProps) {
  if (!data || data.length === 0) {
    return null
  }

  return (
    <div className={`${styles.stackedBar} ${className}`} style={{ height: `${height}px` }}>
      {data.map((item, index) => {
        const total = item.segments.reduce((sum, seg) => sum + seg.value, 0)

        return (
          <div key={index} className={styles.barGroup}>
            <div className={styles.barLabel}>{item.label}</div>
            <div className={styles.barWrapper}>
              {item.segments.map((segment, segIndex) => {
                const percentage = (segment.value / total) * 100

                return (
                  <div
                    key={segIndex}
                    className={styles.segment}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: segment.color
                    }}
                    title={`${segment.label}: ${segment.value}`}
                  >
                    {percentage > 10 && (
                      <span className={styles.segmentValue}>{segment.value}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
