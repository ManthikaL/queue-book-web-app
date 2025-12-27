import { Card } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="h-10 w-64 rounded-lg bg-muted animate-pulse mb-2" />
        <div className="h-5 w-96 rounded-lg bg-muted animate-pulse" />
      </div>

      <div className="flex gap-2 mb-8">
        <div className="h-10 w-24 rounded-lg bg-muted animate-pulse" />
        <div className="h-10 w-32 rounded-lg bg-muted animate-pulse" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="border border-border/50 backdrop-blur-sm bg-card/50 p-4">
            <div className="flex gap-4">
              <div className="w-5 h-5 rounded-full bg-muted animate-pulse flex-shrink-0" />
              <div className="flex-1">
                <div className="h-5 w-40 rounded-lg bg-muted animate-pulse mb-2" />
                <div className="h-4 w-full rounded-lg bg-muted animate-pulse mb-2" />
                <div className="h-3 w-24 rounded-lg bg-muted animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
