"use client"

import { LogIn, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function AuthButton({ compact = false }: { compact?: boolean }) {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <div className="h-9 w-full rounded-md bg-sidebar-accent/30 animate-pulse" />
  }

  if (session?.user) {
    if (compact) {
      return (
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-1">
          <User className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          <span className="max-w-24 truncate text-xs font-medium text-foreground">{session.user.name}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => signOut()} aria-label="Sign out">
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      )
    }
    return (
      <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/30 px-3 py-2.5">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-4 w-4 text-muted-foreground shrink-0" />
          <p className="text-xs font-medium text-foreground truncate">{session.user.name}</p>
        </div>
        <p className="text-[11px] text-muted-foreground mb-2 truncate pl-6">
          {session.user.email}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 h-7 text-xs text-muted-foreground hover:text-destructive px-2"
          onClick={() => signOut()}
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Link href="/sign-in" className={compact ? "block" : "block"}>
      <Button
        variant="outline"
        size="sm"
        className={compact ? "h-8 gap-1.5 rounded-full px-3 text-xs" : "w-full gap-2 text-xs justify-start"}
      >
        <LogIn className="h-3.5 w-3.5" />
        Sign in to sync data
      </Button>
    </Link>
  )
}
