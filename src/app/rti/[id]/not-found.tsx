import Link from 'next/link'
import { Typography } from '@/components/ui/Typography'
import styles from './not-found.module.css'

/**
 * RTI Not Found Page
 *
 * Custom 404 page for RTI detail routes.
 * Displayed when an invalid RTI ID is requested.
 *
 * @example
 * Triggered by: /rti/invalid-id
 */
export default function RTINotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Error Icon */}
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>🔍</span>
        </div>

        {/* Error Message */}
        <Typography variant="headline-large" as="h1" className={styles.title}>
          RTI Not Found
        </Typography>

        <Typography variant="body-text" className={styles.description}>
          The RTI information you&apos;re looking for doesn&apos;t exist or may have been removed.
          Please check the RTI ID and try again.
        </Typography>

        {/* Actions */}
        <div className={styles.actions}>
          <Link href="/browse" className={styles.primaryButton}>
            Browse All RTIs
          </Link>
          <Link href="/" className={styles.secondaryButton}>
            Go to Home
          </Link>
        </div>

        {/* Help Text */}
        <div className={styles.helpText}>
          <Typography variant="label" className={styles.help}>
            💡 Tip: You can search for RTIs by topic, department, or location from the browse page.
          </Typography>
        </div>
      </div>
    </div>
  )
}
