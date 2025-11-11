/**
 * StoriesThatChanged Organism
 * Impact stories section with 2x3 grid of win cards and filter pills
 */

'use client'

import React, { useState } from 'react'
import { WinCard } from '../molecules/WinCard'
import { FilterPill } from '../atoms/FilterPill'
import type { WinStory, WinType } from '@/types/dashboard'
import styles from './StoriesThatChanged.module.css'

interface StoriesThatChangedProps {
  stories: WinStory[]
}

const filterOptions: { label: string; value: WinType | 'all' }[] = [
  { label: 'All wins', value: 'all' },
  { label: 'Data released', value: 'data_released' },
  { label: 'Money sanctioned', value: 'money_sanctioned' },
  { label: 'Services fixed', value: 'services_fixed' },
  { label: 'Policy changed', value: 'policy_changed' }
]

export const StoriesThatChanged: React.FC<StoriesThatChangedProps> = ({ stories }) => {
  const [activeFilter, setActiveFilter] = useState<WinType | 'all'>('all')

  const filteredStories =
    activeFilter === 'all'
      ? stories
      : stories.filter((story) => story.winType === activeFilter)

  return (
    <section className={styles.storiesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Stories That Changed Something</h2>
            <p className={styles.subtitle}>
              RTI requests that made a real difference
            </p>
          </div>
          <div className={styles.filters}>
            {filterOptions.map((option) => (
              <FilterPill
                key={option.value}
                label={option.label}
                active={activeFilter === option.value}
                onClick={() => setActiveFilter(option.value)}
              />
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filteredStories.slice(0, 6).map((story) => (
            <WinCard key={story.id} story={story} />
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className={styles.emptyState}>
            <p>No stories found for this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
