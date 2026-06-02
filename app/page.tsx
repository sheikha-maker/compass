import { SidebarNav } from "@/components/compass/sidebar-nav"
import { Hero } from "@/components/compass/hero"
import { OnboardingQuiz } from "@/components/compass/onboarding-quiz"
import { StartHere } from "@/components/compass/start-here"
import { SectionCards } from "@/components/compass/section-cards"
import { SiteFooter } from "@/components/compass/resources"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="lg:pl-72">
        <Hero />
        <OnboardingQuiz />
        <StartHere />
        <SectionCards />
        <SiteFooter />
      </main>
    </div>
  )
}
