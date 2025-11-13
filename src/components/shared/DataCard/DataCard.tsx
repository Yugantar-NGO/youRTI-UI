import React, { createContext, useContext, ReactNode, memo } from 'react'
import styles from './DataCard.module.css'

/**
 * DataCard context value
 */
interface DataCardContextValue {
  variant?: 'default' | 'compact' | 'featured'
}

/**
 * DataCard context
 */
const DataCardContext = createContext<DataCardContextValue>({})

/**
 * Base DataCard props
 */
export interface DataCardProps {
  children: ReactNode
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

/**
 * DataCard compound component
 *
 * Reusable card component with compound component pattern for flexibility.
 * Provides Header, Content, Footer, Meta, and Stats subcomponents.
 *
 * @example
 * ```tsx
 * <DataCard variant="featured">
 *   <DataCard.Header>
 *     <DataCard.Title>Big Win Story</DataCard.Title>
 *     <DataCard.Badge>Featured</DataCard.Badge>
 *   </DataCard.Header>
 *   <DataCard.Content>
 *     Story content here...
 *   </DataCard.Content>
 *   <DataCard.Footer>
 *     <DataCard.Meta>
 *       <DataCard.MetaItem icon="Calendar">2 days ago</DataCard.MetaItem>
 *       <DataCard.MetaItem icon="Location">Mumbai</DataCard.MetaItem>
 *     </DataCard.Meta>
 *   </DataCard.Footer>
 * </DataCard>
 * ```
 */
const DataCardRoot = ({ children, variant = 'default', className = '' }: DataCardProps) => {
  const contextValue = { variant }

  return (
    <DataCardContext.Provider value={contextValue}>
      <div className={`${styles.card} ${styles[variant]} ${className}`}>
        {children}
      </div>
    </DataCardContext.Provider>
  )
}

DataCardRoot.displayName = 'DataCard'

/**
 * DataCard Header
 */
const Header = memo(({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`${styles.header} ${className}`}>{children}</div>
))

Header.displayName = 'DataCard.Header'

/**
 * DataCard Title
 */
const Title = memo(({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h3 className={`${styles.title} ${className}`}>{children}</h3>
))

Title.displayName = 'DataCard.Title'

/**
 * DataCard Subtitle
 */
const Subtitle = memo(({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`${styles.subtitle} ${className}`}>{children}</p>
))

Subtitle.displayName = 'DataCard.Subtitle'

/**
 * DataCard Badge
 */
const Badge = memo(({ children, className = '', variant = 'default' }: {
  children: ReactNode
  className?: string
  variant?: 'default' | 'success' | 'warning' | 'error'
}) => (
  <span className={`${styles.badge} ${styles[`badge-${variant}`]} ${className}`}>
    {children}
  </span>
))

Badge.displayName = 'DataCard.Badge'

/**
 * DataCard Content
 */
const Content = memo(({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`${styles.content} ${className}`}>{children}</div>
))

Content.displayName = 'DataCard.Content'

/**
 * DataCard Footer
 */
const Footer = memo(({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`${styles.footer} ${className}`}>{children}</div>
))

Footer.displayName = 'DataCard.Footer'

/**
 * DataCard Meta container
 */
const Meta = memo(({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`${styles.meta} ${className}`}>{children}</div>
))

Meta.displayName = 'DataCard.Meta'

/**
 * DataCard MetaItem
 */
const MetaItem = memo(({
  children,
  icon,
  className = ''
}: {
  children: ReactNode
  icon?: ReactNode
  className?: string
}) => (
  <div className={`${styles.metaItem} ${className}`}>
    {icon && <span className={styles.metaIcon}>{icon}</span>}
    <span className={styles.metaText}>{children}</span>
  </div>
))

MetaItem.displayName = 'DataCard.MetaItem'

/**
 * DataCard Stats container
 */
const Stats = memo(({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`${styles.stats} ${className}`}>{children}</div>
))

Stats.displayName = 'DataCard.Stats'

/**
 * DataCard StatItem
 */
const StatItem = memo(({
  label,
  value,
  className = ''
}: {
  label: string
  value: string | number
  className?: string
}) => (
  <div className={`${styles.statItem} ${className}`}>
    <div className={styles.statValue}>{value}</div>
    <div className={styles.statLabel}>{label}</div>
  </div>
))

StatItem.displayName = 'DataCard.StatItem'

/**
 * DataCard Actions container
 */
const Actions = memo(({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`${styles.actions} ${className}`}>{children}</div>
))

Actions.displayName = 'DataCard.Actions'

// Compose the DataCard with all subcomponents
export const DataCard = Object.assign(memo(DataCardRoot), {
  Header,
  Title,
  Subtitle,
  Badge,
  Content,
  Footer,
  Meta,
  MetaItem,
  Stats,
  StatItem,
  Actions,
})
