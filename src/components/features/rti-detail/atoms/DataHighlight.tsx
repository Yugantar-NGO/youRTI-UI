import { BaseProps } from '@/types'
import styles from './DataHighlight.module.css'

type HighlightType = 'amount' | 'multiplier' | 'entity' | 'duration' | 'negative'

interface DataHighlightProps extends BaseProps {
  type: HighlightType
  children: React.ReactNode
}

/**
 * DataHighlight Component
 *
 * Styled inline text highlighting for different data types in findings.
 *
 * @example
 * <DataHighlight type="amount">₹12.4 Crore</DataHighlight>
 * <DataHighlight type="multiplier">3x</DataHighlight>
 * <DataHighlight type="entity">ABC Construction Ltd</DataHighlight>
 */
export function DataHighlight({ type, children, className = '' }: DataHighlightProps) {
  const typeStyles = {
    amount: styles.dataAmount,
    multiplier: styles.dataMultiplier,
    entity: styles.dataEntity,
    duration: styles.dataDuration,
    negative: styles.dataNegative,
  }

  return <span className={`${typeStyles[type]} ${className}`}>{children}</span>
}