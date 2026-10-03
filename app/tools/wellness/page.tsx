import { PageLayout } from "@/components/compass/page-layout"
import { WellnessCheckin } from "../components/WellnessCheckin"
import { StorageWarning } from "@/components/compass/storage-warning"
import { SiteFooter } from "@/components/compass/resources"

const navItems = [{ id: "wellness-checkin", label: "Weekly Check-In" }]

export default function WellnessPage() {
  return (
    <PageLayout title="Wellness" eyebrow="Wellbeing" navItems={navItems}>
      <div className="mx-auto mt-8 w-full max-w-4xl px-5 md:px-8"><StorageWarning /></div>
      <WellnessCheckin />
      <SiteFooter />
    </PageLayout>
  )
}
