import { HeroBanner } from '@/components/hero/HeroBanner'
import { Container } from '@/components/layout/Container'
import { Grid, Col, NewspaperColumns } from '@/components/layout/Grid'
import {
  SectionHeader,
  Body,
  Headline,
  Subheadline,
  Kicker,
  Deck,
  PullQuote,
  Byline,
  Metadata
} from '@/components/ui/Typography'
import { DataTable } from '@/components/data/DataTable'
import { Badge } from '@/components/ui/Badge'
import { TrendArrow, TrendIndicator } from '@/components/data/TrendIndicator'
import { StatCard } from '@/components/data/StatCard'

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

  // Regional data table
  const regionalData = [
    {
      state: 'Maharashtra',
      filed: '3,245',
      disclosed: '2,891',
      rate: '89%',
      trend: <TrendArrow changeType="increase" change={12} />
    },
    {
      state: 'Delhi',
      filed: '2,987',
      disclosed: '2,543',
      rate: '85%',
      trend: <TrendArrow changeType="increase" change={8} />
    },
    {
      state: 'Karnataka',
      filed: '2,456',
      disclosed: '1,982',
      rate: '81%',
      trend: <TrendArrow changeType="neutral" change={2} />
    },
    {
      state: 'Tamil Nadu',
      filed: '2,134',
      disclosed: '1,765',
      rate: '83%',
      trend: <TrendArrow changeType="increase" change={5} />
    },
    {
      state: 'West Bengal',
      filed: '1,876',
      disclosed: '1,389',
      rate: '74%',
      trend: <TrendArrow changeType="decrease" change={4} />
    }
  ]

  // Recent RTI cases table
  const recentCases = [
    {
      title: 'Hospital Licensing Records',
      department: 'Health Dept, Mumbai',
      date: 'Nov 8, 2025',
      status: <Badge variant="disclosed">DISCLOSED</Badge>
    },
    {
      title: 'Road Construction Contracts',
      department: 'PWD, Delhi',
      date: 'Nov 7, 2025',
      status: <Badge variant="pending">PENDING</Badge>
    },
    {
      title: 'School Funding Details',
      department: 'Education, Karnataka',
      date: 'Nov 6, 2025',
      status: <Badge variant="partial">PARTIAL</Badge>
    },
    {
      title: 'Police Complaint Records',
      department: 'Home Affairs, UP',
      date: 'Nov 5, 2025',
      status: <Badge variant="rejected">REJECTED</Badge>
    }
  ]

  return (
    <main>
      {/* Hero Banner with Stats */}
      <HeroBanner
        title="RTI TRANSPARENCY DASHBOARD"
        subtitle="Tracking Government Accountability Across India"
        edition="Vol. 2024 | Edition #1247 | Tuesday, Nov 11, 2025"
        stats={stats}
      />

      {/* Breaking News / Pull Quote Section */}
      <section className="section">
        <Container size="narrow">
          <PullQuote>
            47 unlicensed hospitals discovered operating in Delhi NCR through RTI disclosures
          </PullQuote>
          <Byline>Data compiled from 156 RTI responses • Health Department • Oct-Nov 2025</Byline>
        </Container>
      </section>

      <hr className="divider" />

      {/* Department Analysis Table */}
      <section className="section">
        <Container>
          <SectionHeader meta="Updated: Nov 11, 2025">
            § Department Analysis
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

      {/* Regional Breakdown with Grid Layout */}
      <section className="section section-bg-newsprint">
        <Container>
          <SectionHeader meta="Last 30 days">
            § Regional Breakdown
          </SectionHeader>

          <Grid>
            <Col span={8}>
              <DataTable
                headers={['State', 'Filed', 'Disclosed', 'Rate', 'Trend']}
                rows={regionalData}
                striped
              />
            </Col>
            <Col span={4}>
              <div className="card">
                <Kicker>Top Performer</Kicker>
                <Subheadline className="mt-2 mb-4">Maharashtra</Subheadline>
                <TrendIndicator
                  trend={{
                    value: 3245,
                    change: 12,
                    changeType: 'increase',
                    period: 'vs last month'
                  }}
                />
                <div className="mt-6">
                  <Body>
                    Highest disclosure rate at <strong>89%</strong> with fastest average
                    response time of <strong>18 days</strong>.
                  </Body>
                </div>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* Recent Cases with Newspaper Columns */}
      <section className="section">
        <Container>
          <SectionHeader meta="Past 7 days">
            § Recent RTI Cases
          </SectionHeader>

          <div className="mb-6">
            <DataTable
              headers={['RTI Request', 'Department', 'Date', 'Status']}
              rows={recentCases}
            />
          </div>

          <div className="divider-thick"></div>

          <div className="mt-8">
            <Kicker>All Status Types</Kicker>
            <div className="flex gap-3 mt-4">
              <Badge variant="disclosed">DISCLOSED</Badge>
              <Badge variant="rejected">REJECTED</Badge>
              <Badge variant="pending">PENDING</Badge>
              <Badge variant="partial">PARTIAL</Badge>
              <Badge variant="default">DEFAULT</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Newspaper Columns Layout - Typography Showcase */}
      <section className="section section-bg-newsprint">
        <Container>
          <SectionHeader>
            § Impact Stories
          </SectionHeader>

          <NewspaperColumns>
            <div>
              <Kicker>Healthcare</Kicker>
              <Subheadline className="mt-2 mb-3">
                Mumbai Hospital Exposed
              </Subheadline>
              <Body>
                An RTI request revealed that 23 patients were treated by unlicensed medical
                staff at a major Mumbai hospital between June and September 2025.
              </Body>
              <Metadata className="mt-3">
                Mumbai • 2 days ago • 142 reactions
              </Metadata>
            </div>

            <div>
              <Kicker>Infrastructure</Kicker>
              <Subheadline className="mt-2 mb-3">
                Road Project Irregularities
              </Subheadline>
              <Body>
                Documents obtained through RTI show that a ₹45 crore road construction
                project was awarded without proper tender process.
              </Body>
              <Metadata className="mt-3">
                Delhi • 4 days ago • 89 reactions
              </Metadata>
            </div>

            <div>
              <Kicker>Education</Kicker>
              <Subheadline className="mt-2 mb-3">
                Missing School Funds
              </Subheadline>
              <Body>
                RTI disclosure reveals ₹2.3 crore allocated for school infrastructure
                remains unaccounted for in Karnataka district.
              </Body>
              <Metadata className="mt-3">
                Bangalore • 5 days ago • 67 reactions
              </Metadata>
            </div>
          </NewspaperColumns>
        </Container>
      </section>

      {/* Stats Card Grid Showcase */}
      <section className="section">
        <Container>
          <SectionHeader meta="This Month">
            § Key Performance Indicators
          </SectionHeader>

          <Grid>
            <Col span={3}>
              <StatCard
                stat={{
                  label: 'Avg Response Time',
                  value: 24,
                  unit: 'days',
                  change: 8,
                  changeType: 'decrease'
                }}
              />
            </Col>
            <Col span={3}>
              <StatCard
                stat={{
                  label: 'Success Rate',
                  value: 77,
                  unit: '%',
                  change: 5,
                  changeType: 'increase'
                }}
              />
            </Col>
            <Col span={3}>
              <StatCard
                stat={{
                  label: 'Appeals Filed',
                  value: 892,
                  change: 15,
                  changeType: 'increase'
                }}
              />
            </Col>
            <Col span={3}>
              <StatCard
                stat={{
                  label: 'Active Users',
                  value: 1543,
                  change: 0,
                  changeType: 'neutral'
                }}
              />
            </Col>
          </Grid>
        </Container>
      </section>

      {/* About Section with Different Card Styles */}
      <section className="section section-bg-newsprint">
        <Container>
          <SectionHeader>About the Dashboard</SectionHeader>
          <Grid>
            <Col span={8}>
              <Deck>
                Empowering citizens through transparency and accountability
              </Deck>
              <Body className="mt-4">
                The RTI Transparency Dashboard tracks Right to Information requests
                across India, providing real-time insights into government accountability
                and transparency. Our mission is to make RTI data accessible and actionable
                for citizens, journalists, and researchers.
              </Body>
            </Col>
            <Col span={4}>
              <div className="card card-accent-left">
                <Headline>Quick Stats</Headline>
                <Body className="mt-4">
                  Over <strong>24,000</strong> RTI requests tracked across{' '}
                  <strong>28 states</strong> and <strong>8 union territories</strong>.
                </Body>
                <div className="mt-6">
                  <StatCard
                    stat={{
                      label: 'Departments Covered',
                      value: 147,
                      change: 12,
                      changeType: 'increase'
                    }}
                  />
                </div>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* Breaking News Style Card */}
      <section className="section">
        <Container size="narrow">
          <div className="card-breaking p-6">
            <Kicker style={{ color: 'var(--color-alert-red)' }}>
              💥 BREAKING
            </Kicker>
            <Subheadline className="mt-3 mb-4">
              Supreme Court Ruling on RTI Amendment
            </Subheadline>
            <Body>
              The Supreme Court has upheld citizens' rights to seek information under RTI Act,
              striking down certain restrictive amendments proposed in 2023.
            </Body>
            <Metadata className="mt-4">
              New Delhi • 3 hours ago • 1,247 reactions • Read Full Report →
            </Metadata>
          </div>
        </Container>
      </section>

      {/* Footer Info */}
      <section className="section section-bg-newsprint">
        <Container>
          <div className="text-center">
            <Metadata>
              Data compiled from 24,567 RTI responses | Updated daily at 6:00 AM IST
            </Metadata>
            <Metadata className="mt-2">
              © 2025 Yugantar NGO | youRTI Initiative
            </Metadata>
          </div>
        </Container>
      </section>
    </main>
  )
}
