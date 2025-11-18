'use client'

import Link from 'next/link'
import { BaseProps } from '@/types'
import { ChevronRight } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import styles from './Breadcrumb.module.css'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps extends BaseProps {
  items: BreadcrumbItem[]
}

/**
 * Breadcrumb Component
 *
 * Displays a hierarchical navigation path with clickable links.
 * The last item is non-clickable representing the current page.
 *
 * @example
 * <Breadcrumb items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Browse', href: '/browse' },
 *   { label: 'RTI Title' }
 * ]} />
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className={`${styles.breadcrumb} ${className}`}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isClickable = item.href && !isLast

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {isClickable ? (
                <Link href={item.href!} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}

              {!isLast && (
                <Icon
                  icon={ChevronRight}
                  size="xs"
                  className={styles.separator}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
