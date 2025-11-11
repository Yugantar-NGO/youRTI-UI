import { BaseProps, TableRow } from '@/types'
import styles from './DataTable.module.css'

interface DataTableProps extends BaseProps {
  headers: string[]
  rows: TableRow[]
  striped?: boolean
}

/**
 * DataTable Component
 *
 * Displays tabular data with newspaper-style formatting.
 * Supports alternating row colors and clean borders.
 *
 * @example
 * <DataTable
 *   headers={['Topic', 'RTIs', 'Trend']}
 *   rows={[
 *     { topic: 'Healthcare', rtis: 2456, trend: '↑ 23%' },
 *     { topic: 'Infrastructure', rtis: 1892, trend: '↑ 15%' }
 *   ]}
 *   striped
 * />
 */
export function DataTable({
  headers,
  rows,
  striped = true,
  className = '',
}: DataTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={`${styles.table} ${striped ? styles.striped : ''} ${className}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.td}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
