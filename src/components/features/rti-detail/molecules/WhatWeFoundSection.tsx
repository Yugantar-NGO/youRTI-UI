import { BaseProps } from '@/types'
import { ExtractedEntity } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import styles from './WhatWeFoundSection.module.css'

interface WhatWeFoundSectionProps extends BaseProps {
  extractedEntities: ExtractedEntity
}

/**
 * WhatWeFoundSection Component
 *
 * Displays extracted entities (amounts, officials, vendors, dates, locations)
 * from the RTI response. Only renders categories that have data.
 *
 * @example
 * <WhatWeFoundSection
 *   extractedEntities={{
 *     amounts: [{ value: '₹2.3 Cr', description: 'Total contract' }],
 *     officials: [{ name: 'John Doe', designation: 'Engineer' }]
 *   }}
 * />
 */
export function WhatWeFoundSection({
  extractedEntities,
  className = '',
}: WhatWeFoundSectionProps) {
  const categories = [
    {
      key: 'amounts',
      label: 'Amounts',
      icon: '💰',
      data: extractedEntities.amounts,
      renderItem: (item: { value: string; description: string }) => (
        <div key={item.value} className={styles.item}>
          <span className={styles.itemValue}>{item.value}</span>
          <span className={styles.itemDescription}>{item.description}</span>
        </div>
      ),
    },
    {
      key: 'officials',
      label: 'Officials',
      icon: '👤',
      data: extractedEntities.officials,
      renderItem: (item: { name: string; designation: string }) => (
        <div key={item.name} className={styles.item}>
          <span className={styles.itemValue}>{item.name}</span>
          <span className={styles.itemDescription}>{item.designation}</span>
        </div>
      ),
    },
    {
      key: 'vendors',
      label: 'Vendors',
      icon: '🏢',
      data: extractedEntities.vendors,
      renderItem: (item: { name: string; type?: string }) => (
        <div key={item.name} className={styles.item}>
          <span className={styles.itemValue}>{item.name}</span>
          {item.type && <span className={styles.itemDescription}>{item.type}</span>}
        </div>
      ),
    },
    {
      key: 'dates',
      label: 'Dates',
      icon: '📅',
      data: extractedEntities.dates,
      renderItem: (item: { date: string; description: string }) => (
        <div key={item.date} className={styles.item}>
          <span className={styles.itemValue}>{item.date}</span>
          <span className={styles.itemDescription}>{item.description}</span>
        </div>
      ),
    },
    {
      key: 'locations',
      label: 'Locations',
      icon: '📍',
      data: extractedEntities.locations,
      renderItem: (item: { name: string; description?: string }) => (
        <div key={item.name} className={styles.item}>
          <span className={styles.itemValue}>{item.name}</span>
          {item.description && <span className={styles.itemDescription}>{item.description}</span>}
        </div>
      ),
    },
  ]

  // Filter categories that have data
  const visibleCategories = categories.filter((cat) => cat.data && cat.data.length > 0)

  if (visibleCategories.length === 0) {
    return null
  }

  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <Typography variant="headline-small" as="h2" className={styles.header}>
        WHAT WE FOUND
      </Typography>

      {/* Categories */}
      <div className={styles.categories}>
        {visibleCategories.map((category) => (
          <div key={category.key} className={styles.category}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryIcon}>{category.icon}</span>
              <Typography variant="label" className={styles.categoryLabel}>
                {category.label}
              </Typography>
            </div>
            <div className={styles.categoryItems}>
              {category.data!.map((item) => category.renderItem(item as any))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
