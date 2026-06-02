import { ExternalLink } from "lucide-react"
import { mcatResources } from "@/lib/mcat-content"

export function McatResourceMatrix() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left">
            <th className="px-4 py-3 font-semibold text-foreground">Resource</th>
            <th className="px-4 py-3 font-semibold text-foreground">Type</th>
            <th className="px-4 py-3 font-semibold text-foreground">Best for</th>
          </tr>
        </thead>
        <tbody>
          {mcatResources.map((r) => (
            <tr key={r.name} className="border-b border-border last:border-0 hover:bg-muted/20">
              <td className="px-4 py-3 align-top">
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  {r.name}
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </a>
                <p className="mt-1 text-xs text-muted-foreground">{r.note}</p>
              </td>
              <td className="px-4 py-3 align-top">
                <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-medium">
                  {r.type}
                </span>
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">{r.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
