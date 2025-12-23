export function SkeletonLoader({ count = 3, variant = "card" }: { count?: number; variant?: "card" | "line" }) {
  if (variant === "line") {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-4 animate-pulse">
          <div className="h-40 bg-muted rounded-lg mb-4" />
          <div className="h-4 bg-muted rounded mb-3" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      ))}
    </div>
  )
}
