/**
 * ImpactMetric Atom
 * Icon + metric pair displaying impact data
 */

import React from 'react'
import styles from './ImpactMetric.module.css'

interface ImpactMetricProps {
  icon: string
  value: string
  label: string
}

export const ImpactMetric: React.FC<ImpactMetricProps> = ({ icon, value, label }) => {
  return (
    <div className={styles.impactMetric}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  )
}
