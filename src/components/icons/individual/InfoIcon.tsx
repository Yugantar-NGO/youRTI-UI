import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Info Icon
 */
export const InfoIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
    <path d="M8 11V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="5" r="0.5" fill={color} />
  </BaseIcon>
))

InfoIcon.displayName = 'InfoIcon'
