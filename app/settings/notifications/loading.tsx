import { Card } from "@/components/ui/card"

export default function NotificationSettingsLoading() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="h-10 w-64 rounded-lg bg-muted animate-pulse mb-2" />
        <div className="h-5 w-80 rounded-lg bg-muted animate-pulse" />
      </div>

      <div className="space-y-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
                <div>
                  <div className="h-5 w-40 rounded-lg bg-muted animate-pulse mb-2" />
                  <div className="h-4 w-60 rounded-lg bg-muted animate-pulse" />
                </div>
              </div>
              <div className="w-14 h-8 rounded-full bg-muted animate-pulse" />
            </div>
          </Card>
        ))}
      </div>

      <div className="h-10 w-40 rounded-lg bg-muted animate-pulse" />
    </div>
  )
}
