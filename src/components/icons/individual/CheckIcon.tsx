import { memo } from 'react'
import { BaseIcon, IconProps } from '../BaseIcon'

/**
 * Check Icon
 */
export const CheckIcon = memo(({ size = 16, color = 'currentColor', className = '' }: IconProps) => (
  <BaseIcon size={size} color={color} className={className}>
    <path
      d="M3 8L6.5 11.5L13 5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
))

CheckIcon.displayName = 'CheckIcon'
