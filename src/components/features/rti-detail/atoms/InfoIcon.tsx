'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './InfoIcon.module.css'

interface InfoIconProps {
  tooltip: string
  className?: string
}

/**
 * InfoIcon Component
 *
 * A small 'i' information icon that displays a tooltip on click.
 * Used to explain what different sections are showing.
 *
 * @example
 * <InfoIcon tooltip="This section shows the timeline of your RTI journey" />
 */
export function InfoIcon({ tooltip, className = '' }: InfoIconProps) {
  const [isOpen, setIsOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        buttonRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        ref={buttonRef}
        className={styles.iconButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Show information"
        aria-expanded={isOpen}
      >
        <span className={styles.icon}>i</span>
      </button>
      {isOpen && (
        <div ref={tooltipRef} className={styles.tooltip}>
          <div className={styles.tooltipContent}>{tooltip}</div>
        </div>
      )}
    </div>
  )
}
