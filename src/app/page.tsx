import { HeroBanner } from '@/components/hero/HeroBanner'
import { Container } from '@/components/layout/Container'
import { Grid, Col } from '@/components/layout/Grid'
import { SectionHeader, Body } from '@/components/ui/Typography'
import { DataTable } from '@/components/data/DataTable'
import { Badge } from '@/components/ui/Badge'
import { TrendArrow } from '@/components/data/TrendIndicator'

export default function Home() {
  // Sample statistics data
  const stats = [
    { label: 'Filed', value: 24567, change: 12, changeType: 'increase' as const },
    { label: 'Disclosed', value: 18943, change: 8, changeType: 'increase' as const },
    { label: 'Rejected', value: 2314, change: 3, changeType: 'decrease' as const },
    { label: 'Pending', value: 3310, change: 5, changeType: 'neutral' as const },
  ]

  // Sample table data
  const tableData = [
    {
      topic: 'Healthcare',
      rtis: '2,456',
      trend: <TrendArrow changeType="increase" change={23} />,
      status: <Badge variant="disclosed">DISCLOSED</Badge>
    },
    {
      topic: 'Infrastructure',
      rtis: '1,892',
      trend: <TrendArrow changeType="increase" change={15} />,
      status: <Badge variant="disclosed">DISCLOSED</Badge>
    },
    {
      topic: 'Education',
      rtis: '1,543',
      trend: <TrendArrow changeType="neutral" change={2} />,
      status: <Badge variant="pending">PENDING</Badge>
    },
    {
      topic: 'Public Works',
      rtis: '1,234',
      trend: <TrendArrow changeType="decrease" change={8} />,
      status: <Badge variant="rejected">REJECTED</Badge>
    },
  ]

  return (
    <main>
      <HeroBanner
        title="RTI TRANSPARENCY DASHBOARD"
        subtitle="Tracking Government Accountability Across India"
        edition="Vol. 2024 | Edition #1247 | Tuesday, Nov 11, 2025"
        stats={stats}
      />

      <section className="section">
        <Container>
          <SectionHeader meta="Updated: Nov 11, 2025">
            Department Analysis
          </SectionHeader>

          <Grid>
            <Col span={12}>
              <DataTable
                headers={['Topic', 'RTIs Filed', 'Trend', 'Status']}
                rows={tableData}
                striped
              />
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section section-bg-newsprint">
        <Container>
          <SectionHeader>About the Dashboard</SectionHeader>
          <Grid>
            <Col span={8}>
              <Body>
                The RTI Transparency Dashboard tracks Right to Information requests
                across India, providing real-time insights into government accountability
                and transparency. Our mission is to make RTI data accessible and actionable
                for citizens, journalists, and researchers.
              </Body>
            </Col>
            <Col span={4}>
              <div className="card">
                <h3 className="headline-small mb-4">Quick Stats</h3>
                <Body>
                  Over <strong>24,000</strong> RTI requests tracked across{' '}
                  <strong>28 states</strong> and <strong>8 union territories</strong>.
                </Body>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>
    </main>
  )
}
