'use client'

import { BaseProps } from '@/types'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { ActionButton } from '../../atoms'
import { ExternalLink } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import styles from './AnswerView.module.css'

interface PublicDomainViewProps extends BaseProps {
  responseText: string
  publicDomainLinks: Array<{ url: string; description: string }>
  signedBy?: string
  signedByDesignation?: string
  signedDate?: string
  canFileAppeal?: boolean
}

/**
 * PublicDomainView Component
 *
 * Displays response when department refers to publicly available information.
 * Shows links to official websites/portals where data is available.
 *
 * @example
 * <PublicDomainView
 *   responseText="Information is available on department website..."
 *   publicDomainLinks={[{
 *     url: 'revenue.up.gov.in/dashboard',
 *     description: 'Land Acquisition Dashboard'
 *   }]}
 * />
 */
export function PublicDomainView({
  responseText,
  publicDomainLinks,
  signedBy,
  signedByDesignation,
  signedDate,
  canFileAppeal = false,
  className = '',
}: PublicDomainViewProps) {
  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          THE ANSWER
        </Typography>
        <div className={styles.statusBadge}>
          <span className={`${styles.badge} ${styles.badgePublic}`}>🔗 PUBLIC DOMAIN</span>
        </div>
      </div>

      {/* Response Text */}
      <div className={styles.content}>
        <Typography variant="body-text" className={styles.responseText}>
          {responseText.split('\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </Typography>
      </div>

      {/* Public Domain Links */}
      <div className={styles.linksSection}>
        <div className={styles.linksHeader}>
          <span className={styles.linksIcon}>🔗</span>
          <Typography variant="label" className={styles.linksLabel}>
            Official Resources ({publicDomainLinks.length})
          </Typography>
        </div>

        <div className={styles.linksList}>
          {publicDomainLinks.map((link, index) => (
            <a
              key={index}
              href={`https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              <div className={styles.linkContent}>
                <Icon icon={ExternalLink} size="sm" className={styles.linkIcon} />
                <div className={styles.linkDetails}>
                  <Typography variant="body-text" className={styles.linkDescription}>
                    {link.description}
                  </Typography>
                  <Typography variant="label" className={styles.linkUrl}>
                    {link.url}
                  </Typography>
                </div>
              </div>
              <Icon icon={ExternalLink} size="sm" className={styles.linkArrow} />
            </a>
          ))}
        </div>
      </div>

      {/* Info Note */}
      <div className={styles.infoNote}>
        <Typography variant="label" className={styles.noteText}>
          💡 Note: While departments can refer to Section 4 disclosures, they should ensure the
          information is actually accessible and up-to-date. If the links are broken or data is
          incomplete, you can file an appeal.
        </Typography>
      </div>

      {/* Appeal Option */}
      {canFileAppeal && (
        <div className={styles.appealSection}>
          <div className={styles.appealBox}>
            <Typography variant="label" className={styles.appealText}>
              ⚖️ Found the links broken or data incomplete? You can challenge this response by
              filing a First Appeal.
            </Typography>
          </div>
          <ActionButton
            label="File First Appeal"
            variant="secondary"
            onClick={() => console.log('File appeal')}
          />
        </div>
      )}

      {/* Signature */}
      {signedBy && (
        <div className={styles.signature}>
          <div className={styles.signatureLine} />
          <div className={styles.signatureDetails}>
            <Typography variant="body-text" className={styles.signatoryName}>
              {signedBy}
            </Typography>
            {signedByDesignation && (
              <Typography variant="label" className={styles.signatoryDesignation}>
                {signedByDesignation}
              </Typography>
            )}
            {signedDate && (
              <Typography variant="label" className={styles.signatureDate}>
                Signed on{' '}
                {new Date(signedDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
