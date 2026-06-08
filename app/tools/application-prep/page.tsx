import { PageLayout } from "@/components/compass/page-layout"
import { ApplicationTracker } from "../components/ApplicationTracker"
import { SchoolList } from "../components/SchoolList"
import { EssayInterviewPrep } from "../components/EssayInterviewPrep"
import { LORTracker } from "../components/LORTracker"
import { StorageWarning } from "@/components/compass/storage-warning"
import { SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "application-tracker", label: "Application Tracker" },
  { id: "school-list", label: "School List" },
  { id: "essay-interview-prep", label: "Essays & Interviews" },
  { id: "lor-tracker", label: "LOR Tracker" },
]

export default function ApplicationPrepPage() {
  return (
    <PageLayout title="Application Prep" eyebrow="Tools" navItems={navItems}>
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8 mt-8">
        <StorageWarning />
      </div>
      <ApplicationTracker />
      <SchoolList />
      <EssayInterviewPrep />
      <LORTracker />
      <SiteFooter />
    </PageLayout>
  )
}
