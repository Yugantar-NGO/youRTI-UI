import { memo, SVGProps } from 'react'

/**
 * Icon component props
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels
   */
  size?: number
  /**
   * Icon color (defaults to currentColor)
   */
  color?: string
  /**
   * Optional className for styling
   */
  className?: string
}

/**
 * Base icon wrapper with common props
 */
const BaseIcon = memo(
  ({
    size = 16,
    color = 'currentColor',
    className = '',
    children,
    viewBox = '0 0 16 16',
    fill = 'none',
    ...props
  }: IconProps & { children: React.ReactNode; viewBox?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      className={className}
      {...props}
    >
      {children}
    </svg>
  )
)

BaseIcon.displayName = 'BaseIcon'

/**
 * Calendar Icon
 */
export const CalendarIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
    <rect x="2" y="3" width="12" height="11" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M2 6h12" stroke={color} strokeWidth="1.5" />
    <path d="M5 1v3M11 1v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </BaseIcon>
))

CalendarIcon.displayName = 'CalendarIcon'

/**
 * Tag Icon
 */
export const TagIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
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

/**
 * Building Icon
 */
export const BuildingIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
    <rect x="3" y="2" width="10" height="12" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M3 14h10" stroke={color} strokeWidth="1.5" />
    <rect x="6" y="5" width="1.5" height="1.5" fill={color} />
    <rect x="8.5" y="5" width="1.5" height="1.5" fill={color} />
    <rect x="6" y="8" width="1.5" height="1.5" fill={color} />
    <rect x="8.5" y="8" width="1.5" height="1.5" fill={color} />
  </BaseIcon>
))

BuildingIcon.displayName = 'BuildingIcon'

/**
 * Arrow Right Icon
 */
export const ArrowRightIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
    <path
      d="M6 4L10 8L6 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
))

ArrowRightIcon.displayName = 'ArrowRightIcon'

/**
 * Clock Icon
 */
export const ClockIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
    <path d="M8 5v3l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </BaseIcon>
))

ClockIcon.displayName = 'ClockIcon'

/**
 * Location Icon
 */
export const LocationIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
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

/**
 * User Icon
 */
export const UserIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
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

/**
 * Check Icon
 */
export const CheckIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
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

/**
 * Alert Icon
 */
export const AlertIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
    <path d="M8 5v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.5" fill={color} />
  </BaseIcon>
))

AlertIcon.displayName = 'AlertIcon'

/**
 * Info Icon
 */
export const InfoIcon = memo(({ size = 16, color = 'currentColor', className = '', ...props }: IconProps) => (
  <BaseIcon size={size} color={color} className={className} {...props}>
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
    <path d="M8 11V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="5" r="0.5" fill={color} />
  </BaseIcon>
))

InfoIcon.displayName = 'InfoIcon'

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
export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const IconComponent = getIcon(name)
  return <IconComponent {...props} />
}
