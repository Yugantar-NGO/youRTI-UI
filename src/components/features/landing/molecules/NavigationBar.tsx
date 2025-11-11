import { NavigationItem } from '@/types'
import { NavigationCard } from '../atoms/NavigationCard'
import styles from './NavigationBar.module.css'

interface NavigationBarProps {
  items: NavigationItem[]
  className?: string
}

/**
 * NavigationBar Component
 *
 * Displays hero navigation with 6 clickable cards.
 * Responsive grid layout that wraps on smaller screens.
 *
 * @example
 * <NavigationBar items={[...]} />
 */
export function NavigationBar({ items, className = '' }: NavigationBarProps) {
  return (
    <div className={`${styles.navigationBar} ${className}`}>
      {items.map((item) => (
        <NavigationCard key={item.id} item={item} />
      ))}
    </div>
  )
}
