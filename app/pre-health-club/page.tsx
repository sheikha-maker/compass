import type { Metadata } from "next"
import { Users, Mail, ArrowRight, Landmark } from "lucide-react"
import Link from "next/link"
import { SidebarNav } from "@/components/compass/sidebar-nav"
import { SiteFooter } from "@/components/compass/resources"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Pre-Health Club E-Board",
  description: "Meet the Moravian Pre-Health Club executive board and learn how to get involved.",
}

const positions = [
  { title: "President", description: "Coordinates the club's direction, meetings, and campus partnerships." },
  { title: "Vice President", description: "Supports club programming and helps turn member ideas into events." },
  { title: "Secretary", description: "Keeps meeting notes, announcements, and club communication organized." },
  { title: "Treasurer", description: "Helps manage the club budget, purchases, and funding requests." },
  { title: "Social Media Manager", description: "Shares meetings, opportunities, and club updates with the campus community." },
]

export default function PreHealthClubPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="lg:pl-72">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>Community & leadership</span>
            </div>
            <h1 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Pre-Health Club E-Board
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
              The people who help make Pre-Health Club a place to find community, ask better questions, and take the next step together.
            </p>
          </div>

          <section className="mt-12" aria-labelledby="board-heading">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">2026–27 board</p>
                <h2 id="board-heading" className="mt-1 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                  Meet the team
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">Officer names will be added soon.</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {positions.map((position) => (
                <Card key={position.title} className="h-full border-border/80 bg-card/80 shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="font-serif text-xl">{position.title}</CardTitle>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">TBD</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{position.description}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span>Officer contact coming soon</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 md:p-8" aria-labelledby="aed-heading">
            <div className="flex items-start gap-4">
              <Landmark className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Coming soon</p>
                <h2 id="aed-heading" className="mt-1 font-serif text-2xl font-semibold text-foreground">Alpha Epsilon Delta</h2>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  Moravian is in the process of building a chapter of this national pre-health honor society. More information about membership and chapter activities will be available soon.
                </p>
                <Link href="/alpha-epsilon-delta" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  Learn about AED
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8" aria-labelledby="involved-heading">
            <h2 id="involved-heading" className="font-serif text-2xl font-semibold text-foreground">Want to get involved?</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
              Attend a meeting, introduce yourself to the officers, and bring an idea for an event or conversation you would like the club to host.
            </p>
            <Link href="/tools/resources" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Explore student resources
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
        <SiteFooter />
      </main>
    </div>
  )
}
