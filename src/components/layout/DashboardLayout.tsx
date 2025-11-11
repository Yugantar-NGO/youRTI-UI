'use client'

import { ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'
import { CompactMasthead } from './CompactMasthead'
import styles from './DashboardLayout.module.css'

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

/**
 * DashboardLayout Component
 *
 * Main layout container combining sidebar, compact header, and content area.
 * Provides responsive behavior and sidebar toggle functionality.
 *
 * @example
 * <DashboardLayout title="RTI Dashboard" subtitle="Tracking Accountability">
 *   <YourPageContent />
 * </DashboardLayout>
 */
export function DashboardLayout({
  children,
  title = 'RTI Dashboard',
  subtitle = 'Tracking Government Accountability',
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className={styles.main}>
        {/* Compact Header */}
        <CompactMasthead
          title={title}
          subtitle={subtitle}
          onMenuClick={toggleSidebar}
        />

        {/* Page Content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
