import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * User Icon
 */
export const UserIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <circle cx="8" cy="5" r="2.5" stroke={color} strokeWidth="1.5" />
    <path
      d="M3 13c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </BaseIcon>
))

UserIcon.displayName = 'UserIcon'
