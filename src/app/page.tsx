import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { StatCard } from '@/components/data/StatCard'
import { DataTable } from '@/components/data/DataTable'
import { Badge } from '@/components/ui/Badge'
import { TrendArrow } from '@/components/data/TrendIndicator'
import { FileText, CheckCircle2, XCircle, Clock, TrendingUp, MapPin, Building2 } from '@/lib/icons'
import styles from './page.module.css'

export default function Home() {
  // Quick Stats Data
  const quickStats = [
    { label: 'Total Filed', value: 24567, change: 12, changeType: 'increase' as const },
    { label: 'Disclosed', value: 18943, change: 8, changeType: 'increase' as const },
    { label: 'Rejected', value: 2314, change: 3, changeType: 'decrease' as const },
    { label: 'Pending', value: 3310, change: 5, changeType: 'neutral' as const },
  ]

  // Recent Filed RTIs
  const recentFiled = [
    {
      title: 'Hospital Licensing Records',
      department: 'Health Dept, Mumbai',
      date: 'Nov 11, 2025',
      status: <Badge variant="pending" showIcon>PENDING</Badge>
    },
    {
      title: 'Road Construction Contracts',
      department: 'PWD, Delhi',
      date: 'Nov 10, 2025',
      status: <Badge variant="pending" showIcon>PENDING</Badge>
    },
    {
      title: 'School Infrastructure Funds',
      department: 'Education, Karnataka',
      date: 'Nov 10, 2025',
      status: <Badge variant="pending" showIcon>PENDING</Badge>
    },
  ]

  // Recent Responses
  const recentResponses = [
    {
      title: 'Police Complaint Records',
      department: 'Home Affairs, UP',
      date: 'Nov 9, 2025',
      status: <Badge variant="rejected" showIcon>REJECTED</Badge>
    },
    {
      title: 'Municipal Tax Collection',
      department: 'BMC, Mumbai',
      date: 'Nov 9, 2025',
      status: <Badge variant="disclosed" showIcon>DISCLOSED</Badge>
    },
    {
      title: 'Public Transport Budget',
      department: 'Transport, Delhi',
      date: 'Nov 8, 2025',
      status: <Badge variant="disclosed" showIcon>DISCLOSED</Badge>
    },
  ]

  // Regional Performance
  const regionalData = [
    { state: 'Maharashtra', filed: '3,245', rate: '89%', trend: <TrendArrow changeType="increase" change={12} /> },
    { state: 'Delhi', filed: '2,987', rate: '85%', trend: <TrendArrow changeType="increase" change={8} /> },
    { state: 'Karnataka', filed: '2,456', rate: '81%', trend: <TrendArrow changeType="neutral" change={2} /> },
    { state: 'Tamil Nadu', filed: '2,134', rate: '83%', trend: <TrendArrow changeType="increase" change={5} /> },
  ]

  // Trending Topics
  const trendingTopics = [
    { topic: 'Healthcare', count: 2456, change: '+23%' },
    { topic: 'Infrastructure', count: 1892, change: '+15%' },
    { topic: 'Education', count: 1543, change: '+8%' },
    { topic: 'Environment', count: 1234, change: '+12%' },
  ]

  return (
    <DashboardLayout>
      {/* Quick Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard icon={FileText} stat={quickStats[0]} />
        <StatCard icon={CheckCircle2} stat={quickStats[1]} />
        <StatCard icon={XCircle} stat={quickStats[2]} />
        <StatCard icon={Clock} stat={quickStats[3]} />
      </div>

      {/* Main Dashboard Grid */}
      <div className={styles.dashboardGrid}>
        {/* Featured/Impactful RTI - Large Card */}
        <div className={styles.featured}>
          <Card variant="elevated" padding="lg">
            <CardHeader>
              <CardTitle>🔥 Most Impactful RTI This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.impactfulRTI}>
                <h3 className="headline-medium">47 Unlicensed Hospitals Discovered in Delhi NCR</h3>
                <p className="body-text mt-4">
                  A comprehensive RTI investigation revealed that 47 hospitals across Delhi NCR have been
                  operating without proper licensing, treating over 2,300 patients between June-September 2025.
                </p>
                <div className={styles.impactMeta}>
                  <Badge variant="disclosed" showIcon>DISCLOSED</Badge>
                  <span className="metadata">Health Department • Nov 5, 2025</span>
                  <span className="metadata">1,247 reactions • 89 shares</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Sidebar */}
        <div className={styles.activitySidebar}>
          {/* Recently Filed */}
          <Card variant="bordered" padding="md">
            <CardHeader>
              <CardTitle>Recently Filed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.activityList}>
                {recentFiled.map((item, idx) => (
                  <div key={idx} className={styles.activityItem}>
                    <div className={styles.activityTitle}>{item.title}</div>
                    <div className={styles.activityMeta}>{item.department}</div>
                    <div className={styles.activityFooter}>
                      <span className="metadata">{item.date}</span>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Responded */}
          <Card variant="bordered" padding="md">
            <CardHeader>
              <CardTitle>Recent Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.activityList}>
                {recentResponses.map((item, idx) => (
                  <div key={idx} className={styles.activityItem}>
                    <div className={styles.activityTitle}>{item.title}</div>
                    <div className={styles.activityMeta}>{item.department}</div>
                    <div className={styles.activityFooter}>
                      <span className="metadata">{item.date}</span>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Performance */}
        <div className={styles.regionalSection}>
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                headers={['State', 'Filed', 'Rate', 'Trend']}
                rows={regionalData}
                striped
              />
            </CardContent>
          </Card>
        </div>

        {/* Trending Topics */}
        <div className={styles.trendingSection}>
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.trendingList}>
                {trendingTopics.map((topic, idx) => (
                  <div key={idx} className={styles.trendingItem}>
                    <div className={styles.trendingTopic}>{topic.topic}</div>
                    <div className={styles.trendingStats}>
                      <span className={styles.trendingCount}>{topic.count.toLocaleString()}</span>
                      <span className={styles.trendingChange}>{topic.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <Card variant="bordered" padding="md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.actionButtons}>
                <button className={styles.actionButton}>
                  <FileText size={20} />
                  <span>File New RTI</span>
                </button>
                <button className={styles.actionButton}>
                  <TrendingUp size={20} />
                  <span>View Analytics</span>
                </button>
                <button className={styles.actionButton}>
                  <MapPin size={20} />
                  <span>Regional Map</span>
                </button>
                <button className={styles.actionButton}>
                  <Building2 size={20} />
                  <span>Departments</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
