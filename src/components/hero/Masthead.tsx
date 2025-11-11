import { BaseProps } from '@/types'
import { Container } from '@/components/layout/Container'
import styles from './Masthead.module.css'

interface MastheadProps extends BaseProps {
  title: string
  subtitle?: string
  inverse?: boolean
  edition?: string
}

/**
 * Masthead Component
 *
 * Newspaper-style header banner with title and optional subtitle.
 * Can be inverted (white background with black text) or default (black with white text).
 *
 * @example
 * <Masthead
 *   title="RTI TRANSPARENCY DASHBOARD"
 *   subtitle="Tracking India's Right to Information Requests"
 *   edition="Vol. 2024 | Edition #1247 | Nov 11, 2025"
 * />
 */
export function Masthead({
  title,
  subtitle,
  inverse = false,
  edition,
  className = '',
}: MastheadProps) {
  return (
    <div className={`${inverse ? 'masthead-inverse' : 'masthead'} ${className}`}>
      <Container>
        {edition && <div className={styles.edition}>{edition}</div>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </Container>
    </div>
  )
}
