import { Card } from "@/components/ui/card"

export default function AnalyticsLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <div className="h-10 w-64 rounded-lg bg-muted animate-pulse mb-2" />
        <div className="h-5 w-80 rounded-lg bg-muted animate-pulse" />
      </div>

      {/* KPI Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="h-5 w-32 rounded-lg bg-muted animate-pulse mb-4" />
            <div className="h-8 w-24 rounded-lg bg-muted animate-pulse mb-4" />
            <div className="h-6 w-40 rounded-lg bg-muted animate-pulse" />
          </Card>
        ))}
      </div>

      {/* Chart Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="h-6 w-40 rounded-lg bg-muted animate-pulse mb-6" />
            <div className="h-80 w-full rounded-lg bg-muted animate-pulse" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="h-6 w-40 rounded-lg bg-muted animate-pulse mb-6" />
            <div className="h-80 w-full rounded-lg bg-muted animate-pulse" />
          </Card>
        ))}
      </div>
    </div>
  )
}
