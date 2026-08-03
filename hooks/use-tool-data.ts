"use client"

/**
 * useToolData<T>(key, defaultValue)
 *
 * Drop-in replacement for the raw localStorage pattern used in each tool.
 * Returns [data, setData] — identical interface to the old pattern.
 *
 * Behaviour:
 *  1. On mount, reads from localStorage immediately (no flash / no waiting).
 *  2. If the user is authenticated, fetches from the server. Server data wins
 *     because it may be newer (edited on another device).
 *  3. Every write goes to localStorage AND, when authenticated, to the server.
 *
 * Non-authenticated users: localStorage only — identical to the old behaviour.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { useSession } from "@/lib/auth-client"

function lsRead<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key)
    return s ? (JSON.parse(s) as T) : fallback
  } catch {
    return fallback
  }
}

function lsWrite(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

async function serverRead(key: string): Promise<string | null> {
  const res = await fetch(`/api/tool-data/${encodeURIComponent(key)}`)
  if (!res.ok) return null
  const json = await res.json() as { value: string | null }
  return json.value
}

async function serverWrite(key: string, value: unknown) {
  await fetch(`/api/tool-data/${encodeURIComponent(key)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: JSON.stringify(value) }),
  })
}

/**
 * Coalesce rapid writes (typing in a tool input fires one per keystroke) into a
 * single request per key. Keeps the tools well inside the API rate limit and
 * cuts needless DB round-trips; localStorage stays the instant, optimistic layer.
 */
const SYNC_DEBOUNCE_MS = 800
const pendingWrites = new Map<string, { timer: ReturnType<typeof setTimeout>; value: unknown }>()

function flushWrite(key: string) {
  const pending = pendingWrites.get(key)
  if (!pending) return
  clearTimeout(pending.timer)
  pendingWrites.delete(key)
  void serverWrite(key, pending.value).catch(() => {})
}

function queueServerWrite(key: string, value: unknown) {
  const existing = pendingWrites.get(key)
  if (existing) clearTimeout(existing.timer)
  const timer = setTimeout(() => flushWrite(key), SYNC_DEBOUNCE_MS)
  pendingWrites.set(key, { timer, value })
}

// Don't lose the last edit if the tab closes mid-debounce.
if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => {
    for (const key of Array.from(pendingWrites.keys())) flushWrite(key)
  })
}

export function useToolData<T>(
  key: string,
  defaultValue: T
): [T, (next: T) => void] {
  const { data: session } = useSession()
  const isAuthed = Boolean(session?.user)
  const isAuthedRef = useRef(isAuthed)
  isAuthedRef.current = isAuthed

  // Start with localStorage so there's no loading flash
  const [data, setDataState] = useState<T>(() => lsRead(key, defaultValue))

  // Once we know the user is authenticated, pull from the server
  useEffect(() => {
    if (!isAuthed) return
    let cancelled = false
    serverRead(key).then((raw) => {
      if (cancelled || raw === null) return
      try {
        const parsed = JSON.parse(raw) as T
        setDataState(parsed)
        lsWrite(key, parsed) // keep localStorage in sync
      } catch {}
    })
    return () => { cancelled = true }
  }, [key, isAuthed])

  const setData = useCallback(
    (next: T) => {
      setDataState(next)
      lsWrite(key, next)
      if (isAuthedRef.current) {
        queueServerWrite(key, next) // debounced; localStorage is the optimistic layer
      }
    },
    [key]
  )

  return [data, setData]
}
