import { BaseProps } from '@/types'
import styles from './Card.module.css'

interface CardProps extends BaseProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  as?: keyof JSX.IntrinsicElements
}

/**
 * Card Component
 *
 * Flexible container component using semantic tokens.
 * Theme-agnostic and works with any theme.
 *
 * @example
 * <Card variant="elevated" padding="lg">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 */
export function Card({
  variant = 'default',
  padding = 'md',
  interactive = false,
  as: Component = 'div',
  className = '',
  children,
}: CardProps) {
  const classes = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}

/**
 * CardHeader Component
 *
 * Standard header for card content with optional icon.
 */
export function CardHeader({ children, className = '' }: BaseProps) {
  return <div className={`${styles.cardHeader} ${className}`}>{children}</div>
}

/**
 * CardTitle Component
 */
export function CardTitle({ children, className = '' }: BaseProps) {
  return <h3 className={`${styles.cardTitle} ${className}`}>{children}</h3>
}

/**
 * CardContent Component
 */
export function CardContent({ children, className = '' }: BaseProps) {
  return <div className={`${styles.cardContent} ${className}`}>{children}</div>
}

/**
 * CardFooter Component
 */
export function CardFooter({ children, className = '' }: BaseProps) {
  return <div className={`${styles.cardFooter} ${className}`}>{children}</div>
}
