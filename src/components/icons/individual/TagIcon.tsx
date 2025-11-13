import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Tag Icon
 */
export const TagIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <path
      d="M2 7.5L7.5 2L14 8.5L8.5 14L2 7.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="6" r="0.75" fill={color} />
  </BaseIcon>
))

TagIcon.displayName = 'TagIcon'
