/**
 * RTI Transparency Dashboard - Main Page
 *
 * Newspaper-style layout with comprehensive RTI information
 */

import { Masthead } from '@/components/features/dashboard/Masthead/Masthead'
import { DashboardHero } from '@/components/features/dashboard/DashboardHero/DashboardHero'
import { NewspaperLayout, LeftColumn, CenterColumn, RightColumn } from '@/components/layout/NewspaperLayout'
import { YourAreaTodayCard } from '@/components/features/dashboard/YourAreaToday/YourAreaTodayCard'
import { LatestActivityTimeline } from '@/components/features/dashboard/LatestActivity/LatestActivityTimeline'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export default function Home() {
  return (
    <div>
      {/* Masthead with edition selectors and search */}
      <Masthead />

      {/* Main container */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem 2rem' }}>
        {/* Hero Section */}
        <DashboardHero />

        {/* Three-Column Newspaper Layout */}
        <NewspaperLayout>
          {/* LEFT COLUMN - Your Area & Services */}
          <LeftColumn>
            <YourAreaTodayCard />

            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>🏥 Everyday Services Watch</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
                  <ServiceCard icon="🧾" label="Ration / PDS" count={234} />
                  <ServiceCard icon="🧑‍⚕️" label="Health" count={156} />
                  <ServiceCard icon="🎓" label="Education" count={189} />
                  <ServiceCard icon="💡" label="Power Supply" count={97} />
                </div>
              </CardContent>
            </Card>
          </LeftColumn>

          {/* CENTER COLUMN - Live Activity & Performance */}
          <CenterColumn>
            <LatestActivityTimeline />

            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>📝 What People Are Asking (Last 7 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <QuestionItem
                  title="Delay in pension payments for widows in XYZ block"
                  dept="Social Welfare"
                  date="Nov 10, 2025"
                />
                <QuestionItem
                  title="Status of road repair work on Main Bazaar Road"
                  dept="PWD"
                  date="Nov 09, 2025"
                />
                <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border-tertiary)' }}>
                  <a href="#" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-link)', textDecoration: 'none', fontWeight: 500 }}>
                    Browse all newly filed RTIs →
                  </a>
                </div>
              </CardContent>
            </Card>
          </CenterColumn>

          {/* RIGHT COLUMN - Insights, Rights, & Stories */}
          <RightColumn>
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>💡 Insights & Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <InsightItem
                  icon="📊"
                  text="62% of RTIs in your state are about local services (roads, water, PDS)."
                />
                <InsightItem
                  icon="📊"
                  text="Median response time improved by 5 days compared to last year."
                />
                <InsightItem
                  icon="📊"
                  text="1 in 20 RTIs goes to appeal, showing where follow-up is needed."
                />
              </CardContent>
            </Card>

            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>📜 Know Your RTI Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <RightItem text="Any citizen of India can file an RTI." />
                <RightItem text="Public authorities must reply within 30 days in most cases." />
                <RightItem text="If the matter affects life or liberty, information should be given within 48 hours." />
                <RightItem text="If information is delayed/denied without good reason, you can file an appeal." />
              </CardContent>
            </Card>

            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>🔍 High Impact RTIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--color-border-tertiary)', marginBottom: 'var(--space-md)' }}>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: 'var(--space-xs)' }}>
                    1) &ldquo;Illegal sand mining in XYZ river&rdquo;
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                    Outcome: Missing permits exposed; inspection ordered by district admin.
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
                    Status: Closed | Topic: Environment
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: 'var(--space-xs)' }}>
                    2) &ldquo;Waiting list for govt housing scheme&rdquo;
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                    Outcome: Data showed 2-year backlog; triggered local media coverage.
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
                    Status: Answered | Topic: Housing
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle>🧰 Citizen Toolkit</CardTitle>
              </CardHeader>
              <CardContent>
                <ToolkitItem text="RTI sample formats for common issues (ration, pensions, land records, fees)" />
                <ToolkitItem text="How to identify the right department" />
                <ToolkitItem text="What to do if you get no reply" />
              </CardContent>
            </Card>
          </RightColumn>
        </NewspaperLayout>

        {/* Full-Width Footer Note */}
        <div style={{
          marginTop: 'var(--space-2xl)',
          padding: 'var(--space-xl)',
          background: 'var(--color-bg-tertiary)',
          borderRadius: 'var(--border-radius)',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 var(--space-sm) 0', color: 'var(--color-text-secondary)' }}>
            Community-sourced data from YouRTI & public records.
          </p>
          <p style={{ margin: 0, color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
            Built to help citizens use the Right to Information Act to demand transparency and better services.
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function ServiceCard({ icon, label, count }: { icon: string; label: string; count: number }) {
  return (
    <div style={{
      padding: 'var(--space-md)',
      border: '1px solid var(--color-border-secondary)',
      borderRadius: 'var(--border-radius)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-xs)' }}>{icon}</div>
      <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: 'var(--space-xs)' }}>{label}</div>
      <div style={{ fontSize: 'var(--font-size-base)', fontFamily: 'var(--font-family-mono)', color: 'var(--color-text-tertiary)' }}>
        {count} RTIs
      </div>
    </div>
  )
}

function QuestionItem({ title, dept, date }: { title: string; dept: string; date: string }) {
  return (
    <div style={{ padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--color-border-tertiary)' }}>
      <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-xs)' }}>• &ldquo;{title}&rdquo;</div>
      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
        Dept: {dept} | Filed: {date}
      </div>
    </div>
  )
}

function AnswerItem({ title, summary, filed, answered }: { title: string; summary: string; filed: string; answered: string }) {
  return (
    <div style={{ padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--color-border-tertiary)' }}>
      <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: 'var(--space-xs)' }}>• &ldquo;{title}&rdquo;</div>
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
        Answer (summary): {summary}
      </div>
      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
        Filed: {filed} | Answered: {answered}
      </div>
    </div>
  )
}

function InsightItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{
      padding: 'var(--space-md)',
      marginBottom: 'var(--space-sm)',
      background: 'var(--color-bg-tertiary)',
      borderRadius: 'var(--border-radius)'
    }}>
      <span style={{ marginRight: 'var(--space-sm)' }}>{icon}</span>
      <span style={{ fontSize: 'var(--font-size-sm)' }}>{text}</span>
    </div>
  )
}

function RightItem({ text }: { text: string }) {
  return (
    <div style={{ padding: 'var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
      • {text}
    </div>
  )
}

function ToolkitItem({ text }: { text: string }) {
  return (
    <div style={{ padding: 'var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
      • {text}
    </div>
  )
}
