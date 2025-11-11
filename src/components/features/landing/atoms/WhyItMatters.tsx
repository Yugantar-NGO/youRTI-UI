/**
 * WhyItMatters Atom
 * Component displaying bullet points explaining why a case matters
 */

import React from 'react'
import styles from './WhyItMatters.module.css'

interface WhyItMattersProps {
  reasons: string[]
}

export const WhyItMatters: React.FC<WhyItMattersProps> = ({ reasons }) => {
  return (
    <div className={styles.whyItMatters}>
      <h4 className={styles.title}>Why this matters</h4>
      <ul className={styles.list}>
        {reasons.map((reason, index) => (
          <li key={index} className={styles.item}>
            {reason}
          </li>
        ))}
      </ul>
    </div>
  )
}
