export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { PageTransition } from '@/components/compass/page-transition'
import { ReadingProgress } from '@/components/compass/progress-tracker'
import { BackToTop } from '@/components/compass/back-to-top'

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
    url: 'https://v0-premedcompass.vercel.app',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'The Pre-Med Compass' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pre-Med Compass',
    description:
      'Pre-med at Moravian is hard. It doesn\'t have to be chaotic. A guide built for Moravian University students.',
    images: ['/opengraph-image'],
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
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[9999] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" themes={["light", "dark", "red", "green", "purple", "teal", "gold", "navy"]}>
          <ReadingProgress />
          <PageTransition>{children}</PageTransition>
          <BackToTop />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}