import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Building Icon
 */
export const BuildingIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <rect x="3" y="2" width="10" height="12" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M3 14h10" stroke={color} strokeWidth="1.5" />
    <rect x="6" y="5" width="1.5" height="1.5" fill={color} />
    <rect x="8.5" y="5" width="1.5" height="1.5" fill={color} />
    <rect x="6" y="8" width="1.5" height="1.5" fill={color} />
    <rect x="8.5" y="8" width="1.5" height="1.5" fill={color} />
  </BaseIcon>
))

BuildingIcon.displayName = 'BuildingIcon'
