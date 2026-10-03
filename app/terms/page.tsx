import type { Metadata } from "next"
import { SidebarNav } from "@/components/compass/sidebar-nav"
import { SiteFooter } from "@/components/compass/resources"

export const metadata: Metadata = {
  title: "Terms of Service | The Pre-Med Compass",
  description: "Terms for using The Pre-Med Compass.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="lg:pl-72">
        <article className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Using the guide</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated September 2026</p>
          <div className="mt-10 flex flex-col gap-8 leading-relaxed text-muted-foreground">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Educational resource</h2>
              <p className="mt-3">The Pre-Med Compass is a student-made educational resource. It does not provide medical, legal, financial, admissions, or official university advice. Always confirm course, testing, and application requirements with your advisor and the relevant official organization.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Your account</h2>
              <p className="mt-3">You are responsible for keeping your sign-in information private and for the activity that occurs under your account. Please provide accurate information and do not create an account for someone else without permission.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Acceptable use</h2>
              <p className="mt-3">Do not misuse the service, attempt to access another person&apos;s data, interfere with its operation, or use the site to submit harmful or unlawful material. We may limit access when needed to protect the service and its users.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Data and privacy</h2>
              <p className="mt-3">Our <a className="text-primary underline underline-offset-4" href="/privacy">Privacy Policy</a> explains what account and tool information may be stored, how it is used, and how to request correction or deletion.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Availability and changes</h2>
              <p className="mt-3">The guide is provided as-is and may change as information, requirements, and tools are updated. We do not guarantee that every page is complete, current, or available at all times.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3">Questions, corrections, and issue reports are welcome at <a className="text-primary underline underline-offset-4" href="mailto:sheikha@moravian.edu">sheikha@moravian.edu</a>. These terms are a plain-language overview for a student-made project, not legal advice.</p>
            </section>
          </div>
        </article>
        <SiteFooter />
      </main>
    </div>
  )
}
