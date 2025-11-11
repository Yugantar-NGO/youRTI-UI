import { LucideIcon, LucideProps } from 'lucide-react'

export type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'

interface IconProps extends Omit<LucideProps, 'size'> {
  icon: LucideIcon
  size?: IconSize
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  base: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
}

/**
 * Icon Component
 *
 * Wrapper around Lucide React icons for consistent sizing and styling.
 * Automatically theme-aware through CSS custom properties.
 *
 * @example
 * import { FileText } from 'lucide-react'
 * <Icon icon={FileText} size="lg" />
 */
export function Icon({ icon: IconComponent, size = 'base', ...props }: IconProps) {
  return <IconComponent size={sizeMap[size]} {...props} />
}
