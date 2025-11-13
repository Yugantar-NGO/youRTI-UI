import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Alert Icon
 */
export const AlertIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
    <path d="M8 5v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.5" fill={color} />
  </BaseIcon>
))

AlertIcon.displayName = 'AlertIcon'
