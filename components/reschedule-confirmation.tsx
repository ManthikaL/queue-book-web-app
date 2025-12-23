"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface RescheduleConfirmationProps {
  booking: {
    serviceName: string
    date: string
    time: string
    estimatedDuration: number
    price: number
  }
  newDate: string
  newTime: string
  fee: number
  onConfirm: (paymentRequired: boolean) => void
  onBack: () => void
}

export function RescheduleConfirmation({
  booking,
  newDate,
  newTime,
  fee,
  onConfirm,
  onBack,
}: RescheduleConfirmationProps) {
  const isFreeReschedule = fee === 0

  return (
    <div className="space-y-6">
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Reschedule Summary</h3>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-foreground/60 mb-1">Service</p>
              <p className="font-semibold text-foreground">{booking.serviceName}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-foreground/60 mb-1">Duration</p>
              <p className="font-semibold text-foreground">{booking.estimatedDuration} min</p>
            </div>
          </div>

          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-xs text-foreground/60 mb-1">Current Appointment</p>
            <p className="font-semibold text-foreground">
              {booking.date} at {booking.time}
            </p>
          </div>

          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-foreground/60 mb-1">New Appointment</p>
            <p className="font-semibold text-foreground">
              {newDate} at {newTime}
            </p>
          </div>
        </div>
      </Card>

      {/* Reschedule Policy */}
      <Card className="border border-border/50 backdrop-blur-sm bg-card/50 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Reschedule Policy</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Free Reschedule (24+ hours)</p>
              <p className="text-foreground/60">No fees if rescheduled 24 hours or more before appointment</p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Late Reschedule Fee (&lt; 24 hours)</p>
              <p className="text-foreground/60">LKR 300 fee applies if rescheduled less than 24 hours before</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Fee Summary */}
      {fee > 0 && (
        <Card className="border border-orange-500/30 bg-orange-500/5 p-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Service Fee</span>
              <span className="text-foreground">${booking.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Reschedule Fee (&lt; 24h)</span>
              <span className="text-orange-600 font-semibold">${fee}</span>
            </div>
            <div className="border-t border-border/50 pt-2 flex justify-between">
              <span className="font-semibold text-foreground">Total Due</span>
              <span className="text-lg font-bold text-orange-600">${fee}</span>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          Back
        </Button>
        <Button
          onClick={() => onConfirm(!isFreeReschedule)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        >
          {isFreeReschedule ? "Confirm Reschedule" : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  )
}
