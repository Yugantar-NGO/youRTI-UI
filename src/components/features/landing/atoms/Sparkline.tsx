'use client'

import { useState } from 'react'
import styles from './Sparkline.module.css'

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  className?: string
}

/**
 * Sparkline Component
 *
 * A simple inline line chart visualization for showing trends.
 * Uses SVG for rendering with hover tooltips.
 *
 * @example
 * <Sparkline data={[10, 20, 15, 25, 30]} color="var(--color-accent)" />
 */
export function Sparkline({
  data,
  width = 100,
  height = 32,
  color = 'var(--color-accent)',
  className = ''
}: SparklineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (!data || data.length === 0) {
    return null
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1 // Avoid division by zero

  // Calculate points for the polyline
  const pointsData = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return { x, y, value }
  })

  const points = pointsData.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className={styles.container}>
      <svg
        className={`${styles.sparkline} ${className}`}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
        {pointsData.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={hoveredIndex === index ? color : 'transparent'}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={styles.dataPoint}
          />
        ))}
      </svg>
      {hoveredIndex !== null && (
        <div
          className={styles.tooltip}
          style={{
            left: `${pointsData[hoveredIndex].x}px`,
            top: `${pointsData[hoveredIndex].y - 30}px`
          }}
        >
          {pointsData[hoveredIndex].value.toFixed(1)}
        </div>
      )}
    </div>
  )
}
