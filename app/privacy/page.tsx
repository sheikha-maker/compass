import type { Metadata } from "next"
import { SidebarNav } from "@/components/compass/sidebar-nav"
import { SiteFooter } from "@/components/compass/resources"

export const metadata: Metadata = {
  title: "Privacy Policy | The Pre-Med Compass",
  description: "How The Pre-Med Compass collects, uses, and protects account and wellness data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="lg:pl-72">
        <article className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Your data</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated September 2026</p>
          <div className="mt-10 flex flex-col gap-8 leading-relaxed text-muted-foreground">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">What we collect</h2>
              <p className="mt-3">When you create an account, we collect your name, email address, and account credentials needed for sign-in. If you use the Compass tools, we may store information you choose to enter, including GPA figures, MCAT dates, application progress, activity logs, and wellness check-ins such as energy, motivation, and stress.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">How we use it</h2>
              <p className="mt-3">We use this information to authenticate you, save your progress, show your personalized dashboard, and improve the reliability of the service. We do not sell your personal information or use wellness entries for advertising.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Who can see it</h2>
              <p className="mt-3">Your saved tool data is scoped to your account. Service providers that host authentication, the database, and the website may process data only to operate the service. This student-made guide is not an official Moravian University advising system, and saved entries are not automatically shared with Moravian advisors, faculty, or other students.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Your choices</h2>
              <p className="mt-3">You can stop using the service at any time. To ask what data is associated with your account, correct it, or request deletion, email <a className="text-primary underline underline-offset-4" href="mailto:sheikha@moravian.edu">sheikha@moravian.edu</a>. Include the email address on your account so we can verify and process the request.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Retention and security</h2>
              <p className="mt-3">We keep account and tool data while your account is active or as needed to provide the service. We use access controls and hosted service protections, but no online service can promise absolute security. Do not enter highly sensitive medical, financial, or identifying information into a wellness check-in.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Questions</h2>
              <p className="mt-3">This policy is a plain-language overview for a student-made project, not legal advice. If you have a privacy question or want to report a concern, contact <a className="text-primary underline underline-offset-4" href="mailto:sheikha@moravian.edu">sheikha@moravian.edu</a>.</p>
            </section>
          </div>
        </article>
        <SiteFooter />
      </main>
    </div>
  )
}
