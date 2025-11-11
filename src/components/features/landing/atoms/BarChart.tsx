import styles from './BarChart.module.css'

interface BarChartProps {
  data: Array<{ label: string; value: number }>
  maxValue?: number
  height?: number
  color?: string
  className?: string
}

/**
 * BarChart Component
 *
 * A simple horizontal bar chart visualization.
 * Uses CSS for bar rendering.
 *
 * @example
 * <BarChart data={[{label: 'Jan', value: 25}, {label: 'Feb', value: 30}]} />
 */
export function BarChart({
  data,
  maxValue,
  height = 200,
  color = 'var(--color-accent)',
  className = ''
}: BarChartProps) {
  if (!data || data.length === 0) {
    return null
  }

  const max = maxValue || Math.max(...data.map(d => d.value))

  return (
    <div className={`${styles.barChart} ${className}`} style={{ height: `${height}px` }}>
      {data.map((item, index) => {
        const percentage = (item.value / max) * 100

        return (
          <div key={index} className={styles.barGroup}>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: color
                }}
              >
                <span className={styles.barValue}>{item.value}</span>
              </div>
            </div>
            <div className={styles.barLabel}>{item.label}</div>
          </div>
        )
      })}
    </div>
  )
}
