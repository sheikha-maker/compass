import type { Metadata } from 'next'
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { PageTransition } from '@/components/compass/page-transition'
import { ReadingProgress } from '@/components/compass/progress-tracker'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Pre-Med Compass',
  description:
    'A sustainable, anxiety-aware pre-med guide for Moravian University students. Make intentional decisions, plan your path, and protect your well-being.',
  authors: [{ name: 'Ayaan Sheikh', url: 'mailto:sheikha@moravian.edu' }],
  keywords: ['pre-med', 'Moravian University', 'MCAT', 'medical school', 'burnout', 'pre-health'],
}

export const viewport = {
  themeColor: '#3b4fd4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${sourceSans.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased">
        <ReadingProgress />
        <PageTransition>{children}</PageTransition>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
