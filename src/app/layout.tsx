import type { Metadata } from 'next'
import { Playfair_Display, Inter, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/design-tokens.css'
import '@/styles/themes/newspaper.css'
import '@/styles/themes/modern.css'
import '@/styles/globals.css'
import '@/styles/typography.css'
import '@/styles/layout.css'

// Font configurations
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RTI Transparency Dashboard | youRTI',
  description: 'Tracking India\'s Right to Information Requests - Government Accountability Dashboard',
  keywords: ['RTI', 'Right to Information', 'India', 'Transparency', 'Government', 'Accountability'],
  authors: [{ name: 'Yugantar NGO' }],
  openGraph: {
    title: 'RTI Transparency Dashboard',
    description: 'Tracking Government Accountability Across India',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="newspaper"
      className={`${playfair.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
