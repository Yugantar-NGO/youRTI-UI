import { memo, SVGProps } from 'react'

/**
 * Icon component props
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels
   */
  size?: number
  /**
   * Icon color (defaults to currentColor)
   */
  color?: string
  /**
   * Optional className for styling
   */
  className?: string
}

/**
 * Base icon wrapper with common props
 */
export const BaseIcon = memo(
  ({
    size = 16,
    color = 'currentColor',
    className = '',
    children,
    viewBox = '0 0 16 16',
    fill = 'none',
    ...props
  }: IconProps & { children: React.ReactNode; viewBox?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      className={className}
      {...props}
    >
      {children}
    </svg>
  )
)

BaseIcon.displayName = 'BaseIcon'
