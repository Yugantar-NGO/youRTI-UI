import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Clock Icon
 */
export const ClockIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
    <path d="M8 5v3l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </BaseIcon>
))

ClockIcon.displayName = 'ClockIcon'
