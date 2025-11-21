'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import {
  Home,
  FileText,
  BarChart3,
  MapPin,
  Building2,
  TrendingUp,
  Users,
  Settings,
} from '@/lib/icons'
import { LucideIcon } from 'lucide-react'
import styles from './Sidebar.module.css'

interface NavItem {
  label: string
  icon: LucideIcon
  href?: string
  active?: boolean
  badge?: string | number
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

const navigationItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, href: '/', active: true },
  { label: 'All RTIs', icon: FileText, href: '/rtis' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Regional', icon: MapPin, href: '/regional' },
  { label: 'Departments', icon: Building2, href: '/departments' },
  { label: 'Trending', icon: TrendingUp, href: '/trending', badge: '5' },
  { label: 'Contributors', icon: Users, href: '/contributors' },
  { label: 'Settings', icon: Settings, href: '/settings' },
]

/**
 * Sidebar Component
 *
 * Navigation sidebar for dashboard layout.
 * Supports collapsible state and active indicators.
 *
 * @example
 * <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 */
export function Sidebar({ isOpen = true, onClose, className = '' }: SidebarProps) {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${className}`}
      >
        {/* Branding */}
        <div className={styles.branding}>
          <div className={styles.logo}>
            <FileText size={24} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>youRTI</span>
            <span className={styles.brandTagline}>Transparency Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navigationItems.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerText}>
            <span className={styles.footerLabel}>© 2025 Yugantar NGO</span>
            <span className={styles.footerVersion}>v1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  )
}

/**
 * SidebarItem Component
 */
function SidebarItem({ item }: { item: NavItem }) {
  const { label, icon, active, badge } = item

  return (
    <Link
      href={item.href || '/'}
      className={`${styles.navItem} ${active ? styles.active : ''}`}
    >
      <Icon icon={icon} size="base" />
      <span className={styles.navLabel}>{label}</span>
      {badge && <span className={styles.badge}>{badge}</span>}
    </Link>
  )
}
