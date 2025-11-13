/**
 * Icon Factory - Centralized icon management
 *
 * Provides all icons in the application through a factory pattern.
 * All icons are memoized for performance and split into individual files for maintainability.
 */

import { CalendarIcon } from './individual/CalendarIcon'
import { TagIcon } from './individual/TagIcon'
import { BuildingIcon } from './individual/BuildingIcon'
import { ArrowRightIcon } from './individual/ArrowRightIcon'
import { ClockIcon } from './individual/ClockIcon'
import { LocationIcon } from './individual/LocationIcon'
import { UserIcon } from './individual/UserIcon'
import { CheckIcon } from './individual/CheckIcon'
import { AlertIcon } from './individual/AlertIcon'
import { InfoIcon } from './individual/InfoIcon'
import { IconProps } from './BaseIcon'

// Re-export all icons
export { CalendarIcon } from './individual/CalendarIcon'
export { TagIcon } from './individual/TagIcon'
export { BuildingIcon } from './individual/BuildingIcon'
export { ArrowRightIcon } from './individual/ArrowRightIcon'
export { ClockIcon } from './individual/ClockIcon'
export { LocationIcon } from './individual/LocationIcon'
export { UserIcon } from './individual/UserIcon'
export { CheckIcon } from './individual/CheckIcon'
export { AlertIcon } from './individual/AlertIcon'
export { InfoIcon } from './individual/InfoIcon'

// Re-export base icon and props
export { BaseIcon, type IconProps } from './BaseIcon'

/**
 * Icon Factory - Map of all available icons
 *
 * Provides centralized access to all icons in the application.
 * All icons are memoized for performance.
 */
export const IconFactory = {
  Calendar: CalendarIcon,
  Tag: TagIcon,
  Building: BuildingIcon,
  ArrowRight: ArrowRightIcon,
  Clock: ClockIcon,
  Location: LocationIcon,
  User: UserIcon,
  Check: CheckIcon,
  Alert: AlertIcon,
  Info: InfoIcon,
} as const

/**
 * Icon names type
 */
export type IconName = keyof typeof IconFactory

/**
 * Get an icon component by name
 *
 * @param name - Icon name
 * @returns Icon component
 *
 * @example
 * ```tsx
 * const Icon = getIcon('Calendar')
 * return <Icon size={20} color="blue" />
 * ```
 */
export function getIcon(name: IconName) {
  return IconFactory[name]
}

/**
 * Dynamic Icon component
 *
 * Renders an icon by name with props.
 *
 * @example
 * ```tsx
 * <Icon name="Calendar" size={20} color="blue" />
 * ```
 */
export function Icon({ name, size, color, className }: IconProps & { name: IconName }) {
  const IconComponent = getIcon(name)
  return <IconComponent size={size} color={color} className={className} />
}
