import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Location Icon
 */
export const LocationIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <path
      d="M8 2C6 2 4 3.5 4 5.5C4 8 8 14 8 14C8 14 12 8 12 5.5C12 3.5 10 2 8 2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="5.5" r="1.5" fill={color} />
  </BaseIcon>
))

LocationIcon.displayName = 'LocationIcon'
