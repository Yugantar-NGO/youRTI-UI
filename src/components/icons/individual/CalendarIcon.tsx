import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Calendar Icon
 */
export const CalendarIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <rect x="2" y="3" width="12" height="11" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M2 6h12" stroke={color} strokeWidth="1.5" />
    <path d="M5 1v3M11 1v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </BaseIcon>
))

CalendarIcon.displayName = 'CalendarIcon'
