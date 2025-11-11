/**
 * NewspaperLayout Component
 *
 * Three-column newspaper-style layout that responds gracefully:
 * - Mobile: Single column (stacked vertically)
 * - Tablet: Two columns
 * - Desktop: Three columns
 */

import { ReactNode } from 'react'
import styles from './NewspaperLayout.module.css'

interface NewspaperLayoutProps {
  children: ReactNode
  className?: string
}

interface ColumnProps {
  children: ReactNode
  className?: string
}

export function NewspaperLayout({ children, className = '' }: NewspaperLayoutProps) {
  return (
    <div className={`${styles.newspaperLayout} ${className}`}>
      {children}
    </div>
  )
}

export function LeftColumn({ children, className = '' }: ColumnProps) {
  return <div className={`${styles.leftColumn} ${className}`}>{children}</div>
}

export function CenterColumn({ children, className = '' }: ColumnProps) {
  return <div className={`${styles.centerColumn} ${className}`}>{children}</div>
}

export function RightColumn({ children, className = '' }: ColumnProps) {
  return <div className={`${styles.rightColumn} ${className}`}>{children}</div>
}

export function FullWidthSection({ children, className = '' }: ColumnProps) {
  return <div className={`${styles.fullWidth} ${className}`}>{children}</div>
}
