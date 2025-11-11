import { BaseProps } from '@/types'

interface GridProps extends BaseProps {
  columns?: number
  as?: keyof JSX.IntrinsicElements
}

interface ColProps extends BaseProps {
  span?: number
}

/**
 * Grid Component
 *
 * Newspaper-style 12-column grid system for layout composition.
 * Provides responsive column-based layouts.
 *
 * @example
 * <Grid>
 *   <Col span={6}>Left column</Col>
 *   <Col span={6}>Right column</Col>
 * </Grid>
 */
export function Grid({
  columns,
  as: Component = 'div',
  className = '',
  children,
}: GridProps) {
  const gridClass = columns ? `newspaper-columns-${columns}` : 'newspaper-grid'
  const classes = [gridClass, className].filter(Boolean).join(' ')

  return <Component className={classes}>{children}</Component>
}

/**
 * Column Component
 *
 * Grid column that spans a specified number of columns (1-12).
 *
 * @example
 * <Col span={6}>Half-width column</Col>
 */
export function Col({
  span = 12,
  className = '',
  children,
}: ColProps) {
  const classes = [`col-${span}`, className].filter(Boolean).join(' ')

  return <div className={classes}>{children}</div>
}

/**
 * Newspaper Columns Component
 *
 * Classic newspaper multi-column layout with automatic flow.
 *
 * @example
 * <NewspaperColumns>
 *   <div>Column 1</div>
 *   <div>Column 2</div>
 *   <div>Column 3</div>
 * </NewspaperColumns>
 */
export function NewspaperColumns({
  className = '',
  children,
}: BaseProps) {
  return <div className={`newspaper-columns ${className}`}>{children}</div>
}

/**
 * Column Divider Component
 *
 * Adds a vertical divider between columns in newspaper layout.
 *
 * @example
 * <ColumnDivider>
 *   Content with right border
 * </ColumnDivider>
 */
export function ColumnDivider({
  className = '',
  children,
}: BaseProps) {
  return <div className={`column-divider ${className}`}>{children}</div>
}
