import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function StaffLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-4">
        <Skeleton className="h-10 w-full" />
      </Card>

      <div className="overflow-x-auto">
        <Card className="border border-border/50 backdrop-blur-sm bg-card/50">
          <div className="space-y-4 p-6">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
