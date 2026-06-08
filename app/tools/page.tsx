import { redirect } from "next/navigation"

// The old monolithic tools page is replaced by sub-pages.
// Redirect anyone hitting /tools to the first sub-page.
export default function ToolsPage() {
  redirect("/tools/plan-check")
}
