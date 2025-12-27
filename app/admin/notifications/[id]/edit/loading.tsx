import { Card } from "@/components/ui/card"

export default function EditNotificationLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="h-10 w-64 rounded-lg bg-muted animate-pulse mb-2" />
        <div className="h-5 w-80 rounded-lg bg-muted animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="h-5 w-24 rounded-lg bg-muted animate-pulse mb-4" />
            <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
          </Card>

          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="h-5 w-32 rounded-lg bg-muted animate-pulse mb-4" />
            <div className="h-48 w-full rounded-lg bg-muted animate-pulse" />
          </Card>

          <div className="h-10 w-40 rounded-lg bg-muted animate-pulse" />
        </div>

        <div className="space-y-6">
          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="h-5 w-20 rounded-lg bg-muted animate-pulse mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 w-full rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          </Card>

          <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
            <div className="h-5 w-20 rounded-lg bg-muted animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-16 rounded-lg bg-muted animate-pulse mb-2" />
              <div className="h-6 w-full rounded-lg bg-muted animate-pulse mb-4" />
              <div className="h-4 w-16 rounded-lg bg-muted animate-pulse mb-2" />
              <div className="h-16 w-full rounded-lg bg-muted animate-pulse" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
