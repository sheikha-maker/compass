/**
 * lib/seo.ts
 * Shared site URL + a helper for per-page metadata so every route gets a unique
 * title, description, canonical URL, and social card without repeating boilerplate.
 */

import type { Metadata } from "next"

export const SITE_NAME = "The Pre-Med Compass"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://v0-premedcompass.vercel.app")

type PageMetaOptions = {
  /** Page title without the site suffix, e.g. "Building Your Path". */
  title: string
  description: string
  /** Route path starting with a slash, used for the canonical URL. */
  path: string
  /**
   * Set for pages behind auth. They redirect to /sign-in for crawlers, so
   * indexing them produces soft-404s in Search Console.
   */
  noindex?: boolean
}

export function pageMetadata({ title, description, path, noindex }: PageMetaOptions): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
