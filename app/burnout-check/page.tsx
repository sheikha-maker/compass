import { BurnoutCheck } from "@/components/compass/burnout-check"
import { SidebarNav } from "@/components/compass/sidebar-nav"
import { SiteFooter } from "@/components/compass/resources"

export default function BurnoutCheckPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="lg:pl-72">
        <BurnoutCheck />
        <SiteFooter />
      </main>
    </div>
  )
}
