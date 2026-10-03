import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Construction, HeartHandshake, Landmark, Users } from "lucide-react"
import { SidebarNav } from "@/components/compass/sidebar-nav"
import { SiteFooter } from "@/components/compass/resources"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReviewedSource } from "@/components/compass/next-step-card"

export const metadata: Metadata = {
  title: "Alpha Epsilon Delta",
  description: "Learn about Moravian's emerging Alpha Epsilon Delta pre-health honor society chapter.",
}

const membershipRequirements = [
  "Pursuing a post-baccalaureate professional healthcare track, such as medicine, dentistry, veterinary medicine, or physical therapy.",
  "At least three college semesters or five quarters of pre-professional health studies completed.",
  "A minimum 3.30 cumulative GPA and 3.30 science GPA on a 4.0 scale.",
]

const offerings = [
  {
    icon: Users,
    title: "Professional development",
    description: "Guest speakers, application-cycle guidance, and preparation resources for entrance exams.",
  },
  {
    icon: HeartHandshake,
    title: "Community service",
    description: "Local volunteer work, philanthropic partnerships, and campus health initiatives.",
  },
  {
    icon: BookOpen,
    title: "Publications and awards",
    description: "National resources including The Scalpel and recognition programs such as the Frank Dyer Professional Achievement Award.",
  },
]

export default function AlphaEpsilonDeltaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="lg:pl-72">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Landmark className="h-4 w-4" aria-hidden="true" />
              <span>Pre-professional honor society</span>
            </div>
            <h1 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Alpha Epsilon Delta
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
              A future home for Moravian students pursuing excellence in healthcare, medicine, dentistry, veterinary science, and other health professions.
            </p>
          </div>

          <Alert className="mt-10 border-primary/20 bg-primary/5">
            <Construction className="h-4 w-4 text-primary" aria-hidden="true" />
            <AlertTitle>Chapter information is under construction</AlertTitle>
            <AlertDescription>
              We are building Moravian&apos;s pre-med honor society now. More information about chapter leadership, meetings, and how to join will be available soon.
            </AlertDescription>
          </Alert>
          <div className="mt-2">
            <ReviewedSource reviewed="Summer 2026" source="Alpha Epsilon Delta national overview" />
          </div>

          <section className="mt-12 grid gap-6 md:grid-cols-2" aria-labelledby="overview-heading">
            <Card className="rounded-2xl border-border/80 bg-card/80 shadow-none">
              <CardHeader>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">About AED</p>
                <CardTitle id="overview-heading" className="font-serif text-2xl">A national tradition of service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Alpha Epsilon Delta is the world&apos;s largest national health pre-professional honor society. It supports undergraduate students preparing for careers in healthcare and recognizes excellence in scholarship and community service.
                </p>
                <dl className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                  <div><dt className="font-semibold text-foreground">Founded</dt><dd>April 28, 1926</dd></div>
                  <div><dt className="font-semibold text-foreground">Headquarters</dt><dd>Fort Worth, Texas</dd></div>
                  <div><dt className="font-semibold text-foreground">National reach</dt><dd>270+ chapters and 229,000 lifetime members</dd></div>
                </dl>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card/80 shadow-none">
              <CardHeader>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Who can qualify</p>
                <CardTitle className="font-serif text-2xl">Membership requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
                  {membershipRequirements.map((requirement) => (
                    <li key={requirement} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Requirements can vary by chapter. Final eligibility details will be shared when the Moravian chapter is established.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mt-12" aria-labelledby="offerings-heading">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">What AED supports</p>
              <h2 id="offerings-heading" className="mt-1 font-serif text-2xl font-semibold text-foreground md:text-3xl">Learn, serve, and connect</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {offerings.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="h-full rounded-2xl border-border/80 bg-card/80 shadow-none">
                  <CardHeader>
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <CardTitle className="font-serif text-xl">{title}</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-sm leading-relaxed text-muted-foreground">{description}</p></CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Interested in helping build the chapter?</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">Keep an eye out for announcements as the chapter takes shape, and visit the Pre-Health Club page for the campus community already in motion.</p>
            <Link href="/pre-health-club" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Visit Pre-Health Club <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <SiteFooter />
      </main>
    </div>
  )
}

