import { BaseProps, TypographyVariant } from '@/types'

interface TypographyProps extends BaseProps {
  variant?: TypographyVariant
  as?: keyof JSX.IntrinsicElements
  align?: 'left' | 'center' | 'right'
}

/**
 * Typography Component
 *
 * Renders text with newspaper-style typography variants.
 * Supports semantic HTML elements and multiple text styles.
 *
 * @example
 * <Typography variant="headline-large" as="h1">
 *   RTI Dashboard
 * </Typography>
 */
export function Typography({
  variant = 'body-text',
  as: Component = 'p',
  align,
  className = '',
  children,
}: TypographyProps) {
  const alignClass = align ? `text-${align}` : ''
  const classes = [variant, alignClass, className].filter(Boolean).join(' ')

  return <Component className={classes}>{children}</Component>
}

// Convenience components for common patterns
export function Headline({ children, className = '' }: BaseProps) {
  return (
    <Typography variant="headline-large" as="h1" className={className}>
      {children}
    </Typography>
  )
}

export function Subheadline({ children, className = '' }: BaseProps) {
  return (
    <Typography variant="headline-medium" as="h2" className={className}>
      {children}
    </Typography>
  )
}

export function SectionHeader({
  children,
  meta,
  className = '',
}: BaseProps & { meta?: string }) {
  if (meta) {
    return (
      <div className={`section-header-with-meta ${className}`}>
        <h2 className="section-header">{children}</h2>
        <span className="section-meta">{meta}</span>
      </div>
    )
  }

  return (
    <Typography variant="headline-medium" as="h2" className={`section-header ${className}`}>
      {children}
    </Typography>
  )
}

export function Body({ children, className = '' }: BaseProps) {
  return (
    <Typography variant="body-text" className={className}>
      {children}
    </Typography>
  )
}

export function Byline({ children, className = '' }: BaseProps) {
  return (
    <Typography variant="byline" as="p" className={className}>
      {children}
    </Typography>
  )
}

export function Metadata({ children, className = '' }: BaseProps) {
  return (
    <Typography variant="metadata" as="span" className={className}>
      {children}
    </Typography>
  )
}

export function Kicker({ children, className = '' }: BaseProps) {
  return (
    <p className={`kicker ${className}`}>{children}</p>
  )
}

export function Deck({ children, className = '' }: BaseProps) {
  return (
    <p className={`deck ${className}`}>{children}</p>
  )
}

export function PullQuote({ children, className = '' }: BaseProps) {
  return (
    <blockquote className={`pull-quote ${className}`}>{children}</blockquote>
  )
}
