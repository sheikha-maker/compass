"use client"

import { useSession } from "@/lib/auth-client"

function StorageWarningImpl() {
  const { data: session, isPending } = useSession()
  if (isPending || session?.user) return null
  return (
    <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
      <p>
        <strong>Browser storage only.</strong> Your data will be lost if you clear your browser history or switch devices.{" "}
        <a href="/sign-in" className="font-semibold underline underline-offset-2">Sign in</a>{" "}
        to save your data across devices.
      </p>
    </div>
  )
}

// Re-export as a dynamic component so it never renders during SSR.
// This prevents better-auth/react (imported via auth-client) from loading
// on the server and crashing with a useRef error.
import dynamic from "next/dynamic"
export const StorageWarning = dynamic(() => Promise.resolve(StorageWarningImpl), { ssr: false })
