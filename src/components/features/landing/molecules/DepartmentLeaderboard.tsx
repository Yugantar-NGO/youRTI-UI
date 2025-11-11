import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import styles from './DepartmentLeaderboard.module.css'

interface Department {
  rank: number
  name: string
  fulfillment: number
  avgResponse: number
  transfers: number
  rtisHandled: number
}

interface DepartmentLeaderboardProps {
  departments: Department[]
  className?: string
}

/**
 * DepartmentLeaderboard Component
 *
 * Displays a ranked table of department performance metrics.
 *
 * @example
 * <DepartmentLeaderboard departments={[...]} />
 */
export function DepartmentLeaderboard({ departments, className = '' }: DepartmentLeaderboardProps) {
  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return rank
  }

  const getFulfillmentColor = (rate: number) => {
    if (rate >= 75) return styles.good
    if (rate >= 60) return styles.moderate
    return styles.poor
  }

  const getTransferColor = (rate: number) => {
    if (rate <= 5) return styles.good
    if (rate <= 10) return styles.moderate
    return styles.poor
  }

  return (
    <Card variant="bordered" className={`${styles.leaderboard} ${className}`}>
      <CardHeader>
        <CardTitle>🏆 Department Leaderboard</CardTitle>
      </CardHeader>

      <CardContent>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.rankCol}>Rank</th>
                <th className={styles.nameCol}>Department</th>
                <th className={styles.metricCol}>Fulfillment</th>
                <th className={styles.metricCol}>Avg Response</th>
                <th className={styles.metricCol}>Transfers</th>
                <th className={styles.metricCol}>RTIs Handled</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.rank} className={styles.row}>
                  <td className={styles.rankCell}>{getRankEmoji(dept.rank)}</td>
                  <td className={styles.nameCell}>{dept.name}</td>
                  <td className={`${styles.metricCell} ${getFulfillmentColor(dept.fulfillment)}`}>
                    {dept.fulfillment}%
                  </td>
                  <td className={styles.metricCell}>{dept.avgResponse} days</td>
                  <td className={`${styles.metricCell} ${getTransferColor(dept.transfers)}`}>
                    {dept.transfers}%
                  </td>
                  <td className={styles.metricCell}>{dept.rtisHandled.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
