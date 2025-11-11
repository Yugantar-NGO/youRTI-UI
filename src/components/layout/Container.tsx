import { BaseProps } from '@/types'

interface ContainerProps extends BaseProps {
  size?: 'default' | 'wide' | 'narrow' | 'fluid'
  as?: keyof JSX.IntrinsicElements
}

/**
 * Container Component
 *
 * Provides consistent max-width and horizontal padding for content.
 * Supports multiple size variants for different layout needs.
 *
 * @example
 * <Container size="narrow">
 *   <h1>Content goes here</h1>
 * </Container>
 */
export function Container({
  size = 'default',
  as: Component = 'div',
  className = '',
  children,
}: ContainerProps) {
  const sizeClass =
    size === 'default' ? 'container' : `container-${size}`

  const classes = [sizeClass, className].filter(Boolean).join(' ')

  return <Component className={classes}>{children}</Component>
}
