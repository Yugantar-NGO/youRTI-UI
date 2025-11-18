import { BaseProps } from '@/types'
import styles from './SectionDivider.module.css'

interface SectionDividerProps extends BaseProps {
  spacing?: 'sm' | 'md' | 'lg'
}

/**
 * SectionDivider Component
 *
 * Visual separator between major sections of the RTI detail page.
 * Uses semantic tokens for consistent spacing.
 *
 * @example
 * <SectionDivider spacing="lg" />
 */
export function SectionDivider({ spacing = 'md', className = '' }: SectionDividerProps) {
  return <div className={`${styles.divider} ${styles[spacing]} ${className}`} aria-hidden="true" />
}
