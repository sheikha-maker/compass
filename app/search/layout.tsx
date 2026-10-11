import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Search",
  description: "Search The Pre-Med Compass for guides, tools, and resources.",
  path: "/search",
  noindex: true,
})

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
