import { PageLayout } from "@/components/compass/page-layout"
import { McatDeepDive, Timeline, Faq } from "@/components/compass/milestone-sections"
import { getFaqs } from "@/lib/notion"

export const revalidate = 3600

const navItems = [
  { id: "mcat",     label: "MCAT Deep Dive"             },
  { id: "timeline", label: "Application Timeline"       },
  { id: "faq",      label: "Pre-Med FAQ"                },
]

export default async function MilestonesPage() {
  const faqs = await getFaqs()

  return (
    <PageLayout
      title="The Big Milestones"
      eyebrow="The Big Milestones"
      description="Everything about the MCAT, your application timeline, and honest answers to the questions pre-meds ask most."
      navItems={navItems}
    >
      <McatDeepDive />
      <Timeline />
      <Faq faqs={faqs} />
    </PageLayout>
  )
}