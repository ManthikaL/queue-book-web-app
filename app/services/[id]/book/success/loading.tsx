import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function BookingSuccessLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
        <Skeleton className="h-10 w-64 mx-auto mb-3" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      {/* Main Card */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-8 mb-8">
        <Skeleton className="h-8 w-48 mb-8" />

        {/* Info Cards Row */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-muted/50 rounded-lg">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>

        {/* Appointment Highlight Panel */}
        <div className="p-6 rounded-lg border-2 mb-8">
          <Skeleton className="h-4 w-32 mb-3" />
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Confirmation Note */}
        <div className="p-4 rounded-lg">
          <Skeleton className="h-4 w-80" />
        </div>

        {/* Booking Details */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <Skeleton className="h-4 w-32 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  )
}
