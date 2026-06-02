import type { Metadata } from 'next'
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://v0-premedcompass.vercel.app')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'The Pre-Med Compass',
  description:
    'A sustainable, anxiety-aware pre-med guide for Moravian University students. Make intentional decisions, plan your path, and protect your well-being.',
  authors: [{ name: 'Ayaan Sheikh', url: 'mailto:sheikha@moravian.edu' }],
  keywords: ['pre-med', 'Moravian University', 'MCAT', 'medical school', 'burnout', 'pre-health'],
  openGraph: {
    title: 'The Pre-Med Compass',
    description:
      'A sustainable, anxiety-aware pre-med guide for Moravian University students. MCAT prep, application timeline, and wellness tools.',
    siteName: 'The Pre-Med Compass',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pre-Med Compass',
    description:
      'Navigate your pre-med journey with clarity and intention — built for Moravian University students.',
  },
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
    <html lang="en" suppressHydrationWarning className={`bg-background ${sourceSans.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          <ReadingProgress />
          <PageTransition>{children}</PageTransition>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
