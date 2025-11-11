/**
 * CaseCard Molecule
 * Pending case card with status borders and urgency indicators
 */

import React from 'react'
import Link from 'next/link'
import { WhyItMatters } from '../atoms/WhyItMatters'
import type { PendingCase } from '@/types/dashboard'
import styles from './CaseCard.module.css'

interface CaseCardProps {
  pendingCase: PendingCase
}

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pending'
    case 'first_appeal':
      return 'First Appeal'
    case 'second_appeal':
      return 'Second Appeal'
    default:
      return 'Unknown'
  }
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'var(--color-status-pending)'
    case 'first_appeal':
      return 'var(--color-status-warning)'
    case 'second_appeal':
      return 'var(--color-status-overdue)'
    default:
      return 'var(--color-status-neutral)'
  }
}

export const CaseCard: React.FC<CaseCardProps> = ({ pendingCase }) => {
  return (
    <Link
      href={pendingCase.link}
      className={styles.caseCard}
      style={{
        borderTopColor: getStatusColor(pendingCase.status)
      }}
    >
      <div className={styles.header}>
        <div className={styles.statusRow}>
          <span
            className={styles.statusBadge}
            style={{
              backgroundColor: getStatusColor(pendingCase.status),
              color: 'white'
            }}
          >
            {getStatusLabel(pendingCase.status)}
          </span>
          <span className={styles.urgency}>
            {pendingCase.daysOverdue > 0
              ? `${pendingCase.daysOverdue} days overdue`
              : `${pendingCase.daysElapsed} days elapsed`}
          </span>
        </div>
        <h3 className={styles.title}>{pendingCase.title}</h3>
      </div>

      <div className={styles.content}>
        <p className={styles.question}>{pendingCase.question}</p>
      </div>

      <WhyItMatters reasons={pendingCase.whyItMatters} />

      <div className={styles.footer}>
        <span className={styles.department}>{pendingCase.department}</span>
        <span className={styles.location}>{pendingCase.state}</span>
      </div>
    </Link>
  )
}
