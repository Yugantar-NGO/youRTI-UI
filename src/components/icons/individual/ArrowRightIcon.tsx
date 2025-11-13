import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Arrow Right Icon
 */
export const ArrowRightIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <path
      d="M6 4L10 8L6 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
))

ArrowRightIcon.displayName = 'ArrowRightIcon'
